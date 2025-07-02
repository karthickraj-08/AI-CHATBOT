import { openai } from "@ai-sdk/openai"
import { type CoreMessage, streamText } from "ai"
import dotenv from "dotenv"
import * as readline from "node:readline/promises"

// Load environment variables
dotenv.config()

// Create readline interface for terminal interaction
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Store conversation history
const messages: CoreMessage[] = []

// Welcome message and instructions
function displayWelcome() {
  console.log("\n🤖 AI Chatbot Assistant")
  console.log("========================")
  console.log("Hello! I'm your AI-powered assistant running on Node.js with OpenAI.")
  console.log("I'm here to help answer your questions and have meaningful conversations.")
  console.log("Feel free to ask me anything - I'll do my best to provide helpful responses!")
  console.log('\nType "exit" or "quit" to end our conversation.')
  console.log('Type "clear" to clear our conversation history.')
  console.log('Type "help" for more commands.\n')
}

// Display help information
function displayHelp() {
  console.log("\n📋 Available Commands:")
  console.log("- exit/quit: End the conversation")
  console.log("- clear: Clear conversation history")
  console.log("- help: Show this help message")
  console.log("- history: Show conversation history")
  console.log("- Just type your question to chat!\n")
}

// Display conversation history
function displayHistory() {
  if (messages.length === 0) {
    console.log("\n📝 No conversation history yet. Start by asking a question!\n")
    return
  }

  console.log("\n📝 Conversation History:")
  console.log("========================")
  messages.forEach((msg, index) => {
    const role = msg.role === "user" ? "👤 You" : "🤖 AI"
    console.log(`${index + 1}. ${role}: ${msg.content}`)
  })
  console.log("")
}

// Handle special commands
function handleCommand(input: string): boolean {
  const command = input.toLowerCase().trim()

  switch (command) {
    case "exit":
    case "quit":
      console.log("\n👋 Thank you for chatting! Have a great day!")
      process.exit(0)

    case "clear":
      messages.length = 0
      console.log("\n🧹 Conversation history cleared!\n")
      return true

    case "help":
      displayHelp()
      return true

    case "history":
      displayHistory()
      return true

    default:
      return false
  }
}

// Generate AI response with error handling
async function generateResponse(userInput: string): Promise<void> {
  try {
    // Add user message to history
    messages.push({ role: "user", content: userInput })

    // Generate streaming response
    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      system: `You are a helpful, friendly, and knowledgeable AI assistant. 
               Provide informative, concise, and relevant responses. 
               Maintain a conversational tone and encourage follow-up questions.
               If you're unsure about something, be honest about it.`,
    })

    let fullResponse = ""
    process.stdout.write("\n🤖 AI: ")

    // Stream the response in real-time
    for await (const delta of result.textStream) {
      fullResponse += delta
      process.stdout.write(delta)
    }

    process.stdout.write("\n\n")

    // Add AI response to history
    messages.push({ role: "assistant", content: fullResponse })
  } catch (error) {
    console.error("\n❌ I apologize, but I encountered an error while processing your request.")
    console.error("This might be due to:")
    console.error("- Network connectivity issues")
    console.error("- API rate limits")
    console.error("- Invalid API key configuration")
    console.error("\nPlease try again, or ask a different question.\n")

    // Remove the user message if response failed
    if (messages[messages.length - 1]?.role === "user") {
      messages.pop()
    }
  }
}

// Main conversation loop
async function startConversation(): Promise<void> {
  displayWelcome()

  while (true) {
    try {
      const userInput = await terminal.question("👤 You: ")

      // Handle empty input
      if (!userInput.trim()) {
        console.log("💭 Please enter a message or command.\n")
        continue
      }

      // Check for special commands
      if (handleCommand(userInput)) {
        continue
      }

      // Generate and display AI response
      await generateResponse(userInput)
    } catch (error) {
      console.error("\n❌ An unexpected error occurred:", error)
      console.log("Please try again.\n")
    }
  }
}

// Graceful shutdown handling
process.on("SIGINT", () => {
  console.log("\n\n👋 Goodbye! Thanks for using the AI Chatbot!")
  process.exit(0)
})

// Start the chatbot
async function main() {
  // Check if OpenAI API key is configured
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Error: OPENAI_API_KEY environment variable is not set.")
    console.error("Please add your OpenAI API key to the .env file.")
    process.exit(1)
  }

  await startConversation()
}

// Handle any uncaught errors
main().catch((error) => {
  console.error("❌ Fatal error:", error)
  process.exit(1)
})
