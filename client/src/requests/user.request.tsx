import { AxiosResponse } from "axios";
import { api } from "../utils/custom-axios";
import { IUser } from "./auth.request";

const usersPrefix = "/users"


export const getUsersOnline = (
  ): Promise<AxiosResponse<IUser[]>> =>
    api.get(`${usersPrefix}/online`);