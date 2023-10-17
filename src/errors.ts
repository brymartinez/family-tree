export class PersonNotFoundError extends Error {
  constructor() {
    super('PERSON_NOT_FOUND');
  }
}

export class ChildAdditionFailedError extends Error {
  constructor() {
    super('CHILD_ADITION_FAILED');
  }
}
