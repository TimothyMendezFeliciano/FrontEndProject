import {useCallback} from "react";
import Image from "next/image";

type PropTypes = {
    id: string
    accept: string
    multiple: boolean
    required: boolean
    file: File | undefined
    setFile: any
    objectURL: string
    setObjectURL: any
    label: string
}
export default function InputFile({
                                      file,
                                      setFile,
                                      accept,
                                      required,
                                      multiple,
                                      label,
                                      id,
                                      objectURL,
                                      setObjectURL
                                  }: PropTypes) {

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
        {objectURL && file && <span className={'flex justify-center'}>
            <Image src={objectURL} width={48} height={48} alt={'Profile'} className={'rounded-full h-12 w-12'} />
        </span>}
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