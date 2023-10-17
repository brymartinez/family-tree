import { Person } from './person';

export class FamilyMember extends Person {
  mother: Person;
  father: Person;
  siblings: Person[];
  children: Person[];
  spouse: Person;
}
