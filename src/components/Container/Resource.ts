
export enum ContainerSize {
  FULL = "full",
  XXXLARGE = "3xl",
  XXLARGE = "2xl",
  XLARGE = "xl",
  LARGE = "lg",
  MEDIUM = "md",
  SMALL = "sm",
}

export type ContainerSizeProps = "full" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm"

export enum ContainerTheme {
  DEFAULT = ""
}

export type ContainerThemeProps = ""

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()

defaultTheme.set(`size`, "w-full px-6 xl:px-0 mx-auto")
defaultTheme.set(`size-${ContainerSize.FULL}`, "")
defaultTheme.set(`size-${ContainerSize.XXLARGE}`, "xl:max-w-[calc(100%-240px)] 2xl:max-w-[calc(100%-480px)]")
defaultTheme.set(`size-${ContainerSize.XLARGE}`, "xl:max-w-[calc(100%-160px)] 2xl:max-w-[calc(100%-320px)]")
defaultTheme.set(`size-${ContainerSize.LARGE}`, "xl:max-w-[calc(100%-96px)] 2xl:max-w-[calc(100%-192px)]")
defaultTheme.set(`size-${ContainerSize.MEDIUM}`, "xl:max-w-[calc(100%-60px)] 2xl:max-w-[calc(100%-120px)]")
defaultTheme.set(`size-${ContainerSize.SMALL}`, "xl:max-w-[calc(100%-24px)] 2xl:max-w-[calc(100%-48px)]")

themes.set("", defaultTheme)

export class ContainerStyle {
  private theme: string = ""
  private size: string = ""
  private appendedClassNames: string = ""

  public build(): string {
    let style = ""

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has(`size`)) {
      style += theme.get(`size`)
    }

    if (theme.has(`size-${this.size}`)) {
      style += " " + theme.get(`size-${this.size}`)
    }

    if (this.appendedClassNames !== "") {
      style += " " + this.appendedClassNames
    }

    return style.trim()
  }

  public setTheme(theme: string): ContainerStyle {
    this.theme = theme
    return this
  }

  public setSize(size: string): ContainerStyle {
    this.size = size
    return this
  }

  public appendClassNames(classNames?: string): ContainerStyle {
    this.appendedClassNames = classNames || ""
    return this
  }

}
