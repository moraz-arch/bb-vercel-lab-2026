return res.status(200).json({
  caller_project: "ACCOUNT_A",
  caller_environment: process.env.VERCEL_ENV,
  oidc_token_present: Boolean(token)
});
