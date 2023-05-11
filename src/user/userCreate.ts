class UserCreate {
  private _name: string
  private _email: string

  constructor(name: string, email: string) {
    this._name = name
    this._email = email
  }

  public get name() {
    return this._name
  }

  public get email() {
    return this._email
  }
}

export default UserCreate
