
const themes = new Map<string, Map<string, string>>()

const defaultTheme = new Map<string, string>()
defaultTheme.set("element", "")
defaultTheme.set("element-sticky-true", "sticky top-0 left-0 z-10")
defaultTheme.set("element-fixed-true", "fixed top-0 left-0 z-10")
defaultTheme.set("element-relative-true", "relative")

themes.set("", defaultTheme)

export class HeaderStyle {
	private theme = ""
	private sticky = false
	private fixed = false
	private appendedClassNames = ""

	public buildElement(): string {
		let style = ""

		const theme = themes.get(this.theme)
		if (!theme) {
			return style
		}

		if (theme.has("element")) {
			style += theme.get("element")
		}

		if (this.appendedClassNames !== "") {
			style += " " + this.appendedClassNames
		}

		if (!this.sticky && !this.fixed) {
			style += " " + theme.get(`element-relative-true`)
			return style
		}

		if (theme.has(`element-sticky-${this.sticky}`)) {
			style += " " + theme.get(`element-sticky-${this.sticky}`)
		}

		if (theme.has(`element-fixed-${this.fixed}`)) {
			style += " " + theme.get(`element-fixed-${this.fixed}`)
		}

		return style
	}

	public setSticky(sticky: boolean): HeaderStyle {
		this.sticky = sticky
		return this
	}

	public setFixed(fixed: boolean): HeaderStyle {
		this.fixed = fixed
		return this
	}

	public appendClassNames(classNames?: string): HeaderStyle {
		this.appendedClassNames = classNames || ""
		return this
	}
}