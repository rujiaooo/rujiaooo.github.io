
export const ACTION_SUCCESS = 1000;
export const ACTION_FAILED = 1001;
export const INVALID_PARAM = 1002;
export const ACTION_FORBIDDEN = 1003;
export const RESOURCE_NOTFOUND = 1004;
export const COMMUNICATION_ERROR = 1006;
export const RESOURCE_EXISTS = 1007;
export const INVALID_PRECONDITION = 1009;
export const NETWORK_ERROR = 1010;
export const UNEXPECTED_ERROR = 1011;

export enum StatusCode {
  ACTION_SUCCESS = 1000,
  ACTION_FAILED = 1001,
  INVALID_PARAM = 1002,
  ACTION_FORBIDDEN = 1003,
  RESOURCE_NOTFOUND = 1004,
  COMMUNICATION_ERROR = 1006,
  RESOURCE_EXISTS = 1007,
  INVALID_PRECONDITION = 1009,
  NETWORK_ERROR = 1010,
  UNEXPECTED_ERROR = 1011,
}

export class Status {

  constructor(
    public message: string,
    public code: number,
    public validationErrors: Map<string, string[]> = new Map()
  ) { }

  public Any(codes: number[]): boolean {
    return Status.Any(this.code, codes)
  }

  public Is(code: number): boolean {
    return Status.Any(this.code, [code])
  }

  public static Any(code: number, codes: number[]): boolean {
    let valid = false
    for (let i = 0; i < codes.length; i++) {
      if (code === codes[i]) {
        valid = true
        break
      }
    }
    return valid
  }

  public static async FromResponse(response: Response): Promise<Status> {
    try {
      const data = await response.json()

      const message = data.message || "error occured"
      const code = data.code || StatusCode.ACTION_FAILED

      const validationErrors = new Map<string, string[]>([])
      switch (response.status) {
        case 400:
          // eslint-disable-next-line no-case-declarations
          const errors = data.validation_errors as Record<string, string[]>
          if (errors) {
            for (const key in errors) {
              validationErrors.set(key, errors[key])
            }
          }
          break
      }

      return new Status(message, code, validationErrors)
    } catch (e: unknown) {
      const err = e as Error
      return new Status(err.message, StatusCode.UNEXPECTED_ERROR)
    }
  }

}
