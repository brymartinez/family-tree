import { Relationship } from './relationship';
import { DataSource } from 'src/data/datasource';

export class Mother implements Relationship {
  constructor(private dataSource: DataSource) {}

  get(name: string) {
    // console.log(this.dataSource.getFamilyMember('Bill'));
    return [this.dataSource.getFamilyMember(name).mother];
  }
}
