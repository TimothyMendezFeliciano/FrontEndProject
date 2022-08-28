import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store from "../components/ReduxStore/store";
import getLibrary from "../getLibrary";
import {Web3ReactProvider} from '@web3-react/core'
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import ContentCreatorFormModals from "../components/Modals/ContentCreatorFormModals";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                excercises: {
                    merge(existing, incoming) {
                        return incoming
                    }
                },
                trainers: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
})

const graphqlClient = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache
})

function MyApp({Component, pageProps}: AppProps) {
    return (
        <ApolloProvider client={graphqlClient}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Provider store={store}>
                    <ContentCreatorFormModals/>
                    <Component {...pageProps} />
                </Provider>
            </Web3ReactProvider>
        </ApolloProvider>
    )
}

export default MyApp
