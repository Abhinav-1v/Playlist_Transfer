import { configureStore } from '@reduxjs/toolkit';
import playlistreducer from './slices/playlistslice';
import selectedreducer from './slices/selectedslice';
import sptokenreducer from './slices/spotifytokenslice';
import yttokenreducer from './slices/yttokenslice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import transferreducer from './slices/transferslice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['transferdata']
};


const rootReducer = (state, action) => {
    if (action.type === 'RESET_APP') {
        state = undefined; // Reset the state
    }
    return persistedReducer(state, action);
};

const rootReducerCombined = combineReducers({
    playlists: playlistreducer,
    selectedplaylists: selectedreducer,
    spotifytoken: sptokenreducer,
    youtubetoken: yttokenreducer,
    transferdata: transferreducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducerCombined);

export const store = configureStore({
    reducer: rootReducer,  // Use the rootReducer with RESET_APP handling
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
            },
        }),
    devTools: true,
});

export const persistor = persistStore(store);
