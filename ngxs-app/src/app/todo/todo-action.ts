export class AddItemAction {
  static readonly type = '[TODO page] Add item';
  constructor(public name: string) {
  }
}

export class ToggleItemAction {
  static readonly type = '[TODO page] Toggle item';
  constructor(public id: number) {
  }
}
