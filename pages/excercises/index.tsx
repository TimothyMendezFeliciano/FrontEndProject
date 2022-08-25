import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {useMutation, useQuery} from "@apollo/client";
import {GET_EXCERCISES} from "../../graphql/queries/excerciseQueries";
import {DELETE_EXCERCISE} from "../../graphql/mutations/excerciseMutations";
import {XIcon} from '@heroicons/react/solid'
import ListsWithIcon from "../../components/Lists/WithIcon";
import TwoColumnDescriptionForm from "../../components/Forms/TwoColumnDescription";

const Excercises: NextPage = () => {

    const {loading, error, data} = useQuery(GET_EXCERCISES)
    const [deleteExcercise] = useMutation(DELETE_EXCERCISE, {
        variables: {id: ''},
        update(cache, {data: {deleteExcercise}}) {
            const {excercises} = cache.readQuery({
                query: GET_EXCERCISES
            });

            cache.writeQuery({
                query: GET_EXCERCISES,
                data: {excercises: excercises.filter(excercise => excercise.id !== deleteExcercise.id)}
            });
        }
    })

    const deleteAction = (id: string) => {
        deleteExcercise({
            variables: {id}
        })
    }

    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            <TwoColumnDescriptionForm title={'Excercises'} description={'Review our global list of excercises or add your own.'}>
                <ListsWithIcon label={'All Excercises'} listToDisplay={[{
                    title: 'example',
                    subtitle: 'example',
                    id: '1',
                    imageURL: '/images/neuromancerIcon.jpg',
                    icon: XIcon,
                }, {
                    title: 'example',
                    subtitle: 'example',
                    id: '1',
                    imageURL: '/images/neuromancerIcon.jpg',
                    icon: XIcon,
                }, {
                    title: 'example',
                    subtitle: 'example',
                    id: '1',
                    imageURL: '/images/neuromancerIcon.jpg',
                    icon: XIcon,
                }, {
                    title: 'example',
                    subtitle: 'example',
                    id: '1',
                    imageURL: '/images/neuromancerIcon.jpg',
                    icon: XIcon,
                }]} callback={deleteAction}/>
            </TwoColumnDescriptionForm>
        </Wrapper>
    )
}

export default Excercises