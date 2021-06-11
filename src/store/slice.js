import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTableData = createAsyncThunk('state/fetchTableData',
 async () => {
     try{
        const data = await axios.get('https://api.publicapis.org/entries');
        return data.data.entries
     }catch (error){
      throw Error(error)
     }
 })
 
export const reducerData = createSlice({
  name: 'state',
  initialState: {
     data:[]
  },
  reducers: {
    setData : (state, action)=>{
        state.data = action.payload
        
    }
  },
  extraReducers : {
      [fetchTableData.pending]: (state, action) => {
          state.loading = true;
          state.error = null;
      },
      [fetchTableData.fulfilled]: (state,action) => {
          state.data = action.payload;
          state.loading =  false;
      },
      [fetchTableData.rejected]: (state,action) => {
        state.error = action.error.message
        state.loading = false;
      }
  }
})

// Action creators are generated for each case reducer function
export const { setData } = reducerData.actions

export default reducerData.reducer