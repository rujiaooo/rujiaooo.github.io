
export enum SpinnerSize {
  XLARGE = "xl",
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
  TINY = "xs",
}

export type SpinnerSizeProps = "xl" | "lg" | "md" | "sm" | "xs"

export enum SpinnerVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning"
}

export type SpinnerVariantProps = "primary" | "secondary" | "info" | "success" | "danger" | "warning"

export enum SpinnerTheme {
  DEFAULT = ""
}

export type SpinnerThemeProps = ""

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()

defaultTheme.set("container", "animate-spin border-[4px] border-current border-t-transparent rounded-full")

defaultTheme.set(`size-${SpinnerSize.XLARGE}`, "w-36 h-36")
defaultTheme.set(`size-${SpinnerSize.LARGE}`, "w-24 h-24")
defaultTheme.set(`size-${SpinnerSize.MEDIUM}`, "w-16 h-16")
defaultTheme.set(`size-${SpinnerSize.SMALL}`, "w-10 h-10")
defaultTheme.set(`size-${SpinnerSize.TINY}`, "w-4 h-4")

defaultTheme.set(`variant-${SpinnerVariant.PRIMARY}`, "text-gray-700")
defaultTheme.set(`variant-${SpinnerVariant.SECONDARY}`, "text-white")
defaultTheme.set(`variant-${SpinnerVariant.INFO}`, "text-blue-500")
defaultTheme.set(`variant-${SpinnerVariant.SUCCESS}`, "text-green-500")
defaultTheme.set(`variant-${SpinnerVariant.DANGER}`, "text-rose-500")
defaultTheme.set(`variant-${SpinnerVariant.WARNING}`, "text-amber-500")

themes.set(SpinnerTheme.DEFAULT, defaultTheme)

export class SpinnerStyle {

  private theme: string = ""
  private variant: string = ""
  private size: string = ""
  private appendedClassNames: string = ""

  public buildContainer(): string {
    let style = ""

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("container")) {
      style += theme.get("container")
    }

    if (theme.has(`variant-${this.variant}`)) {
      style += " " + theme.get(`variant-${this.variant}`)
    }

    if (theme.has(`size-${this.size}`)) {
      style += " " + theme.get(`size-${this.size}`)
    }

    if (this.appendedClassNames !== "") {
      style += " " + this.appendedClassNames
    }

    return style
  }

  public setVariant(variant: string): SpinnerStyle {
    this.variant = variant
    return this
  }

  public setSize(size: string): SpinnerStyle {
    this.size = size
    return this
  }

  public appendClassNames(classNames?: string): SpinnerStyle {
    this.appendedClassNames = classNames || ""
    return this
  }

}
