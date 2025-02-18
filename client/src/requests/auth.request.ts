import { AxiosResponse } from "axios";
import { api } from "../utils/custom-axios";

const authPrefix = "/auth"

export interface ILoginData{
    username:string;
}

export interface ILogoutData{
    userId:string;
}

export interface IUser{
    id:string;
    username:string;
    online:boolean;
}

interface ILogoutRespone{
    message: string;
}

export const loginRequest = (
    data: ILoginData,
  ): Promise<AxiosResponse<IUser>> =>
    api.post(`${authPrefix}/login`, data);

export const logoutRequest = (data: ILogoutData) : Promise<AxiosResponse<ILogoutRespone>> =>
    api.post(`${authPrefix}/logout`, data);