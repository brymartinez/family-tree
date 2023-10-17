import { DataSource } from './data/datasource';
import { PersonNotFoundError } from './errors';
import { Gender } from './models/person';
import { RelationshipObject } from './relationships/relationship';
import { Adapter } from './utils/adapter';
import fs from 'fs';

(async () => {
  const datasource = DataSource.getInstance();

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

  for (const commands of commandsText) {
    try {
      const splitText = commands.split(' ');
      const command = splitText[0];

      switch (command) {
        case 'GET_RELATIONSHIP':
          const member = splitText[1];
          const rel = splitText[2].toLowerCase();
          console.log(
            new Adapter(RelationshipObject[rel]?.get(member)).transform() ??
              new PersonNotFoundError().message,
          );
          break;
        case 'ADD_CHILD':
          const mother = splitText[1];
          const child = splitText[2];
          const gender = splitText[3] as Gender;
          datasource.addChild(mother, child, gender);
          console.log('CHILD_ADDED');
          break;
        default:
          break;
      }
    } catch (e) {
      console.log(e.message);
    }
  }
})();
