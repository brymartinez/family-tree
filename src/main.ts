import { DataSource } from './data/datasource';
import { RelationshipObject } from './relationships/relationship';

(async () => {
  const datasource = DataSource.getInstance();

  datasource.addMember({
    name: 'King Arthur',
    gender: 'M',
    mother: undefined,
    father: undefined,
    siblings: undefined,
    children: [],
    spouse: {
      name: 'Queen Margret',
      gender: 'F',
    },
  });

  datasource.addMember({
    name: 'Queen Margret',
    gender: 'F',
    mother: undefined,
    father: undefined,
    siblings: undefined,
    children: [],
    spouse: {
      name: 'King Arthur',
      gender: 'M',
    },
  });

  datasource.addChild('Queen Margret', 'Bill', 'M');
  datasource.addChild('Queen Margret', 'Charlie', 'M');
  datasource.addChild('Queen Margret', 'Percy', 'M');
  datasource.addSpouse('Bill', 'Flora', 'F');
  datasource.addChild('Bill', 'Victoire', 'F');
  datasource.addChild('Bill', 'Dominique', 'F');
  datasource.addChild('Bill', 'Louis', 'M');
  datasource.addSpouse('Victoire', 'Ted', 'M');
  datasource.addChild('Victoire', 'Remus', 'M');

  // const command = 'GET_RELATIONSHIP Bill Mother';

  const rel = 'mother';

  console.log(
    RelationshipObject[rel]?.get('Remus') ||
      new Error('Relationship not found.'),
  );
})();
