import { Command } from '../utils/interfaces';
import { DataSource } from '../data/datasource';
import { Adapter } from '../utils/adapter';
import { Gender } from '../models/person';
import { PersonNotFoundError } from '../errors';
import { RelationshipObject } from '../relationships/relationship';

export class Controller {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private dataSource: DataSource, private adapter: Adapter) {}

  public do(cmd: Command, args: string[]): void {
    console.log(args);
    switch (cmd) {
      case Command.ADD_CHILD:
        const mother = args[0];
        const child = args[1];
        const gender = args[2] as Gender;
        this.dataSource.addChild(mother, child, gender);
        console.log('CHILD_ADDED');
        break;
      case Command.GET_RELATIONSHIP:
        const member = args[0];
        const rel = args[1].toLowerCase();
        console.log(
          this.adapter.transform(RelationshipObject[rel]?.get(member)) ??
            new PersonNotFoundError().message,
        );
        break;
      default:
        break;
    }
  }
}
