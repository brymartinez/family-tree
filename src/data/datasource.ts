export class DataSource {
  private static instance: DataSource;
  private static siblings: Map<string, Record<string, unknown>[]> = new Map();
  private static parents: Map<string, Record<string, unknown>[]> = new Map();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance() {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }

    return DataSource.instance;
  }

  public addSibling(child: string, siblingName: string, gender: string) {
    let siblings = DataSource.siblings.get(child);

    if (!siblings?.length) siblings = [];

    siblings.push({
      name: siblingName,
      gender,
    });

    DataSource.siblings.set(child, siblings);
  }

  public addParent(child: string, parentName: string, gender: string) {
    let parents = DataSource.parents.get(child);

    if (!parents?.length) parents = [];

    parents.push({
      name: parentName,
      gender,
    });

    DataSource.parents.set(child, parents);
  }

  public get(siblings: boolean, name: string) {
    if (siblings) {
      return DataSource.siblings.get(name) ?? [];
    } else {
      return DataSource.parents.get(name) ?? [];
    }
  }
}
