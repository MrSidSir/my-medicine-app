import { createSlice } from "@reduxjs/toolkit";

const medicinesSlice = createSlice({
  name: "medicines",
  initialState: {
    items: [],
  },
  reducers: {
    setMedicines: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMedicines } = medicinesSlice.actions;
export default medicinesSlice.reducer;
