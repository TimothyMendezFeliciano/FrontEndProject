import Image from "next/image";
import navigation from "./navigation";
import {useWeb3React} from "@web3-react/core";
import useEagerConnect from "../../hooks/useEagerConnect";
import {shortenHex} from "../../utils/utils";
import Account from "../Account";

export default function Header() {
   const { account, library } = useWeb3React()
    const triedToEagerConnect = useEagerConnect()

    const isConnected = typeof account === "string" && !!library
    return (
        <header className="bg-gray-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-6 flex items-center justify-between border-b border-red-500 lg:border-none">
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
                        <Account triedToEagerConnect={triedToEagerConnect}/>
                        {/*@ts-ignore*/}
                        {/*<neftify-connect-wallet></neftify-connect-wallet>*/}
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
