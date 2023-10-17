import { Relationship } from './relationship';
import { DataSource } from 'src/data/datasource';

export class Children implements Relationship {
  constructor(private dataSource: DataSource) {}

  get(name: string) {
    // console.log(this.dataSource.getFamilyMember('Bill'));
    return this.dataSource.getFamilyMember(name).children;
  }
}
