// Includes
const config = require("./config.json");
const discord = require("discord.js");

// Create the chatbot interface
const client = new discord.client();

// Log a ready message when ready
client.on("ready", () => {
    console.log("Connected to the chat server.");
});

// Connect to chat server
client.login(config.token);

// Listen for a message
client.on("message", message => {
    message.reply(`message received.`);
});