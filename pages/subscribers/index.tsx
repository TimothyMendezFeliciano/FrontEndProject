import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {useWeb3React} from "@web3-react/core";
import {useQuery} from "@apollo/client";
import {GET_TRAINEES} from "../../graphql/queries/traineeQueries";
import {ListWithIconInterface} from "../../models/ListWithIconInterface";
import {useMemo, useState} from "react";
import {TraineeModel} from "../../models/GraphQL/TraineeModel";
import {UserAddIcon} from "@heroicons/react/solid";
import ListsWithIcon from "../../components/Lists/WithIcon";
import {Blocks} from "react-loader-spinner";

const Subscribers: NextPage = () => {

    const {account} = useWeb3React()
    const {loading, data} = useQuery(GET_TRAINEES)

    const dataToDisplay: ListWithIconInterface[] = useMemo(() => {
        const result: ListWithIconInterface[] = [];

        if (data) {
            data.trainees.forEach(({publicAddress, name, interest}: TraineeModel) => {
                result.push({
                    id: publicAddress,
                    title: name,
                    subtitle: interest,
                    icon: UserAddIcon
                })
            })
            return result
        }
        return []
    }, [data])

    const subscriberAction = async (item: ListWithIconInterface) => {
        console.log([{...item}])
    }

    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            {!loading && <ListsWithIcon label={'My Subscribers'}
                                        listToDisplay={dataToDisplay}
                                        callback={subscriberAction}/>}
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
        </Wrapper>
    )
}


export default Subscribers
