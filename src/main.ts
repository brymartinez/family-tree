import { DataSource } from './data/datasource';
import { RelationshipObject } from './relationships/relationship';

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
// datasource.addChild('Queen Margret', 'Percy', 'M');
// const command = 'GET_RELATIONSHIP Bill Mother';

const rel = 'mother';

console.log(
  RelationshipObject[rel]?.get('Bill') || new Error('Relationship not found.'),
);
