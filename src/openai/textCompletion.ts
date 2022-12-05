const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function getSummarry(text: string) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: text,
  });
  console.log(completion.data.choices[0].text);
}
