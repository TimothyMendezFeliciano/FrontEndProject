import {useAppDispatch, useAppSelector} from "../../../hooks/useRedux";
import {Fragment, useCallback, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {closeModal} from "../ModalSlice";
import {CheckIcon} from "@heroicons/react/solid";
import FormCardWithLabel from "../../Forms/CardWithLabel";
import Input from "../../Inputs/Input";
import {useWeb3React} from "@web3-react/core";
import useContract from "../../../hooks/useContract";
import {subscriptionNFTAddress} from "../../../contracts/SubscriptionNFTAddress";
import {subscriptionNFTABI} from "../../../contracts/SubscriptionNFTABI";
import {useRouter} from "next/router";
import {ethers} from "ethers";
import {addTrainer, deleteTrainer, uploadProfilePicture} from "../../../services/TrainerService";
import InputFile from "../../Inputs/InputFile";

export default function ContentCreatorFormModals() {

    const router = useRouter()
    const subscriptionNFTContract = useContract(subscriptionNFTAddress, subscriptionNFTABI);
    const {account} = useWeb3React()
    const dispatch = useAppDispatch()
    const {isOpen} = useAppSelector(state => state.modal)
    const cancelButtonRef = useRef(null)
    const [name, setName] = useState<string>('')
    const [specialty, setSpecialty] = useState<string>('')
    const [publicAddress, setPublicAddress] = useState<string>('')
    const [file, setFile] = useState<File | undefined>()
    const [objectURL, setObjectURL] = useState<string>('')
    const [isContentCreator, setIsContentCreator] = useState<boolean>(false)

    const registerAsTrainerAction = useCallback(async () => {
        try {
            const result = await subscriptionNFTContract?.functions.registerContentCreator(publicAddress,
                {
                    value: ethers.utils.parseEther('1')
                })
            return result
        } catch (error) {
            console.error(error)
            return []
        }
    }, [name, specialty, publicAddress])

    const deregisterAsTrainerAction = useCallback(async () => {
        try {
            return isContentCreator &&  await subscriptionNFTContract?.functions.cancelContentCreator()
        } catch (error) {
            console.error(error);
            return []
        }
    }, [isContentCreator, publicAddress])

    useEffect(() => {
        if (account) setPublicAddress(account)
    }, [account])

    useEffect(() => {
        const checkIfValid = async () => {
            const result = await subscriptionNFTContract?.functions.checkIfContentCreator(account)
            setIsContentCreator(result[0])
            return result
        }

        if (subscriptionNFTContract && account) {
            checkIfValid()

            const onCreatorRegistered = async (contentCreator: string) => {
                if (account === contentCreator) {
                    const result = await addTrainer(name, specialty, publicAddress)
                    result && await uploadProfilePicture(result,file, publicAddress)
                    checkIfValid()
                }
            }

            const onCreatorDeregistered = async (contentCreator: string) => {
                if(account == contentCreator) {
                    const result = await deleteTrainer(contentCreator)
                    result &&checkIfValid()
                }
            }

            subscriptionNFTContract?.on('CreatorRegistered', onCreatorRegistered)
            subscriptionNFTContract?.on('CreatorDeregistered', onCreatorDeregistered)

            return () => {
                subscriptionNFTContract?.off('CreatorRegistered', onCreatorRegistered)
                subscriptionNFTContract?.off('CreatorDeregistered', onCreatorDeregistered)
            }
        }
    }, [subscriptionNFTContract, account, router, name, specialty, publicAddress])

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}
                    onClose={() => dispatch(closeModal())}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                {isContentCreator ?
                                    <div>
                                        <div
                                            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true"/>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3"
                                                          className="text-lg leading-6 font-medium text-gray-900">
                                                Already A Content Creator
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Feel Free to add excercises or manage your subscriber base.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    : <FormCardWithLabel title={'Register'}
                                                         subtitle={'Complete the form to become a Content Creator'}
                                                         formInputs={[
                                                             <Input key={'name'} type={'text'} label={'Name'}
                                                                    id={'name'}
                                                                    value={name}
                                                                    onChange={setName}/>,
                                                             <Input key={'specialty'} type={'text'} label={'Specialty'}
                                                                    id={'specialty'} value={specialty}
                                                                    onChange={setSpecialty}/>,
                                                             <Input key={'publicAddress'} type={'text'}
                                                                    label={'PublicAddress'} id={'publicAddress'}
                                                                    disabled={true}
                                                                    value={publicAddress} onChange={setPublicAddress}/>,
                                                             <InputFile id={'profileImage'}
                                                                        key={'profileImage'}
                                                                        label={'Profile Image'}
                                                                        accept={"image/jpg, image/jpeg, image/png, image/webp"}
                                                                        multiple={false} required={true} file={file}
                                                                        setFile={setFile}
                                                                        objectURL={objectURL}
                                                                        setObjectURL={setObjectURL}/>
                                                         ]} action={undefined}/>}
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    {!isContentCreator && <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => registerAsTrainerAction()}
                                    >
                                        Submit
                                    </button>}
                                    {isContentCreator && <button
                                        type={'button'}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                        onClick={()=> deregisterAsTrainerAction()}
                                    >
                                        Deregister As Content Creator
                                    </button>}
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => dispatch(closeModal())}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
