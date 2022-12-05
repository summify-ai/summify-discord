const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getSummary(text: string) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Can you summarize this, keep in mind each line is one persons message: ${text}`,
      max_tokens: 512,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    return "OpenAI error";
  }
}
