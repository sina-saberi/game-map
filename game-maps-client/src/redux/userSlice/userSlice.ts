import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";
import { IRegister } from "../../models/register";
import { ILogin } from "../../models/login";

export const RegisterUser = createAsyncThunk("Register", async (model: IRegister) => {
    let res = await axios.post("/User/RegisterUser", model);
    return res.data
})

export const LoginUser = createAsyncThunk("Login", async (model: ILogin) => {
    let res = await axios.post<string>("/User/Login", model);
    return res.data
}) 