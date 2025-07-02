# AI Chatbot with Node.js and OpenAI

A sophisticated AI-powered chatbot built with Node.js, TypeScript, and the AI SDK that provides intelligent responses using OpenAI's GPT models.

## Features

- 🤖 **Intelligent Responses**: Powered by OpenAI's GPT-4o model
- 💬 **Real-time Streaming**: Responses stream in real-time for better UX
- 📝 **Conversation Memory**: Maintains context throughout the conversation
- 🛠️ **Built-in Commands**: Clear history, view help, and more
- ⚡ **Error Handling**: Graceful error handling with helpful messages
- 🎯 **Interactive Terminal**: Clean, user-friendly terminal interface

## Prerequisites

- Node.js 18+ installed
- OpenAI API key
- npm or pnpm package manager

## Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   Then edit `.env` and add your OpenAI API key:
   \`\`\`
   OPENAI_API_KEY=your_actual_api_key_here
   \`\`\`

## Usage

### Start the chatbot:
\`\`\`bash
npm start
# or
pnpm start
\`\`\`

### Development mode (with auto-reload):
\`\`\`bash
npm run dev
# or
pnpm run dev
\`\`\`

## Available Commands

Once the chatbot is running, you can use these commands:

- **Regular chat**: Just type your message and press Enter
- **`help`**: Show available commands
- **`history`**: Display conversation history
- **`clear`**: Clear conversation history
- **`exit`** or **`quit`**: End the conversation

## Example Interactions

\`\`\`
👤 You: What is artificial intelligence?
🤖 AI: Artificial intelligence (AI) refers to the simulation of human intelligence in machines...

👤 You: Can you explain machine learning?
🤖 AI: Machine learning is a subset of AI that enables computers to learn and improve...

👤 You: help
📋 Available Commands:
- exit/quit: End the conversation
- clear: Clear conversation history
- help: Show this help message
- history: Show conversation history
\`\`\`

## Technical Details

- **Framework**: Node.js with TypeScript
- **AI SDK**: Vercel AI SDK for streamlined AI integration
- **Model**: OpenAI GPT-4o for high-quality responses
- **Streaming**: Real-time response streaming for better user experience
- **Memory**: Conversation context maintained throughout the session

## Error Handling

The chatbot includes comprehensive error handling for:
- Network connectivity issues
- API rate limits
- Invalid API key configuration
- Unexpected errors during conversation

## Customization

You can customize the chatbot by:
- Modifying the system prompt in the `generateResponse` function
- Changing the OpenAI model (e.g., to `gpt-3.5-turbo` for faster responses)
- Adding new commands in the `handleCommand` function
- Adjusting the conversation history management

## Troubleshooting

**"OPENAI_API_KEY environment variable is not set"**
- Make sure you've created a `.env` file with your OpenAI API key

**Network or API errors**
- Check your internet connection
- Verify your OpenAI API key is valid and has sufficient credits
- Check if you've hit any rate limits

## License

MIT License - feel free to use and modify as needed!
