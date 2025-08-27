const { Client } = require("@notionhq/client");

module.exports = async (req, res) => {
  try {
    const token = process.env.NOTION_TOKEN;
    const db = process.env.NOTION_DATABASE_ID;

    if (!token || !db) {
      res.status(400).json({ error: "Missing NOTION_TOKEN or NOTION_DATABASE_ID" });
      return;
    }

    const notion = new Client({ auth: token });
    const response = await notion.databases.query({
      database_id: db,
      page_size: 3
    });

    res.status(200).json({
      ok: true,
      count: response.results.length,
      sampleIds: response.results.map(p => p.id)
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};
