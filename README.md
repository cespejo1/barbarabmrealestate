# Barbara B.M. Real Estate

A custom real-estate marketing site built with Next.js 16, React 19, TypeScript, and CSS, matching the core stack used by the Espejo Software website.

## Local development

```bash
npm install
npm run dev
```

## Before launch

Update the market and listings in `app/site-data.ts`. Replace the sample property imagery and sample listing content with approved MLS data and photography. The current property cards are generic marketing examples, not active MLS listings.

## Contact form delivery

The English and Spanish contact forms send inquiries through Resend. Add these variables in **Vercel → Project → Settings → Environment Variables** for Production, then redeploy:

- `RESEND_API_KEY`: a Resend key permitted to send from the verified `barbarabmrealestate.com` domain. Keep this secret and never commit it.
- `CONTACT_TO_EMAIL`: the inbox that should receive inquiries (currently `barbarabm02@gmail.com`). Change this variable and redeploy whenever inquiries need to go elsewhere.
- `CONTACT_FROM_EMAIL` (optional): defaults to `Barbara B.M. Real Estate <inquiries@barbarabmrealestate.com>`. The address must use the verified sending domain; it does not need to be a receiving mailbox.

The submitted visitor address is set as Reply-To, so replying to an inquiry addresses the visitor. No emails are sent until both required variables are configured. After deployment, send one real test submission and confirm it reaches the intended inbox. For local development, put these variables in a gitignored `.env.local` file.

Then run:

```bash
npm run lint
npm run build
```
