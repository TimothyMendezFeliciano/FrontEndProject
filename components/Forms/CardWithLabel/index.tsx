import Input from "../../Inputs/Input";
import {CallToAction} from "../../../models/CallToAction";
import {PlusCircleIcon} from "@heroicons/react/solid";

interface PropTypes {
    title: string
    subtitle: string
    formInputs: any[]
    action?: CallToAction
}


export default function FormCardWithLabel({title, subtitle, formInputs, action}: PropTypes) {

    return (
        <form className={'space-y-6'}>
            <div className={'bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'}>
                <div className={'md:grid md:grid-cols-3 md:gap-6'}>
                    <div className={'md:col-span-1'}>
                        <h3 className={'text-lg font-medium leading-6 text-gray-900'}>{title}</h3>
                        <p className={'mt-1 text-sm text-gray-500'}>{subtitle}</p>
                    </div>

                    <div className={'mt-5 md:mt-0 md:col-span-2'}>
                        <div className={'grid grid-cols-6 gap-6'}>
                            {formInputs?.map((formInput, index) => (
                                <div key={index} className={'col-span-6 sm:col-span-3'}>
                                    {formInput}
                                </div>
                            ))}
                            {action && <div>
                                <button onClick={action?.callback} className={'btn-plus-icon'}>
                                    <PlusCircleIcon className={'h-6 w-6'}/>
                                </button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
