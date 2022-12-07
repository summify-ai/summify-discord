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
      prompt: `You are a summarization bot that is designed to accurately extract peak insights from discord messages. The following text is a conversation between a group of members in a Discord server. Each individual line is a message formatted as "username: message". I would like you to summarize the conversation in a way that really captures the essence of the conversation in a non-repetitive manner in four sentences, not five sentences, not three sentences. \n\n After the summary,  create a bulleted list of the most important topics. Below that, compile and create a list of all of the links shared. ${text}`,
      max_tokens: 1024,
      temperature: 0.15,
    });
    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    return "OpenAI error";
  }
}
