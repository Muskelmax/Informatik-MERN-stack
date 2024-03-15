import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "showModal",
  initialState: {
    showModal: false,
    modalId: null
  },
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.modalId = action.payload
    },
    closeModal: (state) => {
      state.showModal = false;
    }
  }
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;