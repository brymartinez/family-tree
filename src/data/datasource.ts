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
   * For prepopulation only.
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
  public addChild(mothersName: string, childName: string, gender: string) {
    const mother = DataSource.familyMember.get(mothersName);

    if (!mother) throw new Error('PERSON_NOT_FOUND');

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
      mother: mother,
      father: {
        name: fathersName,
        gender: 'M',
      },
      siblings: childsSiblings,
      children: [],
      spouse: undefined,
    };

    DataSource.familyMember.set(childName, newFamilyMember);
  }

  public getFamilyMember(name: string) {
    return DataSource.familyMember.get(name);
  }
}
