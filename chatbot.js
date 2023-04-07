const readline = require('readline');
const { generateCompletion, sendMessageToGPT4 } = require('./openai');

// import necessary libraries and files

// get API key and model from user input or other source
const apiKey = "ysk-BbCzKZM08ZBG4oMhq5ctT3BlbkFJ3VQp0Kh0vjFXabJ4J7o8";
const model = "text-davinci-003";

// define prompt for generating completion
const prompt = "Hello, how are you?";

// call function to generate prompt completion
generateCompletion(prompt, model, apiKey).then((completion) => {
  console.log(completion);
  // do something with completion text, such as displaying it in the chat window
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Welcome to the chatbot! Type your message below.');

const conversationHistory = [];

function processUserInput(input) {
  conversationHistory.push(`User: ${input}`);

  sendMessageToGPT4(input, conversationHistory)
    .then((response) => {
      console.log('Assistant:', response);
      conversationHistory.push(`Assistant: ${response}`);
      rl.question('You: ', processUserInput);
    })
    .catch((error) => {
        console.error('An error occurred while processing your message:', error.message);
        console.error('Error details:', error);
        rl.question('You: ', processUserInput);
      });      
}

rl.question('You: ', processUserInput);
