import { Controller } from './controller/controller';
import { DataSource } from './data/datasource';
import { Adapter } from './utils/adapter';
import fs from 'fs';
import { Command } from './utils/interfaces';
import { RelationshipFactory } from './relationships/relationship';

(async () => {
  const datasource = new DataSource();

  datasource.addMember({
    name: 'King Arthur',
    gender: 'Male',
    mother: undefined,
    father: undefined,
    siblings: undefined,
    children: [],
    spouse: {
      name: 'Queen Margret',
      gender: 'Female',
    },
  });

  datasource.addMember({
    name: 'Queen Margret',
    gender: 'Female',
    mother: undefined,
    father: undefined,
    siblings: undefined,
    children: [],
    spouse: {
      name: 'King Arthur',
      gender: 'Male',
    },
  });

  datasource.addChild('Queen Margret', 'Bill', 'Male');
  datasource.addChild('Queen Margret', 'Charlie', 'Male');
  datasource.addChild('Queen Margret', 'Percy', 'Male');
  datasource.addSpouse('Bill', 'Flora', 'Female');
  datasource.addChild('Flora', 'Victoire', 'Female');
  datasource.addChild('Flora', 'Dominique', 'Female');
  datasource.addChild('Flora', 'Louis', 'Male');
  datasource.addSpouse('Victoire', 'Ted', 'Male');
  datasource.addChild('Victoire', 'Remus', 'Male');
  // const command = 'GET_RELATIONSHIP Bill Mother';
  // start of function
  const fileName = process.argv[2];
  const file = fs.readFileSync(fileName, { encoding: 'utf8' });
  const commandsText = file.split('\n');

  // initialize controller
  const controller = new Controller(
    datasource,
    new RelationshipFactory(datasource),
    new Adapter(),
  );

  for (const commands of commandsText) {
    try {
      const splitText = commands.split(' ');
      const command = splitText[0] as Command;
      controller.do(command, splitText.slice(1, splitText.length));
    } catch (e) {
      console.log(e.message);
    }
  }
})();
