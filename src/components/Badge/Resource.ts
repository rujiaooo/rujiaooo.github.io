
export enum BadgeVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

export enum BadgeSize {
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}

export enum BadgeTheme {
  DEFAULT = ""
}

export type BadgeVariantProps = "primary" | "secondary" | "info" | "success" | "warning" | "danger"
export type BadgeSizeProps = "lg" | "md" | "sm"

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()
defaultTheme.set("element", " rounded-3xl border shadow-sm text-xs md:text-base")
defaultTheme.set(`variant-${BadgeVariant.PRIMARY}`, "bg-confucius-primary border-confucius-primary text-white")
defaultTheme.set(`variant-${BadgeVariant.SECONDARY}`, "bg-confucius-black border-confucius-black text-white")
defaultTheme.set(`variant-${BadgeVariant.INFO}`, "bg-blue-400 border-blue-300 text-white")
defaultTheme.set(`variant-${BadgeVariant.SUCCESS}`, "bg-green-400 border-green-300 text-white")
defaultTheme.set(`variant-${BadgeVariant.WARNING}`, "bg-orange-400 border-orange-300 text-white")
defaultTheme.set(`variant-${BadgeVariant.DANGER}`, "bg-red-400 border-red-300 text-white")

defaultTheme.set(`size-${BadgeSize.LARGE}`, "px-8 py-3")
defaultTheme.set(`size-${BadgeSize.MEDIUM}`, "px-6 py-2")
defaultTheme.set(`size-${BadgeSize.SMALL}`, "px-3 py-1")

themes.set(BadgeTheme.DEFAULT, defaultTheme)

export class BadgeStyle {
  private theme: string = ""
  private variant: string = ""
  private size: string = ""
  private appendedClassNames: string = ""

  public buildElement(): string {
    let style = ""

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("element")) {
      style += " " + theme.get("element")
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

  public setTheme(theme: string): BadgeStyle {
    this.theme = theme
    return this
  }

  public setVariant(variant: string): BadgeStyle {
    this.variant = variant
    return this
  }

  public setSize(size: string): BadgeStyle {
    this.size = size
    return this
  }

  public setAppendClassNames(classNames?: string): BadgeStyle {
    this.appendedClassNames = classNames || ""
    return this
  }
}
