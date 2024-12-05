import { configureStore, } from '@reduxjs/toolkit'
import userReducer from '.././features/user/userSlice.js'
import{persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';



const persistConfig={
  key:'root',
  storage,
  version:1
}
const persistedReducer=persistReducer(persistConfig,userReducer)

export const store = configureStore({

  reducer: {
    user:persistedReducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:false
    })
})

export const persistor=persistStore(store);