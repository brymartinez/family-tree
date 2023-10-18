import { DataSource } from 'src/data/datasource';

describe('DataSource', () => {
  const dataSource = DataSource.getInstance();

  it('should fail to add', () => {
    expect(() =>
      dataSource.addChild('Queen Margret', 'Bill', 'Male'),
    ).toThrowError(/PERSON_NOT_FOUND/);
  });
  it('should add successfully', () => {
    dataSource.addMember({
      name: 'King Arthur',
      gender: 'Male',
      mother: undefined,
      father: undefined,
      siblings: undefined,
      children: [],
      spouse: {
        name: 'Queen Margret',
        gender: 'Female',
      },
    });

    dataSource.addMember({
      name: 'Queen Margret',
      gender: 'Female',
      mother: undefined,
      father: undefined,
      siblings: undefined,
      children: [],
      spouse: {
        name: 'King Arthur',
        gender: 'Male',
      },
    });

    expect(() =>
      dataSource.addChild('Queen Margret', 'Bill', 'Male'),
    ).not.toThrow();
  });
});
