import { Combobox} from '@headlessui/react'
import {classNames} from "@headlessui/react/dist/utils/class-names";
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";
import {useMemo, useState} from "react";

type PropTypes = {
    label: string
    selectedOption: any
    setSelectedOption: any
    allOptions: any[]
    filterFunction: any
    disabled?: boolean
}

function DisplayOptions (options: any[], isOpen: boolean) {
    return (
        <Combobox.Options static={isOpen}
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
                <Combobox.Option
                    key={index}
                    value={option}
                    className={({ active }) =>
                        classNames(
                            'relative cursor-default select-none py-2 pl-3 pr-9',
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        )
                    }
                >
                    {({ active, selected }) => (
                        <>
              <span
                  className={classNames('block truncate', selected ? 'font-semibold' : '')}>{option}</span>
                            {!!selected && (
                                <span
                                    className={classNames(
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                        active ? 'text-white' : 'text-indigo-600'
                                    )}
                                >
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                            )}
                        </>
                    )}
                </Combobox.Option>
            ))}
        </Combobox.Options>
    )
}

function InputDropdown({label, selectedOption, setSelectedOption, allOptions, filterFunction, disabled = false}: PropTypes) {
    const [query, setQuery] = useState('')
    const [openOptions, setOpenOptions] = useState(false)
    const filteredOptions = useMemo(()=>{
        if(query.trim().length !== 0) {
            return allOptions.filter(item => filterFunction(item, query))
        }
        return []
    }, [query, allOptions, filterFunction])

    const handleBlur = (e: any) => {
        const currentTarget = e.currentTarget
        requestAnimationFrame(() => {
            if(!currentTarget.contains(document.activeElement)) {
                setOpenOptions(false)
            }
        })
    }

    return (
        <Combobox as="div" className={'col-span-6 sm:col-span-3'} value={selectedOption} onChange={((e) => setSelectedOption(e))} disabled={disabled}>
            <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
            <div className="relative mt-1" onFocus={() => setOpenOptions(true)} onBlur={handleBlur}>
                <Combobox.Input
                    className="w-full rounded-md border border-gray-300  py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button
                    className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {DisplayOptions(filteredOptions.length === 0 ? allOptions : filteredOptions, openOptions)}
            </div>
        </Combobox>
    )
}

export default InputDropdown