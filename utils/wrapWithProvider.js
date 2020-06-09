import dva from "./dva"
import React from "react"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/es/integration/react"
export default ({ element }) => {
  const app = dva()
  const store = app._store
  let persistor = persistStore(store)
  return <Provider store={store}>
      {element}
  </Provider>
}
