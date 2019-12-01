// Includes
const config = require("./config.json");
const discord = require("discord.js");
const noncontest = require("./noncontest.json");

// Create the chatbot interface
const client = new discord.Client();

// Initialize the arrays for the contest roller
const contestRaces = ["Troll", "Undead", "Human", "Dwarf"];
/* There is only one class, so the class and combination arrays are not needed.
 * const contestClasses = ["Druid", "Mage", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
 * const contestCombinations = [
 *	[true, false, true, false, true, false, true],
 *	[false, true, true, true, true, true, true]
 *];
 */

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
	let faction, race, raceIndex, charClass,/* classIndex,*/ gender, genderIndex, spec, specIndex, specs;

	switch(factionInput) {
	case "Alliance":
		raceIndex = random(2, 3);
		race = contestRaces[raceIndex];
		faction = "Alliance";
		break;
	case "Horde":
		raceIndex = random(0, 1);
		race = contestRaces[raceIndex];
		faction = "Horde";
		break;
	case "Both":
		raceIndex = random(0, 3);
		race = contestRaces[raceIndex];
		switch(race) {
		case "Troll":
		case "Undead":
			faction = "Horde";
			break;
		case "Human":
		case "Dwarf":
			faction = "Alliance";
			break;
		}
	}
//	console.log("Race is " + race + " (" + raceIndex + ")");
//	console.log("Faction is " + faction);

/* Since there's only one class, rolling classes isn't needed.
 *	do {
 *		classIndex = random(0, 6);
 *	} while(!contestCombinations[raceIndex][classIndex]);
 *	charClass = contestClasses[classIndex];
 */   
	charClass = "Priest";
	genderIndex = random(0, 1);
	gender = genders[genderIndex];
//	console.log("Gender is " + gender + " (" + genderIndex + ")");

/* Since there's only one class, no need for the switch statement to pick specs.
 *	switch(charClass)
 *	{
 *	case "Druid":
 *		specs = ["Balance", "Feral", "Guardian", "Restoration"];
 *		break;
 *	case "Mage":
 *		specs = ["Arcane", "Fire", "Frost"];
 *		break;
 *	case "Priest":
 */
		specs = ["Discipline", "Holy", "Shadow"];
/* Since there's only one class, no need for the switch statement to pick specs.
 *		break;
 *	case "Rogue":
 *		specs = ["Assassination", "Outlaw", "Subtlety"];
 *		break;
 *	case "Shaman":
 *		specs = ["Elemental", "Enhancement", "Restoration"];
 *		break;
 *	case "Warlock":
 *		specs = ["Affliction", "Demonology", "Destruction"];
 *		break;
 *	case "Warrior":
 *		specs = ["Arms", "Fury", "Protection"];
 *		break;
 *	}
 */
	specIndex = random(0, specs.length - 1);
	spec = specs[specIndex];
//	console.log("Spec is " + spec + " (" + specIndex + ")");
    
	disc.reply(`you rolled a ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())} ${gender} ${race} ${spec} ${charClass} ${disc.guild.emojis.find(emoji => emoji.name === faction.toLowerCase())}`);
}

// Generate non-contest character
function roll(factionInput) {
	let faction, race, raceIndex, charClass, classIndex, gender, spec, specs;

	switch(factionInput) {
	case "Alliance":
		raceIndex = random(0, 10);
		race = noncontest.races[raceIndex];
		faction = "Alliance";
		break;
	case "Horde":
		raceIndex = random(10, 21);
		race = noncontest.races[raceIndex];
		faction = "Horde";
		break;
	case "Both":
		raceIndex = random(0, 21);
		race = noncontest.races[raceIndex];
		if(raceIndex < 10) {
			faction = "Alliance";
		} else if(raceIndex > 10) {
			faction = "Horde";
		} else {
			faction = noncontest.factions[random(0, 1)];
		}
		break;
	}

	do {
		classIndex = random(0, 11);
	} while(!noncontest.combinations[raceIndex][classIndex]);
	charClass = noncontest.classes[classIndex];
	
	gender = noncontest.genders[random(0, 1)];

	specs = noncontest.specs[classIndex];
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