import { ApiService } from "../apiService";

const api = new ApiService()

export const postFeedbackByUsernameGithub = async (username: string) => {
    return await api.post<{ feedback: string }>("/generate-feedback", {
        username: username
    })
}