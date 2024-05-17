import { IError } from '@app/types/error'

class ApiError implements IError {
  public readonly error = true
  constructor(readonly message: string) {}
}

export default ApiError
