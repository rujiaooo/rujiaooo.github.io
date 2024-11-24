import * as React from "react"
import { Base } from "./Base"
import { HiMagnifyingGlass } from "react-icons/hi2"
import {
  ThemeContext
} from "./../Theme"
import {
  InputTheme,
  InputSize,
  InputSizeProps
} from "./Resource"

const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()
defaultTheme.set("container", "flex flex-row rounded outline outline-1 outline-slate-100")
defaultTheme.set("element-left", "w-full border rounded-tr rounded-br")
defaultTheme.set("element-right", "w-full border rounded-tl rounded-bl")
defaultTheme.set("action-left", "bg-white text-gray-500 border rounded-tl rounded-bl")
defaultTheme.set("action-right", "bg-white text-gray-500 border rounded-tr rounded-br")
defaultTheme.set("disabled-true", "cursor-not-allowed")
defaultTheme.set("icon", "w-5 h-5")
defaultTheme.set(`size-${InputSize.LARGE}`, "px-3 py-3")
defaultTheme.set(`size-${InputSize.MEDIUM}`, "p-2")

themes.set(InputTheme.DEFAULT, defaultTheme)

class InputSearchStyle {

  private theme: string = ""
  private disabled: boolean = false
  private size: string = ""
  private actionPosition: string = ""
  private elementClassNames: string | undefined = ""

  public buildContainer(): string | undefined {
    let style: string | undefined = undefined

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("container")) {
      style = theme.get("container")
    }

    if (theme.has(`disabled-${this.disabled}`)) {
      style += " " + theme.get(`disabled-${this.disabled}`)
    }

    return style
  }

  public buildElement(): string | undefined {
    let style: string | undefined = undefined

    if (this.elementClassNames) {
      return this.elementClassNames
    }

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has(`element-${this.actionPosition}`)) {
      style = " " + theme.get(`element-${this.actionPosition}`)
    }

    if (theme.has(`size-${this.size}`)) {
      style += " " + theme.get(`size-${this.size}`)
    }

    return style
  }

  public buildAction(): string | undefined {
    let style: string | undefined = undefined

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has(`action-${this.actionPosition}`)) {
      style = " " + theme.get(`action-${this.actionPosition}`)
    }

    if (theme.has(`size-${this.size}`)) {
      style += " " + theme.get(`size-${this.size}`)
    }

    return style
  }

  public buildIcon(): string | undefined {
    let style: string | undefined = undefined

    const theme = themes.get(this.theme)
    if (!theme) {
      return style
    }

    if (theme.has("icon")) {
      style = theme.get("icon")
    }

    return style
  }

  public setTheme(theme: string): InputSearchStyle {
    this.theme = theme
    return this
  }

  public setDisabled(disabled: boolean): InputSearchStyle {
    this.disabled = disabled
    return this
  }

  public setSize(size: string): InputSearchStyle {
    this.size = size
    return this
  }

  public setActionPosition(actionPosition: string): InputSearchStyle {
    this.actionPosition = actionPosition
    return this
  }

  public setElementClassNames(elementClassNames?: string): InputSearchStyle {
    this.elementClassNames = elementClassNames
    return this
  }
}

type ActionPositionProps = "left" | "right"

enum ActionPosition {
  LEFT = "left",
  RIGHT = "right"
}

type InputSearchThemeProps = "acem" | "acem2" | "winspec2"

type InputSearchProps = {
  id?: string
  name?: string
  placeholder?: string
  defaultValue?: string | number | ReadonlyArray<string> | undefined
  value?: string | ReadonlyArray<string> | number | undefined
  style?: React.CSSProperties | undefined
  classNames?: {
    container?: (props: ClassNamesProps) => string
    input?: (props: ClassNamesProps) => string
    action?: (props: ClassNamesProps) => string
    icon?: (props: ClassNamesProps) => string
  }
  className?: string
  theme?: InputSearchThemeProps
  size?: InputSizeProps
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  showAction?: boolean
  actionPosition?: ActionPositionProps
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
  onSubmit?: () => void
}

type ClassNamesProps = {
  size: string
  actionPosition: string
  disabled: boolean
}

const styleBuilder = new InputSearchStyle()

export function InputSearch(props: InputSearchProps): React.JSX.Element {
  const themeCtx = React.useContext(ThemeContext)
  const {
    disabled = false,
    showAction = false,
    size = InputSize.MEDIUM,
    actionPosition = ActionPosition.RIGHT,
    className,
    classNames = {},
  } = props
  let {
    theme = themeCtx.theme || "",
  } = props

  const {
    container: containerFn,
    input: inputFn,
    action: actionFn,
    icon: iconFn,
  } = classNames

  if (!themes.has(theme)) {
    theme = ""
  }

  styleBuilder
    .setTheme(theme)
    .setElementClassNames(className)
    .setActionPosition(actionPosition)
    .setDisabled(disabled)
    .setSize(size)

  const containerClassNames = styleBuilder.buildContainer()
  const actionClassNames = styleBuilder.buildAction()
  const elementClassNames = styleBuilder.buildElement()
  const iconClassNames = styleBuilder.buildIcon()

  const handleSubmit = () => {
    props.onSubmit && props.onSubmit()
  }

  return (
    <div className={(containerFn && containerFn({ size, disabled, actionPosition })) || containerClassNames}>
      {
        showAction && actionPosition === ActionPosition.LEFT &&
        <ButtonSearch
          className={(actionFn && actionFn({ size, disabled, actionPosition })) || actionClassNames}
          iconClassName={(iconFn && iconFn({ size, disabled, actionPosition })) || iconClassNames}
          onClick={handleSubmit} />
      }

      <Base
        type="search"
        className={(inputFn && inputFn({ size, disabled, actionPosition })) || elementClassNames}
        {...props} />

      {
        showAction && actionPosition === ActionPosition.RIGHT &&
        <ButtonSearch
          className={(actionFn && actionFn({ size, disabled, actionPosition })) || actionClassNames}
          iconClassName={(iconFn && iconFn({ size, disabled, actionPosition })) || iconClassNames}
          onClick={handleSubmit} />
      }
    </div>
  )
}

type ButtonSearchProps = {
  className?: string
  iconClassName?: string
  onClick?: () => void
}

function ButtonSearch(props: ButtonSearchProps): React.JSX.Element {
  const {
    className,
    iconClassName,
    onClick
  } = props

  return (
    <button className={className} onClick={onClick}>
      <HiMagnifyingGlass className={iconClassName} />
    </button>
  )
}