// src/redux/userDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@prisma/client';

interface UserDataState {
  userData: UserData[];
}

const initialState: UserDataState = {
  userData: [],
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData[]>) => {
      state.userData = action.payload;
    },
   
    updateUserData: (state, action: PayloadAction<UserData>) => {
      const index = state.userData.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.userData[index] = action.payload;
      }
    },
   
  },
});

export const { setUserData,  updateUserData, } = userDataSlice.actions;
export default userDataSlice.reducer;
