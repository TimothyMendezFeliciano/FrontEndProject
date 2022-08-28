import {gql} from "@apollo/client";

export const GET_TRAINEES = gql(`
    query getTrainees {
        trainees {
            id
            name
            publicAddress
            interest
        }
    }
`)

export const GET_TRAINEE = gql(`
    query trainee($id: ID, $name: String, $interest: String, $publicAddress: String) {
        trainee(id: $id, name: $name, interest: $interest, publicAddress: $publicAddress) {
            id
            name
            interest
            publicAddress
        }
    }
`)
