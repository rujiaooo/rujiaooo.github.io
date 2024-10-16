import * as Yup from "yup"
import * as YupPhone from "yup-phone-lite"
import { ValidationError as YupValidationError } from "yup"

type Rule = {
  [k: string]: never;
}

type Option = {
  abortEarly?: boolean
}

type ValidatorResult = {
  validate: Validator
}

type Validator = (data: unknown) => ValidationResult

export type ValidationResult = {
  error?: ValidationError
  data?: unknown
}

export class ValidationError {
  public message: string
  private issues: Map<string, string[]>

  constructor(message: string, issues: Map<string, string[]> = new Map()) {
    this.message = message
    this.issues = issues
  }

  public hasIssues(): boolean {
    return this.issues && this.issues.size > 0
  }

  public getIssues(): Map<string, string[]> {
    return this.issues
  }

}

export function useValidator(rule: Rule, opt?: Option): [ValidatorResult] {
  const {
    abortEarly = false,
  } = opt || {
    abortEarly: false,
  }

  const yupValidator = Yup.object(rule)

  function validate(data: unknown): ValidationResult {
    try {
      const res = yupValidator.validateSync(data, {
        abortEarly,
      })
      return {
        data: res
      }
    } catch (err: unknown) {
      if (!(err instanceof YupValidationError)) {
        const e = err as Error
        return {
          error: new ValidationError(e.message)
        }
      }

      const issues = new Map<string, string[]>()
      for (const e of err.inner) {
        if (!e.path) {
          continue
        }

        const key = e.path.replace("[", ".").replace("].", ".")
        issues.set(key, e.errors)
      }

      return {
        error: new ValidationError(err.message, issues)
      }
    }
  }

  const validator = {
    validate
  }
  return [validator]
}

export {
  Yup as Validator,
  YupPhone as PhoneValidator
}