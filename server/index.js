import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from server/.env if it exists.
try {
  process.loadEnvFile(path.join(__dirname, '.env'));
} catch {
  // No .env file present — fall back to process defaults.
}

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// --- Email (Resend HTTPS API) --------------------------------------------------------
// The address that receives contact-form submissions.
const MAIL_TO = process.env.MAIL_TO || 'shraddha76830@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (RESEND_API_KEY) {
  console.log(`Email delivery enabled (Resend) — messages will be sent to ${MAIL_TO}`);
} else {
  console.log('Email delivery disabled (no RESEND_API_KEY). Submissions are saved to data/contacts.json only.');
}


// --- Middleware -------------------------------------------------------------
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(',').map((o) => o.trim()) : '*',
  })
);
// Cap the request body size to mitigate abuse.
app.use(express.json({ limit: '16kb' }));

// --- Paths ------------------------------------------------------------------
const dataDir = path.join(__dirname, 'data');
const profilePath = path.join(dataDir, 'profile.json');
const contactsPath = path.join(dataDir, 'contacts.json');

// --- Helpers ----------------------------------------------------------------
function readProfile() {
  const raw = fs.readFileSync(profilePath, 'utf-8');
  return JSON.parse(raw);
}

function isNonEmptyString(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Routes -----------------------------------------------------------------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/profile', (_req, res) => {
  try {
    res.json(readProfile());
  } catch (err) {
    console.error('Failed to read profile:', err.message);
    res.status(500).json({ error: 'Unable to load profile data.' });
  }
});

app.get('/api/portfolio', (_req, res) => {
  try {
    const profile = readProfile();
    res.json(Array.isArray(profile.portfolio) ? profile.portfolio : []);
  } catch (err) {
    console.error('Failed to read portfolio:', err.message);
    res.status(500).json({ error: 'Unable to load portfolio data.' });
  }
});

app.post('/api/contact', async (req, res) => {
  const body = req.body || {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!isNonEmptyString(name, 100)) {
    return res.status(400).json({ error: 'Please provide your name (max 100 characters).' });
  }
  if (!isNonEmptyString(email, 150) || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!isNonEmptyString(message, 2000)) {
    return res.status(400).json({ error: 'Please provide a message (max 2000 characters).' });
  }

  const entry = { name, email, message, submittedAt: new Date().toISOString() };

  // Persist every submission to disk as a durable record.
  try {
    let contacts = [];
    if (fs.existsSync(contactsPath)) {
      const raw = fs.readFileSync(contactsPath, 'utf-8').trim();
      contacts = raw ? JSON.parse(raw) : [];
    }
    contacts.push(entry);
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (err) {
    console.error('Failed to save contact submission:', err.message);
    return res.status(500).json({ error: 'Unable to save your message. Please try again later.' });
  }

  // Send the submission by email via Resend if configured.
  if (RESEND_API_KEY) {
    try {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [MAIL_TO],
          reply_to: email,
          subject: `New portfolio message from ${name}`,
          text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSent: ${entry.submittedAt}\n\nMessage:\n${message}`,
        }),
      });
      if (!resp.ok) {
        const detail = await resp.text();
        console.error('Email send failed:', resp.status, detail);
      }
    } catch (err) {
      console.error('Email send failed:', err.message);
      // The message is already saved,, so report succcess but log the failure.
    }
  }
  res.status(201).json({ ok: true, message: 'Thank you! Your message has been received.' });
});

// --- 404 fallback for unknown API routes ------------------------------------
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found.' });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
