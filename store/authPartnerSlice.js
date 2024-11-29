import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token:null,
    info:null,
    isAuthPartner:false  
}

export const authPartnerSlice = createSlice({
  name: "authPartner",
  initialState,
  reducers: {
    login(state, action) {
      state.token=action.payload.token;
      state.info=action.payload.info;
      state.isAuthPartner=true;
    },
    logout(state, action) {
      state.token=null; 
      state.info=null; 
      state.isAuthPartner=false;    
    },
    updateInfo(state, action){
      console.log(action.payload)
      state.info=action.payload;
    }
  },
})

export const { login,logout,updateInfo} = authPartnerSlice.actions;
export const getAuthPartnerToken = state => state.authPartner.token;
export const getAuthPartnerInfo = state => state.authPartner.info;

export default authPartnerSlice.reducer
