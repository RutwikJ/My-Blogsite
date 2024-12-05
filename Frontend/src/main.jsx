import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store,persistor } from './app/store.js'
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
    <App />
    </PersistGate>
    </Provider>
    </StrictMode>
)
