import { Person } from 'src/models/person';

export class Adapter {
  constructor(private persons: Person[]) {}

  transform() {
    if (!this.persons.length) return 'NONE';
    const nameArray = this.persons.map((person) => person.name);
    return nameArray.join(' ');
  }
}
