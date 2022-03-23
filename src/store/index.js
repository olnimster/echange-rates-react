import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice'

export default configureStore ({
    reducer: {
        valuate: appReducer,
    }
});

