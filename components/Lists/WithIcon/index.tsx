import {ListWithIconInterface} from "../../../models/ListWithIconInterface";
import Image from "next/image";

interface PropTypes {
    label: string
    listToDisplay: ListWithIconInterface[]
    callback: any
}

export default function ListsWithIcon({label, listToDisplay, callback}: PropTypes) {
    return (
        <div className={'mt-1 px-6 py-4 sm:mt-0 col sm:col-span-2'}>
            <label
                htmlFor="emailList"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
                <h1>{label}</h1>
            </label>
            <ul role={'list'} className={'list-disc divide-y divide-gray-200'}>
                {listToDisplay.map((item, index) => (
                    <li key={index} className={'flex items-center py-4 sm:py-4 gap-3'}>
                        <div className={'min-w-0 flex-1 flex items-center'}>
                            {item.imageURL &&
                                <Image src={item.imageURL} width={'100%'} height={'100%'} layout={'responsive'}
                                       objectFit={'contain'}/>}
                            <p>
                                {item.title}
                            </p>
                            {item.subtitle && (
                                <p className={'ml-2 text-gray-500'}> {item.subtitle}</p>
                            )}
                        </div>
                        {callback && (
                            <item.icon
                                className={'h-5 w-5'}
                                style={{cursor: 'pointer'}}
                                aria-hidden={'true'}
                                onClick={() => callback(item)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}