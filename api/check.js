export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  return res.status(200).json({
    owner: "ACCOUNT_A",
    resource: "VICTIM_PROJECT_CANARY",
    environment: process.env.VERCEL_ENV || null,

    production_canary: process.env.PRODUCTION_CANARY || null,
    preview_canary: process.env.PREVIEW_CANARY || null,

    test: "CROSS_TENANT_ACCESS_CONTROL"
  });
}
