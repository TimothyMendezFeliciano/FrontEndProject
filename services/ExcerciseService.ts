import authAxios from "./authAxios";

export const getAllExcercises = async () => {
    const {data} = await authAxios.get('/excercise')
    return data
}

export const addExcercise = async (name: string) => {
    const {data} = await authAxios.post('/excercise/addExcercise', {
        name
    })
    return data
}


export const deleteExcercise = async (id: string) => {
    const {data} = await authAxios.post('/excercise/deleteExcercise', {
        id
    })
    return data
}