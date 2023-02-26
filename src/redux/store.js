import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';

const persistConfig = {
   key: 'root',
   storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store);

export { store, persistor };
