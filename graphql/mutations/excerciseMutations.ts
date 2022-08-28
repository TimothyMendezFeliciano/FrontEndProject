import {gql} from "@apollo/client";


export const DELETE_EXCERCISE = gql(`
    mutation deleteExcercise($id: ID!) {
        deleteExcercise(id: $id) {
            id 
            name
        }
    }
`)

export const ADD_EXCERCISE = gql(`
    mutation addExcercise($name: String!) {
        addExcercise(name: $name) {
            id
            name
        }
    }
`)
