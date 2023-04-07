const axios = require('axios');

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// define function to generate prompt completion
function generateCompletion(prompt, model, apiKey) {
  // make API request to OpenAI's GPT-3 API
  return axios.post(`https://api.openai.com/v1/engines/${model}/completions`, {
    prompt: prompt,
    max_tokens: 50,
    n: 1,
    stop: "\n",
  }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    }
  })
    .then((response) => response.data.choices[0].text.trim())
    .catch((error) => {
      console.error("Error:", error);
      return "Error generating prompt completion.";
    });
}

async function sendMessageToGPT4(prompt, conversationHistory) {
  const promptWithContext = `${conversationHistory.join('\n')}\nUser: ${prompt}\nAssistant:`;

  const response = await axios.post(
    API_URL,
    {
      prompt: promptWithContext,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.9,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    }
  );

  return response.data.choices[0].text.trim();
}

module.exports = {
  generateCompletion,
  sendMessageToGPT4,
};
