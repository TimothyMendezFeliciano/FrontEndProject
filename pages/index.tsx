import type {NextPage} from 'next'
import Wrapper from "../components/Wrapper";
import useContract from "../hooks/useContract";
import BestPracticeAccessABI from "../contracts/BestPracticeAccess.json";
import {useCallback, useEffect, useState} from "react";
import {ethers} from "ethers";
import BestPracticeABI from "../contracts/BestPractice.json";

const Home: NextPage = () => {

    // GOOD
    const bestPracticeAccessContract = useContract(process.env.NEXT_PUBLIC_BEST_PRACTICE_ACCESS_ADDRESS as string, BestPracticeAccessABI)
    const bestPracticeContract = useContract(process.env.NEXT_PUBLIC_BEST_PRACTICE_ADDRESS as string, BestPracticeABI)

    const [callers, setCallers] = useState<[{}]>([{}])

    const callTrackEvent = useCallback(async () => {
        const result = await bestPracticeContract?.functions?.emitEventTracker({
            value: ethers.utils.parseEther('1')
        })

        console.log('Result', result)
    }, [bestPracticeContract])

    // BAD
    // const [badContract, setBadContract] = useState()
    //
    // useEffect(() => {
    //     // Requires MetaMask installed
    //     if (typeof window !== "undefined") {
    //         // Figure out the signer or provider.
    //         const result = new ethers.Contract(process.env.NEXT_PUBLIC_BEST_PRACTICE_ACCESS_ADDRESS as string, BestPracticeAccessABI, {})
    //     }
    // },[])

    useEffect(() => {
        if (bestPracticeContract) {
            const actionOnEvent = async (caller: string, callsMade: any) => {
                callers.push({caller, callsMade})
            }

            bestPracticeContract.on('TrackEvent', actionOnEvent)

            return () => {
                bestPracticeContract.off('TrackEvent', actionOnEvent)
            }
        }
    }, [bestPracticeContract])
    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            <ul>
                {callers.map(({caller, callsMade}, index) => (
                    <li key={index}>
                        {caller}: {callsMade}
                    </li>
                ))}
            </ul>
            <button className={'bg-dark'} onClick={callTrackEvent}>Call Track Event</button>
        </Wrapper>
    )
}

export default Home
