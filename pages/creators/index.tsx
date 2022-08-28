import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {useQuery} from "@apollo/client";
import {GET_TRAINERS} from "../../graphql/queries/trainerQueries";
import ListsWithIcon from "../../components/Lists/WithIcon";
import {ListWithIconInterface} from "../../models/ListWithIconInterface";
import {useEffect, useMemo, useState} from "react";
import {UserAddIcon} from "@heroicons/react/solid";
import {TrainersModel} from "../../models/GraphQL/TrainersModel";
import useContract from "../../hooks/useContract";
import {subscriptionNFTAddress} from "../../contracts/SubscriptionNFTAddress";
import {subscriptionNFTABI} from "../../contracts/SubscriptionNFTABI";
import {BigNumber, ethers} from "ethers";
import {Blocks} from "react-loader-spinner";
import {useWeb3React} from "@web3-react/core";
import Calendar from "../../components/Calendar";


const Creators: NextPage = () => {

    const {account} = useWeb3React()
    const {data} = useQuery(GET_TRAINERS)
    const subscriptionNFTContract = useContract(subscriptionNFTAddress, subscriptionNFTABI);
    const [loading, setLoading] = useState(false)
    const [shouldRun, setShouldRun] = useState<boolean>(false)
    const [showCreatorContent, setShowCreatorContent] = useState<boolean>(false)

    const dataToDisplay: ListWithIconInterface[] = useMemo(() => {
        const result: ListWithIconInterface[] = [];
        if (data) {
            data.trainers.forEach(({publicAddress, name, specialty}: TrainersModel) => {
                result.push({
                    id: publicAddress,
                    title: name,
                    subtitle: specialty,
                    icon: UserAddIcon,
                })
            })
            return result
        }
        return []
    }, [data])

    const subscribeToTrainerAction = async (item: ListWithIconInterface) => {
        try {
            const result = await subscriptionNFTContract?.functions.mintSubscriptionNFT(item.id, {
                value: ethers.utils.parseEther('3')
            })
            setLoading(true)
            return result
        } catch (error) {
            console.error(error)
            return error
        }
    }

    useEffect(() => {
        const fetchIfIShouldRun = async () => {
            const result = await subscriptionNFTContract?.functions.checkIfSubscriptionValid()
            setShouldRun(!result)
        }

        if (subscriptionNFTContract) {
            fetchIfIShouldRun()

            const onSubscriptionComplete = async (subscriber: string, nftId: BigNumber, contentCreator: string) => {
                setShowCreatorContent(subscriber === account)
                setLoading(false)
            }

            subscriptionNFTContract?.on('SubscriptionEvent', onSubscriptionComplete)

            return () => {
                subscriptionNFTContract?.off('SubscriptionEvent', onSubscriptionComplete)
            }
        }
    }, [subscriptionNFTContract])
    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            {loading && <div className={'grid grid-cols-8'}>
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />
                <Blocks
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                />

            </div>}
            {!loading && !showCreatorContent && <ListsWithIcon label={'All Trainers'} listToDisplay={dataToDisplay}
                                                               callback={subscribeToTrainerAction}/>}
            {!loading && showCreatorContent && <Calendar/>}
        </Wrapper>
    )
}

export default Creators
