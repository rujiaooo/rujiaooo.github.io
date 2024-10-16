
export enum AlertVariant {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  DANGER = "danger",
}

export type AlertVariantProps = "info" | "success" | "warning" | "danger"

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()

defaultTheme.set(`variant-container-${AlertVariant.INFO}`, "bg-blue-200 border-blue-300")
defaultTheme.set(`variant-container-${AlertVariant.SUCCESS}`, "bg-green-200 border-green-300")
defaultTheme.set(`variant-container-${AlertVariant.WARNING}`, "bg-orange-200 border-orange-300")
defaultTheme.set(`variant-container-${AlertVariant.DANGER}`, "bg-red-200 border-red-300")

defaultTheme.set(`variant-title-${AlertVariant.INFO}`, "text-blue-800")
defaultTheme.set(`variant-title-${AlertVariant.SUCCESS}`, "text-green-800")
defaultTheme.set(`variant-title-${AlertVariant.WARNING}`, "text-orange-800")
defaultTheme.set(`variant-title-${AlertVariant.DANGER}`, "text-red-800")

themes.set("", defaultTheme)

export class AlertStyle {
  private variant: string = ""

  public buildContainer(): string {
    let style = "flex flex-row p-5 my-2 rounded border shadow-sm"

    if (defaultTheme.has(`variant-container-${this.variant}`)) {
      style += " " + defaultTheme.get(`variant-container-${this.variant}`)
    }

    return style
  }

  public buildTitle(): string {
    let style = "font-semibold text-md"

    if (defaultTheme.has(`variant-title-${this.variant}`)) {
      style += " " + defaultTheme.get(`variant-title-${this.variant}`)
    }

    return style
  }

  public setVariant(variant: string): AlertStyle {
    this.variant = variant
    return this
  }
}
