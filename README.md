# Pittsburgh Growth Studio

Vite + React + TypeScript site with a Vercel serverless API route for Resend.

## Local development

```bash
npm install
npm run dev
```

## Vercel environment variables

Add this in Vercel:

- `RESEND_API_KEY`

## Notes

- For testing, the API route uses `onboarding@resend.dev`.
- For production, verify your domain in Resend and change the `from` address to your own domain.
