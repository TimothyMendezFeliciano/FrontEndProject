import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {useMutation, useQuery} from "@apollo/client";
import {GET_EXCERCISES} from "../../graphql/queries/excerciseQueries";
import {ADD_EXCERCISE, DELETE_EXCERCISE} from "../../graphql/mutations/excerciseMutations";
import {PlusCircleIcon, XIcon} from '@heroicons/react/solid'
import ListsWithIcon from "../../components/Lists/WithIcon";
import FormCardWithLabel from "../../components/Forms/CardWithLabel";
import Input from "../../components/Inputs/Input";
import {useMemo, useState} from "react";
import {ListWithIconInterface} from "../../models/ListWithIconInterface";
import {ExcercisesModel} from "../../models/GraphQL/ExcercisesModel";

const Excercises: NextPage = () => {

    const {loading, error, data} = useQuery(GET_EXCERCISES)
    const [deleteExcercise] = useMutation(DELETE_EXCERCISE, {
        variables: {id: ''},
        refetchQueries: [{query: GET_EXCERCISES}]
        // update(cache, {data: {deleteExcercise}}) {
        //     const {excercises} = cache.readQuery({
        //         query: GET_EXCERCISES
        //     });
        //
        //     cache.writeQuery({
        //         query: GET_EXCERCISES,
        //         data: {excercises: excercises.filter(excercise => excercise.id !== deleteExcercise.id)}
        //     });
        // }
    })

    const [addExcercise] = useMutation(ADD_EXCERCISE, {
        variables: {name: ''},
        update(cache, {data: {addExcercise}}) {
            // @ts-ignore
            const {excercises} = cache.readQuery({
                query: GET_EXCERCISES
            });
            cache.writeQuery({
                query: GET_EXCERCISES,
                data: {excercises: [...excercises, addExcercise]}
            })
        }
    })

    const [excerciseToAdd, setExcerciseToAdd] = useState<string>('')

    const dataToDisplay: ListWithIconInterface[] = useMemo(() => {
        const result: ListWithIconInterface[] = [];
        if (data) {
            data.excercises.forEach(({id, name}: ExcercisesModel) => {
                result.push({
                    id,
                    title: name,
                    icon: XIcon,
                })
            })
            return result
        }
        return []
    }, [data])

    const addExcerciseAction = (name: string) => {
        addExcercise({
            variables: {name}
        })
    }

    const deleteExcerciseAction = (id: string) => {
        deleteExcercise({
            variables: {id}
        })
    }


    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            <FormCardWithLabel
                title={'Excercises'}
                subtitle={'Add another to the global list of excercises'}
                formInputs={[
                    // This is an input component. Create another similar component called InputWithAction and add the button to that one.
                    // The difference would be Input component doesn't have a button, while InputWithAction does.
                    // Be sure to add a callback property so we can send the addExcerciseAction
                    <Input key={'excerciseToAdd'} id={'excerciseToAdd'}
                           value={excerciseToAdd}
                           onChange={setExcerciseToAdd}
                           type={'text'}
                           label={'Add Excercise'}
                    />
                ]}
                action={{
                    label: '', shouldValidate: false, callback: () => {
                        addExcerciseAction(excerciseToAdd)
                    }
                }}
            />

            <ListsWithIcon label={'All Excercises'} listToDisplay={dataToDisplay}
                           callback={(item: { id: string; }) => deleteExcerciseAction(item.id)}/>
        </Wrapper>
    )
}

export default Excercises
