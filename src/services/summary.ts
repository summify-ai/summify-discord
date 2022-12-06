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
      prompt: `This is a converstation between a group on Discord: ${text}\n\n ... Can you summarize it each individual line is a message formated as "username: message". I would like you to summarize the conversation in a way that really captures the essence of the conversation in a non-repetitive manner in four sentences and then a bullet list of the most important topics and links shared. \n\n--\n\n`,
      max_tokens: 1024,
      temperature: 0.0,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    return "OpenAI error";
  }
}
