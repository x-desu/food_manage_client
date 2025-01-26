import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/createApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import cartReducer from './cart/cartSlice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart:cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch)
export default store;