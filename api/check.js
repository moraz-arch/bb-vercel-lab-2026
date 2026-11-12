export default function handler(req, res) {
  res.status(200).json({
    environment: process.env.VERCEL_ENV || null,
    production_canary: process.env.PRODUCTION_CANARY || null,
    preview_canary: process.env.PREVIEW_CANARY || null
  });
}
