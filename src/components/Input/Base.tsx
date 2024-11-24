import * as React from "react"

type BaseProps = {
  type: string
  id?: string
  name?: string
  style?: React.CSSProperties | undefined
  className?: string
  placeholder?: string
  defaultValue?: string | number | ReadonlyArray<string> | undefined
  value?: string | ReadonlyArray<string> | number | undefined
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void
}

export function Base(props: BaseProps): React.JSX.Element {
  const {
    required = false,
    disabled = false,
    readOnly = false,
    className = "w-full p-2 border rounded "
  } = props

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    props.onInput && props.onInput(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    props.onBlur && props.onBlur(e)
  }

  return (
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      style={props.style}
      className={className}
      defaultValue={props.defaultValue}
      value={props.value}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      onInput={handleInput}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
