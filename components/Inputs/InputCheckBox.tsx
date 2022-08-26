import React from "react";

type PropTypes = {
    classNameOverwrite?: string
    classNameExtended?: string
    label: string
    id: string,
    checked: boolean
    onChange: any
    disabled?: boolean
}

export default function InputCheckBox({
                                          classNameExtended,
                                          classNameOverwrite,
                                          label = "Label",
                                          id,
                                          checked,
                                          onChange,
                                          disabled = false
                                      }: PropTypes) {
    const className = classNameOverwrite || ` ${classNameExtended}`

    return (
        <label htmlFor={id} className={className}>
            {label}
            <input
                type="checkbox"
                name={id}
                id={id}
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange(e.target.checked)}
            />
        </label>
    )
}