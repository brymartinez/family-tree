import { DataSource } from '../data/datasource';
import { Mother } from './mother';
import { Father } from './father';
import { Siblings } from './siblings';
import { Person } from 'src/models/person';
import { Spouse } from './spouse';
import { Children } from './children';
import { MaternalAunt } from './maternal-aunt';
import { SisterInLaw } from './sister-in-law';

export interface Relationship {
  get(name: string): Person[];
}

export class RelationshipFactory {
  relationshipObject = {
    mother: Mother,
    father: Father,
    siblings: Siblings,
    spouse: Spouse,
    children: Children,
    'maternal-aunt': MaternalAunt,
    'sister-in-law': SisterInLaw,
  };

  constructor(private dataSource: DataSource) {}

  create(factoryName: string): Relationship {
    return new this.relationshipObject[factoryName](this.dataSource);
  }
}
