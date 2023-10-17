import { Gender } from 'src/models/person';
import { ChildAdditionFailedError, PersonNotFoundError } from '../errors';
import { FamilyMember } from 'src/models/family-member';

export class DataSource {
  private static instance: DataSource;
  private static familyMember: Map<string, FamilyMember> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }

    return DataSource.instance;
  }

  /**
   * Helper function for prepopulation.
   *
   * @param {FamilyMember} familyMember
   * @memberof DataSource
   */
  public addMember(familyMember: FamilyMember) {
    DataSource.familyMember.set(familyMember.name, familyMember);
  }

  /*
    1. Save child inside mother
    2. Save child inside father
    3. Save child as sibling to each siblings
    4. Save incomplete record
  */
  public addChild(mothersName: string, childName: string, gender: Gender) {
    const mother = DataSource.familyMember.get(mothersName);

    if (!mother) throw new PersonNotFoundError();

    if (mother.gender !== 'Female') throw new ChildAdditionFailedError();

    let children = mother.children;
    const childsSiblings = [...children];
    if (!children?.length) children = [];

    children.push({
      name: childName,
      gender,
    });

    DataSource.familyMember.set(mothersName, {
      ...mother,
      children,
    });

    const fathersName = mother.spouse.name;

    DataSource.familyMember.set(fathersName, {
      ...mother,
      name: mother.spouse.name,
      gender: mother.spouse.gender,
      spouse: {
        name: mother.name,
        gender: mother.gender,
      },
      children,
    });

    for (const sibling of childsSiblings) {
      const siblingObject = DataSource.familyMember.get(sibling.name);
      let otherSiblings = siblingObject.siblings;

      if (!otherSiblings?.length) otherSiblings = [];

      otherSiblings.push({
        name: childName,
        gender,
      });

      DataSource.familyMember.set(sibling.name, {
        ...siblingObject,
        siblings: otherSiblings,
      });
    }

    const newFamilyMember: FamilyMember = {
      name: childName,
      gender,
      mother: {
        name: mother.name,
        gender: 'Female',
      },
      father: {
        name: fathersName,
        gender: 'Male',
      },
      siblings: childsSiblings,
      children: [],
      spouse: undefined,
    };

    DataSource.familyMember.set(childName, newFamilyMember);
  }

  /**
   * Helper function for adding spouses.
   * 1. Add spouse to partner
   * 2. Add parent to each children
   * 3. Save incomplete record
   *
   * @param {string} partnerName
   * @param {string} name
   * @param {string} gender
   * @memberof DataSource
   */
  public addSpouse(memberName: string, spouseName: string, gender: Gender) {
    const member = DataSource.familyMember.get(memberName);

    DataSource.familyMember.set(memberName, {
      ...member,
      spouse: {
        name: spouseName,
        gender,
      },
    });

    for (const child of member.children) {
      const childObject = DataSource.familyMember.get(child.name);

      DataSource.familyMember.set(child.name, {
        ...childObject,
        ...(gender === 'Female' && {
          mother: {
            name: spouseName,
            gender: 'Female',
          },
        }),
        ...(gender === 'Male' && {
          father: {
            name: spouseName,
            gender: 'Male',
          },
        }),
      });
    }

    const newFamilyMember: FamilyMember = {
      name: spouseName,
      gender,
      spouse: {
        name: member.name,
        gender: member.gender,
      },
      children: member.children,
      mother: undefined,
      father: undefined,
      siblings: undefined,
    };

    DataSource.familyMember.set(spouseName, newFamilyMember);
  }

  public getFamilyMember(name: string) {
    return DataSource.familyMember.get(name);
  }
}
