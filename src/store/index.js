import { createStore } from 'redux';
import {applyMiddleware, combineReducers, compose, configureStore} from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../reducers/filters";
import ReduxThunk from "redux-thunk"

//Middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

//STORE ENHANCER
const enhancer = (createStore) => (...args) => {
    const store = createStore(...args)

    const oldDispatch = store.dispatch
    store.dispatch = (action) => {
        if (typeof action === 'string') {
            return oldDispatch({
                type: action
            })
        }
        return oldDispatch(action)
    }
    return store
}

// const store = createStore(
//                                     combineReducers({heroes, filters}),
//                                     compose(
//                                         applyMiddleware(ReduxThunk,stringMiddleware),
//                                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                                     ));

const store = configureStore({
    reducer: {heroes, filters},
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)
})

export default store;