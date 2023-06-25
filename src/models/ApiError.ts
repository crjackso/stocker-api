import { IError } from '@app/types'

class ApiError implements IError {
  public readonly error = true
  constructor(readonly message: string) {}
}

export default ApiError
