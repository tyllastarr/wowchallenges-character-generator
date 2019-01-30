import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faction: string;
  race: string;
  gender: string;
  charClass: string;
  spec: string;

  races: string[] = ['Tauren', 'Dwarf'];
  classes: string[] = ['Druid', 'Mage', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];
  specs: string[];
  genders: string[] = ['Male', 'Female'];

  roll(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }

  rollBoth() {
    this.charClass = this.classes[this.roll(0, 6)];
    switch (this.charClass) {
      case 'Mage':
      case 'Rogue':
      case 'Warlock':
        this.faction = 'Alliance';
        this.race = 'Dwarf';
        break;
      case 'Druid':
        this.faction = 'Horde';
        this.race = 'Tauren';
        break;
      default:
        this.race = this.races[this.roll(0, 1)];
        if (this.race === 'Tauren') {
          this.faction = 'Horde';
        } else {
          this.faction = 'Alliance';
        }
    }
    this.rollFinal();
  }

  rollAlli() {
    do {
      this.charClass = this.classes[this.roll(0, 6)];
    } while (this.charClass === 'Druid');
    this.faction = 'Alliance';
    this.race = 'Dwarf';
    this.rollFinal();
  }

  rollHorde() {
    do {
      this.charClass = this.classes[this.roll(0, 6)];
    } while (this.charClass === 'Mage' || this.charClass === 'Rogue' || this.charClass === 'Warlock');
    this.faction = 'Horde';
    this.race = 'Tauren';
    this.rollFinal();
  }

  rollFinal() {
    this.gender = this.genders[this.roll(0, 1)];
    switch (this.charClass) {
      case 'Druid':
        this.specs = ['Balance', 'Feral', 'Guardian', 'Restoration'];
        break;
      case 'Mage':
        this.specs = ['Arcane', 'Fire', 'Frost'];
        break;
      case 'Priest':
        this.specs = ['Discipline', 'Holy', 'Shadow'];
        break;
      case 'Rogue':
        this.specs = ['Assassination', 'Outlaw', 'Subtlety'];
        break;
      case 'Shaman':
        this.specs = ['Elemental', 'Enhancement', 'Restoration'];
        break;
      case 'Warlock':
        this.specs = ['Affliction', 'Demonology', 'Destruction'];
        break;
      case 'Warrior':
        this.specs = ['Arms', 'Fury', 'Protection'];
        break;
    }

    if (this.charClass === 'Druid') {
      this.spec = this.specs[this.roll(0, 3)];
    } else {
      this.spec = this.specs[this.roll(0, 2)];
    }
  }

  onRoll(alliance: boolean, horde: boolean) {
    if (!alliance && !horde) {
      alert('No factions chosen!');
    } else if (alliance && horde) {
      this.rollBoth();
    } else if (alliance) {
      this.rollAlli();
    } else { // Horde
      this.rollHorde();
    }
  }
}
