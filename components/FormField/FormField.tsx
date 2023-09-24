interface IProps {
  title: string
  state: string
  placeholder: string
  type?: string
  isTextArea?: boolean
  setState: (value: string) => void
}

const FormField = (props: IProps) => {
  const { type, title, state, placeholder, isTextArea, setState } = props

  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>

      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          required
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  )
}

export default FormField
