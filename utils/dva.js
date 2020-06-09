import React from "react"
import { create } from "dva-core"
import models from "../src/Models"
import { createLogger } from "redux-logger"
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
export default function dva() {
  const options = {
    initialState: {},
    models: models,
    onReducer (reducer) {
      const persistConfig = {
        key: 'root',
        storage,
        stateReconciler: autoMergeLevel2,
        blacklist: [''],// navigation will not be persisted
        whitelist: ['Magento']// only navigation will be persisted
      }
      return persistReducer(persistConfig, reducer)

    },
    // onAction: [routerMiddleware ],
    // 使用日志打印方法， collapsed让action折叠，看着舒服。
    onAction: [createLogger({ collapsed: true })],
    onError(e) {
      // Product-Recommendations('onError index:', e)
    }
  };
  const app = create(options)
  options.models.forEach(model => app.model(model))
  app.start();
  app.getStore = () => app._store;
  return app;
}
