export default function handler(req, res) {
  const token = req.headers["x-vercel-oidc-token"];

  res.status(200).json({
    vercel_env: process.env.VERCEL_ENV || null,
    oidc_token_present: Boolean(token),
    oidc_header_present: Boolean(
      req.headers["x-vercel-oidc-token"]
    )
  });
}
