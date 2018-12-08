import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer from './Reducers'
import loggerMiddleware from './LoggerMiddleware';

const defaultMiddlewares = [
    thunkMiddleware,
    promiseMiddleware(),
    loggerMiddleware
];
const composedMiddlewares = middlewares => compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState = {}, middlewares = []) => {
    return createStore(reducer, initialState, composedMiddlewares(middlewares));
};

export default initialize;