// Includes
const config = require("./config.json");
const discord = require("discord.js");

// Create the chatbot interface
const client = new discord.Client();

// Initialize the arrays for the contest roller
const contestRaces = ["Tauren", "Dwarf"];
const contestClasses = ["Druid", "Mage", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];

// Initialize the general arrays
const genders = ["Male", "Female"];

// Other variables
var disc;

// Random number generator
function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

// Generate character for the contest
function contestRoll(factionInput) {
	let faction, race, charClass, gender, spec, specs;
	switch(factionInput) {
	case "Alliance":
		faction = "Alliance";
		race = "Dwarf"; // Dwarf is the only available Alliance race for this contest.
		do {
			charClass = contestClasses[random(0, 6)];
		} while(charClass == "Druid"); // Druid is only available for Horde in this contest.
		break;
	case "Horde":
		faction = "Horde";
		race = "Tauren"; // Tauren is the only available Horde race for this contest.
		do {
			charClass = contestClasses[random(0, 6)];
		} while(charClass == "Mage" || charClass == "Rogue" || charClass == "Warlock"); // Mage, rogue, and warlock are only available for Alliance in this contest.
		break;
	case "Both":
		race = contestRaces[random(0, 1)];
		switch(race) {
		case "Tauren":
			faction = "Horde";
			do {
				charClass = contestClasses[random(0, 6)];
			} while(charClass == "Mage" || charClass == "Rogue" || charClass == "Warlock"); // Mage, rogue, and warlock are only available for Alliance in this contest.
			break;
		case "Dwarf":
			faction = "Alliance";
			do {
				charClass = contestClasses[random(0, 6)];
			} while(charClass == "Druid"); // Druid is only available for Horde in this contest.
			break;
		}
	}
    
	gender = genders[random(0, 1)];

	switch(charClass)
	{
	case "Druid":
		specs = ["Balance", "Feral", "Guardian", "Restoration"];
		break;
	case "Mage":
		specs = ["Arcane", "Fire", "Frost"];
		break;
	case "Priest":
		specs = ["Discipline", "Holy", "Shadow"];
		break;
	case "Rogue":
		specs = ["Assassination", "Outlaw", "Subtlety"];
		break;
	case "Shaman":
		specs = ["Elemental", "Enhancement", "Restoration"];
		break;
	case "Warlock":
		specs = ["Affliction", "Demonology", "Destruction"];
		break;
	case "Warrior":
		specs = ["Arms", "Fury", "Protection"];
		break;
	}
	spec = specs[random(0, specs.length - 1)];
    
	disc.reply(`you rolled a ${disc.guild.emojis.find(val => val.name, faction.toLowerCase())} ${gender} ${race} ${spec} ${charClass} ${disc.guild.emojis.find(val => val.name, faction.toLowerCase())}`);
}

// Log a ready message when ready
client.on("ready", () => {
	// eslint-disable-next-line no-console
	console.log("Connected to the chat server.");
});

// Connect to chat server
client.login(config.token);

// Listen for a message
client.on("message", message => {
	if(message.content.startsWith(`${config.prefix}contestroll`)) {
		disc = message;
       
		if(message.content == `${config.prefix}contestroll`) { // No params
			contestRoll("Both");
		} else {
			let factionParam = message.content.slice(13);
			switch(factionParam) {
			case "alliance":
				contestRoll("Alliance");
				break;
			case "horde":
				contestRoll("Horde");
				break;
			default: // If it isn't valid, ignore it and treat as no param
				contestRoll("Both");
				break;
			}
		}
	}
});