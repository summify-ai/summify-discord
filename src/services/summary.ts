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
      prompt: `You are a converstation summarizer. Create a numbered list titled "Important Topics" of the most important topics in the converstation. Make sure each bullet list contains a topic and a short summarization of the essence of the converstation, keep it concise.
      Below that, compile and create a list of all of the links shared in a bullet list titled "Links". Wrap the link in <> tags. Converstation:\n
      ${text}`,
      max_tokens: 1024,
      temperature: 0.48,
      top_p: 1,
    });

    console.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  } catch (error) {
    return "OpenAI error";
  }
}
