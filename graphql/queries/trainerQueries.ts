import {gql} from "@apollo/client";

export const GET_TRAINERS = gql(`
    query getTrainers {
        trainers {
            id
            name
            publicAddress
            specialty
        }
    }
`)
