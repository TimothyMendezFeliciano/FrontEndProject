import authAxios from "./authAxios";

export const getAllTrainees = async () => {
    const {data} = await authAxios.get('/trainee')
    return data
}

export const getIndividualTrainee = async (id?: string, name?: string, interest?: string, publicAddress?: string) => {
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
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        return !!data.id
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

export const getProfileImage = async (traineeId: string, address?: string) => {
    try {
        const {data} = await authAxios.get(
            '/trainee/profileImage', {
                params: {
                    traineeId,
                    address
                },
                responseType: "blob"
            }
        )

        return data
    } catch (error) {
        console.error(error)
    }
    return null
}

export const uploadProfilePicture = async (traineeId: string, profileImage: File | null, publicAddress?: string) => {
    try {
        const formData = new FormData()

        formData.append("traineeId", traineeId);
        // @ts-ignore
        formData.append("profileImage", profileImage)
        publicAddress && formData.append("publicAddress", publicAddress)

        const {data} = await authAxios.post('/trainee/profileImage', formData)
        return data
    } catch (error) {
        console.error(error)
        return null
    }
}