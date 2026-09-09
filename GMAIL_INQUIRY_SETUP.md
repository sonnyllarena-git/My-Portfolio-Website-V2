# Gmail Inquiry System Setup

How the desktop's Gmail app turns a visitor's "sent" message into a real database row plus an
email notification to you. No email-sending service is required for the visitor-facing part —
only the notification-to-you part needs Resend.

## How it works

1. A visitor opens the **Gmail** desktop icon, "signs in" with a name + email (fake — never their
   real Gmail), and composes a message in the **New Message** window.
2. Clicking **Send** POSTs to `/api/inquiries` ([backend/routes/inquiries.js](backend/routes/inquiries.js)),
   which saves the message to Postgres (`contactInquiries` table, added in
   [backend/db.js](backend/db.js)) and fires an email notification to you via Resend.
3. You see it in the admin dashboard's **Inquiries** tab — the first/default tab in both
   `/admin` and the hidden Terminal `/admin` panel ([src/admin/AdminInquiriesPage.jsx](src/admin/AdminInquiriesPage.jsx)).

The visitor-facing save works with **zero configuration** — it's just a Postgres insert, same as
Memory Wall or Blog comments. The **email notification** is the one part that needs setup below;
until you do this, messages still save and show up in the admin dashboard, you just won't get
pinged by email.

## Part 1 — Get a Resend API key

[Resend](https://resend.com) is a transactional email API. Free tier: 100 emails/day, no card
required.

1. Sign up at [resend.com](https://resend.com) with the email address you want notifications
   sent **to** (this matters — see the note below).
2. In the dashboard, go to **API Keys** → **Create API Key**. Give it a name (e.g. "portfolio
   inquiries"), leave permissions as default (Full Access is fine for a single key), and copy the
   key shown — it's only shown once.

### Important limitation: no verified domain = you can only email yourself

Without verifying a custom domain in Resend, you can only:

- Send **from** `onboarding@resend.dev` (Resend's shared test sender)
- Send **to** the exact email address you signed up to Resend with

That's fine here — the whole point is Resend emails _you_, not a visitor. Just make sure the
`RESEND_TO_EMAIL` value below matches your Resend account's own email exactly.

(If you later want a nicer "from" address like `noreply@yourdomain.com`, you'd need to verify a
domain you own in Resend's **Domains** section — not required for this feature to work.)

## Part 2 — Fill in `backend/.env`

Add these three lines (this file is gitignored — create it yourself if it doesn't exist yet,
using [.env.example](.env.example) as the template):

```
RESEND_API_KEY=re_your_actual_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=the-email-you-signed-up-to-resend-with@example.com
```

## Part 3 — Start the backend

Nothing else to run — the `contactInquiries` table creates itself on startup, same as every
other table (`CREATE TABLE IF NOT EXISTS` in `initSchema()`).

```bash
npm run server
```

or, to run backend + frontend together:

```bash
npm run dev:all
```

## Part 4 — Deploying to Render (or any other host)

Same lesson as every other integration in this project: **Render never reads your local
`backend/.env`** — it's gitignored and never reaches the deployed server.

1. Render dashboard → the backend web service → **Environment** tab.
2. Add all 3 vars, copied exactly from your local `backend/.env`:
   `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`.
3. Save — Render redeploys automatically.

## Verify

1. Go to `localhost:5173` (or your live site), open the **Gmail** desktop icon.
2. "Sign in" with any name + email (it's fake — doesn't need to be real).
3. Type a subject and message, click **Send**. You should see "Message sent — I'll respond within
   24–48 hours."
4. Log into `/admin` (or the hidden Terminal `/admin` panel) and check the **Inquiries** tab —
   the message should appear there, unread (bold, with a blue dot).
5. Check the inbox of the email you signed up to Resend with — you should get a notification
   email with the visitor's name, email, subject, and message, and **Reply** on that email will
   go straight to the visitor's address (it's set as the Reply-To).

If the message shows up in the Inquiries tab but no email arrives, check the backend's server
logs for a line starting with `Failed to send inquiry notification email:` — the visitor's
message still saves either way, so a Resend problem never loses a real inquiry.

## Spam protection (already built in, no setup needed)

- **Honeypot**: a hidden form field real visitors never see or fill in. A bot that blindly
  fills every field trips it — the request returns a normal-looking success but nothing is saved.
- **Rate limit**: max 5 submissions per hour per IP address, tracked in memory
  (`backend/routes/inquiries.js`). Resets on server restart; not meant to stop a determined
  attacker, just casual spam.
