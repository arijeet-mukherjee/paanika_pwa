import { configureStore } from "@reduxjs/toolkit";
import { userSlice} from "../features/userslice";

export default configureStore({
    reducer:{
        user: userSlice.reducer
    }
});