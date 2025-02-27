import axios, {AxiosInstance} from "axios";

const api : AxiosInstance = axios.create();

const getQueryResult = async () => {
    try {
        const response : any = await api.get('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json');
        return response;
    } catch (error) {
        console.log('Error', error);
    }
};

const getSuggestions = async () => {
    try {
        const response : any = await api.get('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json');
        return response;
    } catch (error) {
        console.log('Error', error);
    }
};

export const ApiService = {
    getQueryResult,
    getSuggestions
}