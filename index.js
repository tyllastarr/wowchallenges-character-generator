// Includes
const config = require("./config.json");
const discord = require("discord.js");

// Create the chatbot interface
const client = new discord.Client();

// Initialize the arrays for the contest roller
const contestRaces = ["Tauren", "Dwarf"];
const contestClasses = ["Druid", "Mage", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
const contestCombinations = [
	[true, false, true, false, true, false, true],
	[false, true, true, true, true, true, true]
];

// Initialize the arrays for the non-contest roller
const races = ["Human", "Dwarf", "Gnome", "Night Elf", "Draenei", "Worgen", "Void Elf", "Lightforged Draenei", "Dark Iron Dwarf", "Kul Tiran Human", "Pandaren", "Orc", "Troll", "Tauren", "Undead", "Blood Elf", "Goblin", "Nightborne", "Highmountain Tauren", "Mag'har Orc", "Zandalari Troll"];
const classes = ["Death Knight", "Demon Hunter", "Druid", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
const combinations = [
	[true, false, false, true, true, true, true, true, true, false, true, true],
	[true, false, false, true, true, true, true, true, true, true, true, true],
	[true, false, false, true, true, true, false, true, true, false, true, true],
	[true, true, true, true, true, true, false, true, true, false, false, true],
	[true, false, false, true, true, true, true, true, false, true, false, true],
	[true, false, true, true, true, false, false, true, true, false, true, true],
	[false, false, false, true, true, true, false, true, true, false, true, true],
	[false, false, false, true, true, false, true, true, false, false, false, true],
	[false, false, false, true, true, true, true, true, true, true, true, true],
	[false, false, true, true, true, true, false, true, true, true, false, true],
	[false, false, false, true, true, true, false, true, true, true, false, true],
	[true, false, false, true, true, true, false, false, true, true, true, true],
	[true, false, true, true, true, true, false, true, true, true, true, true],
	[true, false, true, true, false, true, true, true, false, true, false, true],
	[true, false, false, true, true, true, false, true, true, false, true, true],
	[true, true, false, true, true, true, true, true, true, false, true, true],
	[true, false, false, true, true, false, false, true, true, true, true, true],
	[false, false, false, true, true, true, false, true, true, false, true, true],
	[false, false, true, true, false, true, false, false, false, true, false, true],
	[false, false, false, true, true, true, false, true, true, true, false, true],
	[false, false, true, true, true, true, true, true, true, true, false, true]
];

// Initialize the general arrays
const genders = ["Male", "Female"];
const factions = ["Alliance", "Horde"];

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
	let faction, race, raceIndex, charClass, classIndex, gender, spec, specs;

	switch(factionInput) {
	case "Alliance":
		raceIndex = 1;
		race = "Dwarf"; // Dwarf is the only available Alliance race for this contest.
		faction = "Alliance";
		break;
	case "Horde":
		raceIndex = 0;
		race = "Tauren"; // Tauren is the only available Horde race for this contest.
		faction = "Horde";
		break;
	case "Both":
		raceIndex = random(0, 1);
		race = contestRaces[raceIndex];
		switch(race) {
		case "Tauren":
			faction = "Horde";
			break;
		case "Dwarf":
			faction = "Alliance";
			break;
		}
	}

	do {
		classIndex = random(0, 6);
	} while(!contestCombinations[raceIndex][classIndex]);
	charClass = contestClasses[classIndex];
    
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
    
	disc.reply(`you rolled a ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())} ${gender} ${race} ${spec} ${charClass} ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())}`);
}

// Generate non-contest character
function roll(factionInput) {
	let faction, race, raceIndex, charClass, classIndex, gender, spec, specs;

	switch(factionInput) {
	case "Alliance":
		raceIndex = random(0, 10);
		race = races[raceIndex];
		faction = "Alliance";
		break;
	case "Horde":
		raceIndex = random(10, 21);
		race = races[raceIndex];
		faction = "Horde";
		break;
	case "Both":
		raceIndex = random(0, 21);
		race = races[raceIndex];
		if(raceIndex < 10) {
			faction = "Alliance";
		} else if(raceIndex > 10) {
			faction = "Horde";
		} else {
			faction = factions[random(0, 1)];
		}
		break;
	}

	do {
		classIndex = random(0, 11);
	} while(!combinations[raceIndex][classIndex]);
	charClass = classes[classIndex];
	
	gender = genders[random(0, 1)];

	switch(charClass)
	{
	case "Death Knight":
		specs = ["Blood", "Frost", "Unholy"];
		break;
	case "Demon Hunter":
		specs = ["Havoc", "Vengeance"];
		break;
	case "Druid":
		specs = ["Balance", "Feral", "Guardian", "Restoration"];
		break;
	case "Hunter":
		specs = ["Beast Mastery", "Marksmanship", "Survival"];
		break;
	case "Mage":
		specs = ["Arcane", "Fire", "Frost"];
		break;
	case "Monk":
		specs = ["Brewmaster", "Mistweaver", "Windwalker"];
		break;
	case "Paladin":
		specs = ["Holy", "Protection", "Retribution"];
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
    
	disc.reply(`you rolled a ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())} ${gender} ${race} ${spec} ${charClass} ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())}`);
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
	if(message.channel.name === config.channel) {
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
		if(message.content.startsWith(`${config.prefix}roll`)) {
			disc = message;
		
			if(message.content == `${config.prefix}roll`) { // No params
				roll("Both");
			} else {
				let factionParam = message.content.slice(6);
				switch(factionParam) {
				case "alliance":
					roll("Alliance");
					break;
				case "horde":
					roll("Horde");
					break;
				default: // If it isn't valid, ignore it and treat as no param
					roll("Both");
					break;
				}
			}
		}
	}
});