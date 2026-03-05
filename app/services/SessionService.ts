import axios, {AxiosError} from "axios";
import {StringUtil} from "@/app/utils/StringUtil";

export default class SessionService {
    static async createSession(email: string, password: string): Promise<void> {
        try {
            await axios.post('/api/sessions/', {email: email, password: password});
        } catch (e) {
            const customMessages = [
                {
                    code: 404,
                    message: "The email or the password is incorrect. Please check your credentials and try again."
                },
                {
                    code: 401,
                    message: "The email or the password is incorrect. Please check your credentials and try again."
                }
            ]
            throw StringUtil.getErrorMessageFromStatus((e as AxiosError).status || -1, customMessages);
        }
    }

    static async deleteSession(): Promise<void> {
        try {
            await axios.delete('/api/sessions/');
        } catch (e) {
            throw StringUtil.getErrorMessageFromStatus((e as AxiosError).status || -1)
        }
    }
}