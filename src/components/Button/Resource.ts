
export enum ButtonType {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
}

export enum ButtonSize {
  XXLARGE = "2xl",
  XLARGE = "xl",
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}

export enum ButtonTheme {
  DEFAULT = ""
}

export type ButtonTypeProps = "button" | "reset" | "submit"
export type ButtonVariantProps = "primary" | "secondary" | "info" | "success" | "danger" | "warning"
export type ButtonSizeProps = "2xl" | "xl" | "lg" | "md" | "sm"
export type ButtonThemeProps = ""

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()
defaultTheme.set("", "inline-block ease-out duration-500 disabled:bg-gray-300 disabled:border-0 disabled:text-gray-800")

defaultTheme.set(`variant-${ButtonVariant.PRIMARY}`, "bg-confucius-primary hover:bg-red-500 text-white")
defaultTheme.set(`variant-${ButtonVariant.SECONDARY}`, "bg-confucius-black text-white")
defaultTheme.set(`variant-${ButtonVariant.INFO}`, "bg-blue-500 hover:bg-blue-400 text-white")
defaultTheme.set(`variant-${ButtonVariant.SUCCESS}`, "bg-green-600 hover:bg-green-500 text-white")
defaultTheme.set(`variant-${ButtonVariant.DANGER}`, "bg-red-600 hover:bg-red-400 text-white")
defaultTheme.set(`variant-${ButtonVariant.WARNING}`, "bg-amber-600 hover:bg-amber-700 text-white")

defaultTheme.set(`size-${ButtonSize.XXLARGE}`, "rounded-lg py-4 lg:py-5 px-8 sm:px-8 md:px-10 lg:px-12 text-base md:text-xl")
defaultTheme.set(`size-${ButtonSize.XLARGE}`, "rounded-lg py-3.5 lg:py-4 px-6 sm:px-6 md:px-8 lg:px-10 text-base md:text-lg")
defaultTheme.set(`size-${ButtonSize.LARGE}`, "rounded-md py-3 px-8 lg:px-10")
defaultTheme.set(`size-${ButtonSize.MEDIUM}`, "rounded-md py-2.5 px-6")
defaultTheme.set(`size-${ButtonSize.SMALL}`, "rounded-md py-1 px-4 text-sm")

defaultTheme.set("disabled-true", "cursor-not-allowed")
defaultTheme.set("disabled-false", "cursor-pointer")

themes.set(ButtonTheme.DEFAULT, defaultTheme)

export class ButtonStyle {

  private theme: string = ""
  private variant: string = ""
  private size: string = ""
  private disabled: boolean = false
  private appendedClassNames: string = ""

  public build(): string {
    let style = ""

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("")) {
      style += theme.get("")
    }

    if (theme.has(`variant-${this.variant}`)) {
      style += " " + theme.get(`variant-${this.variant}`)
    }

    if (theme.has(`size-${this.size}`)) {
      style += " " + theme.get(`size-${this.size}`)
    }

    if (theme.has(`disabled-${this.disabled}`)) {
      style += " " + theme.get(`disabled-${this.disabled}`)
    }

    if (this.appendedClassNames !== "") {
      style += " " + this.appendedClassNames
    }

    return style
  }

  public setTheme(theme: string): ButtonStyle {
    this.theme = theme
    return this
  }

  public setVariant(variant: string): ButtonStyle {
    this.variant = variant
    return this
  }

  public setSize(size: string): ButtonStyle {
    this.size = size
    return this
  }

  public setDisabled(disabled?: boolean): ButtonStyle {
    this.disabled = disabled || false
    return this
  }

  public appendClassNames(classNames?: string): ButtonStyle {
    this.appendedClassNames = classNames || ""
    return this
  }

}