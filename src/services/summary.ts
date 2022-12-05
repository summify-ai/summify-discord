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
      prompt: `Can you summarize this, keep in mind each section is one person talking, as much as you can keep track of the conversation and sum it up: ${text}`,
      max_tokens: 1024,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    return "OpenAI error";
  }
}
