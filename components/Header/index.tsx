import Image from "next/image";
import {creatorNavigation, userNavigation} from "./navigation";
import {useWeb3React} from "@web3-react/core";
import useEagerConnect from "../../hooks/useEagerConnect";
import useContract from "../../hooks/useContract";
import {subscriptionNFTAddress} from "../../contracts/SubscriptionNFTAddress";
import {subscriptionNFTABI} from "../../contracts/SubscriptionNFTABI";
import {useEffect, useMemo, useState} from "react";
import Account from "../Account";
import WithdrawButton from "../WithdrawButton";
import {useRouter} from "next/router";
import {classNames} from "../../utils/utils";

export default function Header() {
    const router = useRouter()
    const {account, library} = useWeb3React()
    const triedToEagerConnect = useEagerConnect()
    const subscriptionNFTContract = useContract(subscriptionNFTAddress, subscriptionNFTABI);
    const [hasValidSubscription, setHasValidSubscription] = useState(false)
    const [isContentCreator, setIsContentCreator] = useState(false)
    const [navigationTabsLoading, setNavigationTabsLoading] = useState(true)
    const navigationTabs = useMemo(() => {
        if (isContentCreator) return creatorNavigation
        return userNavigation
    }, [hasValidSubscription, isContentCreator, account])

    useEffect(() => {
        setNavigationTabsLoading(true)
        const checkIfValid = async () => {
            const result1 = await subscriptionNFTContract?.functions.checkIfSubscriptionValid()
            const result2 = await subscriptionNFTContract?.functions.checkIfContentCreator(account);
            setHasValidSubscription(result1[0])
            setIsContentCreator(result2[0])
        }
        if (subscriptionNFTContract && account) {
            checkIfValid()
        }
        setNavigationTabsLoading(false)
    }, [subscriptionNFTContract, account, router])


    const isConnected = typeof account === "string" && !!library
    return (
        <header className="bg-gray-700">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
                <div className="w-full py-2 flex items-center justify-between border-b border-red-500 lg:border-none">
                    <div className="flex items-center">
                        <a href="#">
                            <span className="sr-only">Front End Project</span>
                            <Image src={'/neuromancerIcon.jpg'} className={'rounded'} height={32} width={32}/>
                        </a>
                        <div className="hidden ml-10 space-x-8 lg:block">
                            {!navigationTabsLoading && navigationTabs.map((link) => (
                                <a key={link.name} href={link.href}
                                   className={classNames(
                                       "text-base font-medium text-white hover:text-indigo-50",
                                       `${router.pathname === link.href ? 'text-red-500':''}`
                                   )}>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="ml-10 space-x-4">
                        <Account triedToEagerConnect={triedToEagerConnect}/>
                        {!navigationTabsLoading && isContentCreator && <WithdrawButton triedToEagerConnect={triedToEagerConnect} isContentCreator={isContentCreator}/>}
                    </div>
                </div>
                <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
                    {!navigationTabsLoading && navigationTabs.map((link) => (
                        <a key={link.name} href={link.href}
                           className={classNames(
                               "text-base font-medium text-white hover:text-indigo-50",
                               `${router.pathname === link.href ? 'text-red-500':''}`
                           )}>
                            {link.name}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    )
}
