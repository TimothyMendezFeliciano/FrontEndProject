import useContract from "../../hooks/useContract";
import {subscriptionNFTAddress} from "../../contracts/SubscriptionNFTAddress";
import {subscriptionNFTABI} from "../../contracts/SubscriptionNFTABI";
import {ethers} from "ethers";
import {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";

type PropTypes = {
    triedToEagerConnect: boolean
}

export default function WithdrawButton({triedToEagerConnect}: PropTypes) {

    const {account} = useWeb3React()
    const subscriptionNFTContract = useContract(subscriptionNFTAddress, subscriptionNFTABI);
    const [balanceAvailable, setBalanceAvailable] = useState<string>('0')

    useEffect(() => {
        const getBalance = async () => {
            const [resultAsBigNumber] = await subscriptionNFTContract?.functions.checkBalanceForContentCreator()
            setBalanceAvailable(ethers.utils.formatEther(resultAsBigNumber))
        }
        if (subscriptionNFTContract && account) {
            getBalance()

            const onWithdrawComplete = async (contentCreator: string) => {
                if (account === contentCreator) {
                    getBalance()
                }
            }

            subscriptionNFTContract.on('WithdrawSuccessful', onWithdrawComplete);

            return () => {
                subscriptionNFTContract.off('WithdrawSuccessful', onWithdrawComplete)
            }
        }
    }, [subscriptionNFTContract, account])

    const withdrawBalance = async () => {
        try {
            const result = await subscriptionNFTContract?.functions.withdraw()
        } catch (error) {
            console.error(error)
            return null
        }

    }

    if (!triedToEagerConnect) {
        return null;
    }

    return (
        <button className={'btn-primary'} onClick={withdrawBalance}>
            {balanceAvailable} ETH
        </button>
    )
}
