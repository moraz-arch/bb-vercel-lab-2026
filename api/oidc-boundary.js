const body = await response.text();

return res.status(200).json({
  caller_environment: process.env.VERCEL_ENV,
  target_status: response.status,
  target_response: body.slice(0, 1000)
});
