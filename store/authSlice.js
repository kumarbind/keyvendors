import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token:null,
    info:null,
    isAuthUser:false  
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token=action.payload.token;
      state.info=action.payload.info;
      state.isAuthUser=true;
    },
    logout(state, action) {
      state.token=null; 
      state.info=null; 
      state.isAuthUser=false;    
    },
    updateInfo(state, action){
      state.info=action.payload;
    }
  },
})

export const { login,logout,updateInfo} = authSlice.actions;
export const getAuthToken = state => state.auth.token;
export const getAuthInfo = state => state.auth.info;

export default authSlice.reducer
