import {NextPage} from "next";
import Wrapper from "../../components/Wrapper";
import FormCardWithLabel from "../../components/Forms/CardWithLabel";
import Input from "../../components/Inputs/Input";
import {useCallback, useState} from "react";

const Routine: NextPage = () => {

    const [name, setName] = useState<string>('')

    const addRoutineAction = useCallback(() => {
        console.log('Submit Name', name)
    }, [name])

    return (
        <Wrapper title={'Timothy\'s Boilerplate'}
                 description={'A FrontEnd for every single project I want to practice'}>
            <FormCardWithLabel
                title={'Routines'}
                subtitle={'Create or See Your Routines'}
                formInputs={[
                    <Input key={'name'} id={'name'} value={name} onChange={setName} type={'text'}
                           label={'Routine Name'}/>,
                ]}
                action={{
                    label: '', shouldValidate: false, callback: () => {
                        addRoutineAction()
                    }
                }}
            />
        </Wrapper>
    )
}

export default Routine