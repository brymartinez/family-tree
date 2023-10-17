import { Person } from 'src/models/person';

export class Adapter {
  constructor(private persons: Person[]) {}

  transform() {
    const nameArray = this.persons.map((person) => person.name);
    return nameArray.join(' ');
  }
}
