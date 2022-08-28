import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StoreDispatch, StoreState} from "../components/ReduxStore/store";


export const useAppDispatch = () => useDispatch<StoreDispatch>()
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector
