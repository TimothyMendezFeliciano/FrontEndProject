import {gql} from '@apollo/client'

export const GET_EXCERCISES = gql(`
    query getExcercises {
        excercises {
            id
            name
        }
    }
`)

export const GET_EXCERCISE = gql(`
    query excercise($id: ID, $name: String) {
        excercise(id: $id, name: $name) {
            id
            name
        }
    }
`)