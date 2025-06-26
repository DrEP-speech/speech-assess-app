const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const AIScore = require("../models/aiScore"); // Make sure this path is correct

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /api/ai-score — generate AI score
router.post("/ai-score", async (req, res) => {
  try {
    const { transcript, userId = "anonymous", sessionId = "", promptVersion = "v1", audioFileUrl = "" } = req.body;

    const prompt = `Evaluate the following speech transcript for clarity, fluency, and accuracy, and provide a numerical score from 0 to 100 with a short explanation:\n\n"${transcript}"`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const aiResponse = completion.data.choices[0].message.content;

    const newScore = new AIScore({
      transcript,
      score: aiResponse,
      feedback: aiResponse,
      userId,
      sessionId,
      promptVersion,
      audioFileUrl,
    });

    await newScore.save();

    res.json({ score: aiResponse });
  } catch (error) {
    console.error("❌ AI scoring route error:", error.message);
    res.status(500).json({ error: "Failed to generate AI score." });
  }
});

// GET /api/ai-score/:userId — retrieve all scores for a user
router.get("/ai-score/:userId", async (req, res) => {
  try {
    const scores = await AIScore.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(scores);
  } catch (err) {
    console.error("❌ Failed to fetch scores:", err);
    res.status(500).json({ error: "Failed to fetch scores for user." });
  }
});

module.exports = router;
