const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getSummary(text: string) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Summarize the conversation by creating a numbered list called "Important Topics" with concise summaries of key points. Also, compile a list of shared links in a bullet list called "Links" using <> tags. Conversation:`,
        },
        { role: "user", content: text },
      ],
    });
    return completion.data.choices[0].message?.content;
  } catch (error) {
    console.error(error);
    return "OpenAI error";
  }
}
