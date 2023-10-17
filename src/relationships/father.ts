import { Relationship } from './relationship';
import { DataSource } from 'src/data/datasource';

export class Father implements Relationship {
  constructor(private dataSource: DataSource) {}

  get(name: string) {
    return [this.dataSource.getFamilyMember(name).father];
  }
}
