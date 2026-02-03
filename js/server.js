const express = require("express");
const cors = require("cors");
const {Translate} = require("@google-cloud/translate").v2;

const app = express();
app.use(cors());
app.use(express.json());

const translate = new Translate({ key: "YOUR_GOOGLE_CLOUD_API_KEY" });

app.get("/translate", async (req, res) => {
  const { text, target } = req.query;
  if (!text || !target) return res.status(400).send("Missing text or target");

  try {
    const [translation] = await translate.translate(text, target);
    res.json({ translatedText: translation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
