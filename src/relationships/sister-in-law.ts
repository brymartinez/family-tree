import { PersonNotFoundError } from '../errors';
import { Relationship } from './relationship';
import { DataSource } from '../data/datasource';
import { Person } from 'src/models/person';

export class SisterInLaw implements Relationship {
  constructor(private dataSource: DataSource) {}

  get(name: string) {
    const siblings = this.dataSource.getFamilyMember(name)?.siblings;

    if (!siblings) throw new PersonNotFoundError();

    const inLaws: Person[] = [];
    for (const sibling of siblings) {
      const siblingObject = this.dataSource.getFamilyMember(sibling.name);
      if (siblingObject.spouse && siblingObject.spouse.gender === 'Female') {
        inLaws.push({ name: siblingObject.name, gender: siblingObject.gender });
      }
    }
    return inLaws;
  }
}
