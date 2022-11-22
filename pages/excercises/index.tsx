import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import {PlusCircleIcon, XIcon} from '@heroicons/react/solid'
import ListsWithIcon from "../../components/Lists/WithIcon";
import FormCardWithLabel from "../../components/Forms/CardWithLabel";
import Input from "../../components/Inputs/Input";
import {useEffect, useMemo, useState} from "react";
import {ListWithIconInterface} from "../../models/ListWithIconInterface";
import {ExcercisesModel} from "../../models/GraphQL/ExcercisesModel";
import {addExcercise, deleteExcercise, getAllExcercises} from "../../services/ExcerciseService";

const Excercises: NextPage = () => {

    const [data, setData] = useState<any[]>([])

    const [excerciseToAdd, setExcerciseToAdd] = useState<string>('')

    const dataToDisplay: ListWithIconInterface[] = useMemo(() => {
        const result: ListWithIconInterface[] = [];
        if (data) {
            // @ts-ignore
            data?.excercises.forEach(({id, name}: ExcercisesModel) => {
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

    const addExcerciseAction = async (name: string) => {
        addExcercise(name)
    }

    const deleteExcerciseAction = async (id: string) => {
        deleteExcercise(id)
    }

    useEffect(() => {
        const fetchAllExcercises = async () => {
            const result = await getAllExcercises()
            setData(result)
        }

        fetchAllExcercises()
    }, [])


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
