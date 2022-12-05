import { Client } from "discord.js";
import ready from "./listeners/ready";
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;
console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

ready(client);
client.login(token);
