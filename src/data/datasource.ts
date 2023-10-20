import { Gender } from 'src/models/person';
import { ChildAdditionFailedError, PersonNotFoundError } from '../errors';
import { FamilyMember } from 'src/models/family-member';

export class DataSource {
  private familyMember: Map<string, FamilyMember> = new Map();

  /**
   * Helper function for prepopulation.
   *
   * @param {FamilyMember} familyMember
   * @memberof DataSource
   */
  public addMember(familyMember: FamilyMember) {
    this.familyMember.set(familyMember.name, familyMember);
  }

  /*
    1. Save child inside mother
    2. Save child inside father
    3. Save child as sibling to each siblings
    4. Save incomplete record
  */
  public addChild(mothersName: string, childName: string, gender: Gender) {
    const mother = this.familyMember.get(mothersName);

    if (!mother) throw new PersonNotFoundError();

    if (mother.gender !== 'Female') throw new ChildAdditionFailedError();

    let children = mother.children;
    const childsSiblings = [...children];
    if (!children?.length) children = [];

    children.push({
      name: childName,
      gender,
    });

    this.familyMember.set(mothersName, {
      ...mother,
      children,
    });

    const fathersName = mother.spouse.name;

    this.familyMember.set(fathersName, {
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
      const siblingObject = this.familyMember.get(sibling.name);
      let otherSiblings = siblingObject.siblings;

      if (!otherSiblings?.length) otherSiblings = [];

      otherSiblings.push({
        name: childName,
        gender,
      });

      this.familyMember.set(sibling.name, {
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

    this.familyMember.set(childName, newFamilyMember);
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
    const member = this.familyMember.get(memberName);

    this.familyMember.set(memberName, {
      ...member,
      spouse: {
        name: spouseName,
        gender,
      },
    });

    for (const child of member.children) {
      const childObject = this.familyMember.get(child.name);

      this.familyMember.set(child.name, {
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

    this.familyMember.set(spouseName, newFamilyMember);
  }

  public getFamilyMember(name: string) {
    return this.familyMember.get(name);
  }
}
