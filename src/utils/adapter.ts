import { Person } from '../models/person';

export class Adapter {
  transform(persons: Person[]) {
    if (!persons.length) return 'NONE';
    const nameArray = persons.map((person) => person.name);
    return nameArray.join(' ');
  }
}
