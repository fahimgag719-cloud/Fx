import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/dl", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ error: "No URL" });

  try {
    const api = `https://api.douyin.wtf/api?url=${encodeURIComponent(url)}`;
    const r = await fetch(api);
    const data = await r.json();

    if (!data || !data.nwm_video_url) {
      return res.json({ error: "Video not found" });
    }

    res.json({ url: data.nwm_video_url });
  } catch (e) {
    res.json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running");
});
