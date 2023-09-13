# Summify Discord Bot

Summify is a Discord bot that DMs you a summary of unread messages in the current channel using GPT-4.

## 🌟 Features

- 📝 Summarizes unread messages in the current channel.
- 🤖 Uses GPT-4 for generating summaries.
- 💾 Option to save messages to a file.
- 📊 Integrates with Prisma for database operations.

## 🚀 Setup

### Prerequisites

- Node.js
- A Discord account and bot token.
- An OpenAI account and API key.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/summify-discord.git
   cd summify-discord
   yarn
   ```
2. **Create a .env file in the root directory and populate it with your credentials:**
   ```
   DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY
   DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID
   SAVE_MESSAGES=true_or_false
   ```
3. **Run the Bot:**
  ```bash
   npm start
   ```

## 📜 Usage

- **Invite the Bot to Your Server**: Use the Discord developer portal to generate an invite link.
- **Use the Command**: In any channel, type `/summify` to get a summary of the last 100 messages.

## 🤝 Contributing

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file in the project root for more details.
