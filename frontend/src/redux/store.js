import medicinesApi from './features/medicines/medicinesApi';

export const store = configureStore({
  reducer: {
    [medicinesApi.reducerPath]: medicinesApi.reducer,
    // ... other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(medicinesApi.middleware),
});
