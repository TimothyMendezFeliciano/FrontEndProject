import authAxios from "./authAxios";

export const getAllTrainees = async () => {
    const {data} = await authAxios.get('/trainee')
    return data
}

export const getIndividualTrainee = async (id: string, name?: string, interest?: string, publicAddress?: string) => {
    try {
        const {data} = await authAxios.get('/trainee/individual', {
            params: {
                id,
                name,
                interest,
                publicAddress
            }
        })

        return data
    } catch (error) {
        console.error(error)
        return []
    }
}

export const addTrainee = async (name: string, interest: string, publicAddress: string) => {
    try {
        const {data} = await authAxios.post('/trainee/addTrainee', {
            name, interest, publicAddress
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

export const subscribeToTrainer = async (traineeId: string, trainerId: string) => {
    try {
        const {data} = await authAxios.post('/trainee/subscribeToTrainer', {
            traineeId,
            trainerId
        })
        return data
    } catch (error) {
        console.error(error);
    }
}