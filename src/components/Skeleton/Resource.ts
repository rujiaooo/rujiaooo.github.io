
export enum ButtonTheme {
  DEFAULT = ""
}

export type ButtonThemeProps = ""

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()
defaultTheme.set("container", "animate-pulse bg-slate-200")
defaultTheme.set("container-rounded-true", "rounded-xl")
defaultTheme.set("container-rounded-false", "")

themes.set(ButtonTheme.DEFAULT, defaultTheme)

export class SkeletonStyle {
  private theme: string = ""
  private rounded: boolean = false

  public buildContainer(): string {
    let style = ""

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("container")) {
      style += theme.get("container")
    }

    if (theme.has(`container-${this.rounded}`)) {
      style += " " + theme.get(`container-${this.rounded}`)
    }

    return style
  }

  public setTheme(theme: string): SkeletonStyle {
    this.theme = theme
    return this
  }

  public setRounded(rounded?: boolean): SkeletonStyle {
    this.rounded = rounded || false
    return this
  }
}
