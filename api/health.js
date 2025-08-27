module.exports = (req, res) => {
  const required = ["NOTION_TOKEN", "NOTION_DATABASE_ID"];
  const status = Object.fromEntries(required.map(k => [k, process.env[k] ? "present" : "missing"]));
  const ok = required.every(k => !!process.env[k]);
  res.status(ok ? 200 : 400).json({
    ok,
    env: status,
    note: ok
      ? "All required env vars are set."
      : "Add missing env vars in Vercel → Project → Settings → Environment Variables, then redeploy."
  });
};
