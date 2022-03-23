import {createSlice} from "@reduxjs/toolkit";
import {daily, tenDays} from "../Api/Api";


const appSlice = createSlice({
    name: 'valuate',
    initialState: {
        status: null,
        head: {
            first: 'Код',
            second: 'Курс',
            third: 'Изменение'
        },
        data: {}
    },
    extraReducers: {
        [daily.pending]: (state) => {
            state.data = null
            state.status = 'loading';
        },
        [daily.fulfilled]: (state, action) => {
            state.head = {
                first: 'Код',
                second: 'Курс',
                third: 'Изменение'
            }
            state.status = 'resolved';
            state.data = action.payload;
        },
        [tenDays.pending]: (state) => {
            state.data = null
            state.status = 'loading';
        },
        [tenDays.fulfilled]: (state, action) => {
            state.head = {
                first: 'День',
                second: 'Курс',
                third: 'Изменение'
            }
            state.status = 'resolved';
            state.data = action.payload;
        }
    },
})

export default appSlice.reducer;