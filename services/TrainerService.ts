import authAxios from "./authAxios";

export const getAllTrainers = async () => {
    const {data} = await authAxios.get('trainer/')
    return data
}

export const getIndividualTrainer = async (id: string, name: string, publicAddress: string) => {
    const {data} = await authAxios.get('trainer/individual', {
        params: {
            id, name, publicAddress
        }
    })
}

export const addTrainer = async (name: string, specialty: string, publicAddress: string) => {
    try {
        const {data} = await authAxios.post('trainer/addTrainer',
            {
                name, specialty, publicAddress
            })

        return data
    } catch (error) {
        console.error(error);

    }
}

export const getTrainerProfileImage = async (trainerId: string, address?: string) => {
    try {
        const {data} = await authAxios.get(
            '/trainer/profileImage', {
                params: {
                    trainerId,
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

export const uploadProfilePicture = async (trainerId: string, data: any) => {

}