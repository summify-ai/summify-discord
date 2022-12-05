import { Client } from "discord.js";
import ready from "./listeners/ready";
import dotenv from "dotenv";
dotenv.config();

const token = process.env.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: [],
});

ready(client);
client.login(token);

console.log(client);
