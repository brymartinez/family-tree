import { DataSource } from '../data/datasource';
import { Mother } from './mother';
import { Father } from './father';
import { Siblings } from './siblings';
import { Person } from 'src/models/person';

export interface Relationship {
  get(name: string, relationship: string): Person[];
}

export const RelationshipObject = {
  mother: new Mother(DataSource.getInstance()),
  father: new Father(DataSource.getInstance()),
  siblings: new Siblings(DataSource.getInstance()),
};
