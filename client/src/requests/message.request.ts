import { AxiosResponse } from "axios";
import { api } from "../utils/custom-axios";

// /api/messages/history/:userId/:receiverId
const messagePrefix = "/messages"
export interface IMessage {
    id: string,
    sender: {
        id: string,
        username: string
    },
    receiver: {
        id: string
        username: string
    },
    message: string
    timestamp: number
}

export const getMessageHistoryRequest = (
    senderId: string, receiverId: string
): Promise<AxiosResponse<IMessage[]>> =>
    api.get(`${messagePrefix}/history/${senderId}/${receiverId}`);