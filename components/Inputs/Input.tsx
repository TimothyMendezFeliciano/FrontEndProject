type PropTypes = {
    classNameOverwrite?: string
    classNameExtended?: string
    type?: 'number' | 'datetime-local' | 'text'
    label?: string
    id: string,
    value: any,
    onChange: any,
    disabled?: boolean,
    min?: number,
    max?: number
}


export default function Input({
                                  classNameExtended,
                                  classNameOverwrite,
                                  type = 'text',
                                  label = 'Default label',
                                  id,
                                  value = null,
                                  onChange = () => {
                                  },
                                  disabled = false,
                                  min = 1,
                                  max = 100,
                              }: PropTypes) {
    const className = classNameOverwrite || `${classNameExtended}`

    const props = {
        number: {
            type,
            name: id,
            id,
            min,
            max,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const val = parseInt(e.target.value)
                if (val >= min && val <= max) {
                    onChange(val)
                }
            },
            value,
            disabled,
        }, 'datetime-local': {
            type,
            name: id,
            id,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const date = new Date(e.target.value)
                onChange(date)
            },
            value,
            disabled,
        },
        text: {
            type,
            name: id,
            id,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.value)
            },
            value,
            disabled,
        },
    }

    return (
        <label htmlFor={id} className={className}>
            <strong>{label}</strong>
            <input {...props[type]}/>
        </label>
    )
}