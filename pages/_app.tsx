import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store from "../components/ReduxStore/store";
import getLibrary from "../getLibrary";
import {Web3ReactProvider} from '@web3-react/core'
import ContentCreatorFormModals from "../components/Modals/ContentCreatorFormModals";
import UserFormModals from "../components/Modals/UserFormModals";

function MyApp({Component, pageProps}: AppProps) {
    return (
            <Web3ReactProvider getLibrary={getLibrary}>
                <Provider store={store}>
                    <ContentCreatorFormModals/>
                    <UserFormModals/>
                    <Component {...pageProps} />
                </Provider>
            </Web3ReactProvider>
    )
}

export default MyApp
