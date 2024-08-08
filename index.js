require('dotenv').config();
const { AnthropicApi } = require('@anthropic-ai/sdk');

const client = new AnthropicApi({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function getJoke(topic) {
  try {
    const response = await client.createMessage({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [
        {
          role: "system",
          content: "You are a joke assistant. Your primary function is to tell jokes based on the given topic. Always respond with a joke, even if the topic is unusual or challenging."
        },
        {
          role: "user",
          content: `Tell me a joke about ${topic}`
        }
      ]
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error:', error);
    return 'Sorry, I couldn\'t come up with a joke right now.';
  }
}

// Example usage
async function main() {
  const topic = process.argv[2] || 'programming';
  const joke = await getJoke(topic);
  console.log(joke);
}

main();