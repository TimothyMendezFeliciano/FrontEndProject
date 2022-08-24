import Image from "next/image";
import navigation from "./navigation";

export default function Header() {
    // return (
    //     <header className={'bg-blue-600'}>
    //         <nav className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'} aria-label={'Top'}>
    //             <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
    //                 <div className="flex items-center">
    //                     <a href={'/'}>
    //                         <span className={'sr-only'}>Front End Project</span>
    //                         <Image src={'/neuromancerIcon.jpg'} height={32} width={32}/>
    //                     </a>
    //                     <div className={'hidden ml-10 space-x-8 lg:block'}>
    //                         {navigation.map(({name, href}) => (
    //                             <a key={name} href={href} className={'text-base font-medium text-white hover:text-indigo-50'}>{name}</a>
    //                         ))}
    //                     </div>
    //                 </div>
    //                 <div className={'ml-10 space-x-4'}>
    //                     <button className={'inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'}>
    //                         Connect
    //                     </button>
    //                 </div>
    //             </div>
    //             <div className={'py-4 flex flex-wrap justify-center space-x-6 lg:hidden'}>
    //                 {navigation.map(({name, href}) => (
    //                     <a key={name} href={href} className={'text-base font-medium text-white hover:text-indigo-50'}>{name}</a>
    //                 ))}
    //             </div>
    //         </nav>
    //     </header>
    // )
    return (
        <header className="bg-indigo-600">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
                    <div className="flex items-center">
                        <a href="#">
                            <span className="sr-only">Front End Project</span>
                            <Image src={'/neuromancerIcon.jpg'} className={'rounded'} height={32} width={32}/>
                        </a>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {navigation.map((link) => (
                                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <a
                            href="#"
                            className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                        >
                            Connect
                        </a>
                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {navigation.map((link) => (
                        <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}