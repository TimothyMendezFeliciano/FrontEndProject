import {gql} from "@apollo/client";

export const ADD_TRAINER = gql(`
    mutation addTrainer($name: String!, $specialty: String!, $publicAddress: String!) {
        addTrainer(name: $name, specialty: $specialty, publicAddress: $publicAddress) {
            id
            name
            specialty
            publicAddress
        }
    }
`)
