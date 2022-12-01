import {useCallback} from "react";

type PropTypes = {
    id: string
    accept: string
    multiple: boolean
    required: boolean
    setFile: any
    setObjectURL: any
    label: string
}
export default function InputFile({setFile,accept,required,multiple,label,id,setObjectURL}: PropTypes) {

    const validateFile = (file: File) => {
        const validTypes = accept.split(', ')
        return validTypes.indexOf(file.type) !== -1
    }

    const uploadImageFile = (file: File) => {
        if (validateFile(file)) {
            setObjectURL(URL.createObjectURL(file))
            setFile(file)
        } else {
            setFile(undefined)
            setObjectURL('')
        }
    }

    const getImageFile = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // @ts-ignore
        const file = e?.target?.files[0] || null;
        if (file) {
            uploadImageFile(file)
        }
    }
    return <>
        <label htmlFor={id}>
            <strong>{label}</strong>
            <input
                type={'file'}
                onChange={(e) => getImageFile(e)}
                id={id}
                accept={accept}
                required={required}
                multiple={multiple}
            />
        </label>
    </>
}