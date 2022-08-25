interface PropTypes {
    title: string
    description: string
    children: any
}


export default function TwoColumnDescriptionForm({title, description, children}: PropTypes) {
    return (
        <>
            <div>
                <div className={'md;grid md:grid-cols-3 md:gap-6'}>
                    <div className={'md:col-span-1'}>
                        <h3 className={'text-lg font-medium leading-6 text-gray-900'}>{title}</h3>
                        <p className={'mt-1 text-sm text-gray-600'}>
                            {description}
                        </p>
                    </div>
                    <div className={'mt-4 md:mt-0 md:col-span-2'}>
                        <div className={'shadow sm:rounded-md sm:overflow-hidden'}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}