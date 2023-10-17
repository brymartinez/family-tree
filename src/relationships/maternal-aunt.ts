import { Relationship } from './relationship';
import { DataSource } from 'src/data/datasource';

export class MaternalAunt implements Relationship {
  constructor(private dataSource: DataSource) {}

  get(name: string) {
    // console.log(this.dataSource.getFamilyMember('Bill'));
    const mother = this.dataSource.getFamilyMember(name).mother;
    return (
      this.dataSource
        .getFamilyMember(mother.name)
        .siblings?.filter((sib) => sib.gender === 'Female') ?? []
    );
  }
}
