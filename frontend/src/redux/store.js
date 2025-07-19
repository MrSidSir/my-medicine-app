import { configureStore } from '@reduxjs/toolkit'; // ✅ Import configureStore
import medicinesApi from './features/medicines/medicinesApi';
// ✅ Only import medicinesReducer if you have medicinesSlice created
// If you don't have medicinesSlice.js yet, comment out or remove the below import
import medicinesReducer from './features/medicines/medicinesSlice';

export const store = configureStore({
  reducer: {
    [medicinesApi.reducerPath]: medicinesApi.reducer,
    medicines: medicinesReducer, // ✅ Add medicinesReducer here if medicinesSlice exists
    // ... add other reducers here as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(medicinesApi.middleware),
});
