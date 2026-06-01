interface ButtonProps {
  text: string
  onClick?: () => void
  type?: "button" | "submit"
  variant?: "primary" | "secondary" | "danger"
  disabled?: boolean
  fullWidth?: boolean
}

function Button(props: ButtonProps) {

  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }

  const variantStyle = variants[props.variant ?? "primary"]
  const widthStyle = props.fullWidth ? "w-full" : ""
  const disabledStyle = props.disabled ? "opacity-50 cursor-not-allowed" : ""

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${baseStyles} ${variantStyle} ${widthStyle} ${disabledStyle}`}
    >
      {props.text}
    </button>
  )
}

export default Button