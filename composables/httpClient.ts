// 재사용 가능한 로직 비즈니스 로직
// useHttpClient.ts
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { Endpoint, GenericObject } from '~/types/general';
import type {ApiResponse, HttpResponse} from "~/types/api";




export function useHttpClient() {
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl; // Nuxt runtimeConfig로 가져옴
    // type 용도 -> ? 쿼리 스트링으로 보낼지 여부
    const httpGet = async <T>(url: Endpoint, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        return httpGetAct(url.endpoint, parameters, type);
    };

    const httpGetAct = async <T>(url: string, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        axios.defaults.withCredentials = true;
        const slush = parameters ? (type ? '?' : '/') : '';
        parameters = parameters || '';

        try {
            const response: HttpResponse<T> = await axios.get(`${apiBaseUrl}/${url}${slush}${parameters}`, options);
            return Promise.resolve({
                reasonPhrase: response.message || 'Success',
                data: response.data?.data,
                message: response.message || 'Success',
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };


    const httpPost = async <T>(url: Endpoint, payload: GenericObject, contentType: string, formData = false, callImg?: string): Promise<ApiResponse<T>> => {
        return httpPostAct(url.endpoint, payload, contentType, formData, callImg);
    };

    const httpPostAct = async <T>(url: string, payload: GenericObject, contentType: string, formData = false, callImg?: string): Promise<ApiResponse<T>> => {

        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };
        // contentType에 따른 처리
        const contentTypeMap: { [key: string]: string } = {
            'blob': 'blob',
            'text/plain': 'text/plain',
            'application/rtf': 'application/rtf',
        };

        if (contentType === 'blob') {
            options.responseType = 'blob';
        } else if (contentType && contentTypeMap[contentType]) {
            options.headers = { 'Content-Type': contentTypeMap[contentType] };
        }
        // formData 처리
        if (formData) {
            options.headers = { 'Content-Type': 'multipart/form-data' };
        }


        axios.defaults.withCredentials = true;
        try {
            const response: HttpResponse<T> = await axios.post(`${apiBaseUrl}/${url}`, payload, options);
            return Promise.resolve({
                reasonPhrase: response.message || 'Success',
                data: response.data?.data,
                message: response.message || 'Success',
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const httpPut = async <T>(url: Endpoint, payload: GenericObject, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        return httpPutAct(url.endpoint, payload, parameters, type);
    };

    const httpPutAct = async <T>(url: string, payload: GenericObject, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        axios.defaults.withCredentials = true;
        const slush = parameters ? (type ? '?' : '/') : '';
        parameters = parameters || '';

        try {
            const response: HttpResponse<T> = await axios.put(`${apiBaseUrl}/${url}${slush}${parameters}`, payload, options);
            return Promise.resolve({
                reasonPhrase: response.message || 'Success',
                data: response.data?.data,
                message: response.message || 'Success',
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };

    const httpDelete = async <T>(url: Endpoint, payload: GenericObject, type?: boolean): Promise<ApiResponse<T>> => {
        return httpDeleteAct(url.endpoint, payload, type);
    };

    const httpDeleteAct = async <T>(url: string, payload: GenericObject, type?: boolean): Promise<ApiResponse<T>> => {
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        axios.defaults.withCredentials = true;
        const slush = type ? '?' : '/';
        try {
            const response: HttpResponse<T> = await axios.delete(`${apiBaseUrl}/${url}${slush}`, {
                ...options,
                data: payload
            });
            return Promise.resolve({
                reasonPhrase: response.message || 'Success',
                data: response.data?.data,
                message: response.message || 'Success',
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };


    return {
        httpGet,
        httpGetAct,
        httpPost,
        httpPostAct,
        httpPut,
        httpPutAct,
        httpDelete,
        httpDeleteAct,
    };

}