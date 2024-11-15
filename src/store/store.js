// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import { persistStore, persistReducer } from "redux-persist";
import flightReducer from "./flightSlice";

// Redux Persist 설정
const persistConfig = {
  key: "root", // 루트 설정
  storage, // 로컬 스토리지 사용
};

// flightReducer를 persistReducer로 감싸기
const persistedReducer = persistReducer(persistConfig, flightReducer);

// Redux 스토어 설정
const store = configureStore({
  reducer: {
    flight: persistedReducer,
  },
});

// Persistor 생성
const persistor = persistStore(store);

export { store, persistor };
