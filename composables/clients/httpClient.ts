// 재사용 가능한 로직 비즈니스 로직
// useHttpClient.ts
import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';
import type {Endpoint, GenericObject} from '~/types/general';
import type {ApiResponse, HttpResponse} from "~/types/api";


export function useHttpClient() {
    const router = useRouter();
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl; // Nuxt runtimeConfig로 가져옴

    // 로그인 상태 체크 함수
    const isLoggedIn = (): boolean => {
        return !!localStorage.getItem('accessToken'); // 액세스 토큰이 있으면 로그인된 상태
    };

    // 액세스 토큰에서 만료일(exp) 체크
    const isTokenExpired = (token: string): boolean => {
        const decoded = decodeJwt(token);  // JWT 디코딩
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
        return decoded.exp < currentTime; // 만약 exp 값이 현재 시간보다 작다면 만료된 토큰
    };

    // 리프레시 토큰 만료일 체크
    const isRefreshTokenExpired = (refreshToken: string): boolean => {
        const decoded = decodeJwt(refreshToken);  // JWT 디코딩
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
        return decoded.exp < currentTime; // 만약 exp 값이 현재 시간보다 작다면 만료된 리프레시 토큰
    };

    // JWT 디코딩 함수 (base64로 디코딩)
    const decodeJwt = (token: string): any => {
        const base64Url = token.split('.')[1]; // JWT의 두 번째 부분 (payload)
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    // 로그인 상태가 아닐 경우 로그인 페이지로 리다이렉트하는 함수
    const redirectToLogin = (): void => {
        router.push('/login'); // Nuxt3에서 useRouter로 리다이렉트
    };

    // 액세스 토큰을 가져오는 함수
    const getAccessToken = () => {
        return localStorage.getItem('accessToken');
    };

    // 리프레시 토큰을 가져오는 함수
    const getRefreshToken = () => {
        return localStorage.getItem('refreshToken');
    };

    // 인증 헤더 추가 함수
    const addAuthHeader = async (options: AxiosRequestConfig, requiresToken: boolean) => {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();
        options.headers = options.headers || {};

        if (requiresToken) {
            // 액세스 토큰이 없거나 만료된 경우
            if (!accessToken || isTokenExpired(accessToken)) {
                // 리프레시 토큰도 없거나 만료된 경우
                if (!refreshToken || isRefreshTokenExpired(refreshToken)) {
                    redirectToLogin(); // 리프레시 토큰도 만료되었으면 로그인 페이지로 리다이렉트
                    return options; // 요청을 보내지 않음
                }

                // 리프레시 토큰을 사용해 새로운 액세스 토큰을 요청하는 로직 추가 필요
                // 이 부분은 리프레시 토큰을 이용하여 새로운 액세스 토큰을 받아오는 API 호출 로직을 작성해야 합니다.
                await refreshAccessToken(refreshToken); // 예시로 리프레시 토큰을 사용해 액세스 토큰을 갱신
            } else {
                options.headers['Authorization'] = `Bearer ${accessToken}`; // 액세스 토큰을 Authorization 헤더에 추가
            }
        }
        return options;
    };

    // 리프레시 토큰을 사용해 액세스 토큰을 갱신하는 함수
    const refreshAccessToken = async (refreshToken: string): Promise<void> => {
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/refresh`, {
                refresh_token: refreshToken
            });

            // 새로운 액세스 토큰을 로컬 스토리지에 저장
            const newAccessToken = response.data.access_token;
            localStorage.setItem('accessToken', newAccessToken);

            // 새로 갱신된 액세스 토큰을 인증 헤더에 추가
            axios.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
        } catch (error) {
            console.error("리프레시 토큰 갱신 실패:", error);
            redirectToLogin(); // 리프레시 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
        }
    };

    // type 용도 -> ? 쿼리 스트링으로 보낼지 여부
    const httpGet = async <T>(url: Endpoint, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        return httpGetAct(url.endpoint, url.requiresToken, parameters, type);
    };

    const httpGetAct = async <T>(url: string, requiresToken?: boolean, parameters?: string, type?: boolean): Promise<ApiResponse<T>> => {
        const options: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        axios.defaults.withCredentials = true;
        const slush = parameters ? (type ? '?' : '/') : '';
        parameters = parameters || '';

        try {
            const authOptions = await addAuthHeader(options, requiresToken || false); // 인증 헤더 추가
            const response: HttpResponse<T> = await axios.get(`${apiBaseUrl}/${url}${slush}${parameters}`, authOptions);
            return Promise.resolve({
                reasonPhrase: response.message || 'Success',
                data: response.data?.data,
                message: response.message || 'Success',
            });
        } catch (e) {
            return Promise.reject(e);
        }
    };


    const httpPost = async <T>(url: Endpoint, payload: GenericObject, contentType: string, formData = false): Promise<ApiResponse<T>> => {
        return httpPostAct(url.endpoint, url.requiresToken, payload, contentType, formData);
    };

    const httpPostAct = async <T>(url: string, requiresToken: boolean, payload: GenericObject, contentType: string, formData = false): Promise<ApiResponse<T>> => {

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
            options.headers = {'Content-Type': contentTypeMap[contentType]};
        }
        // formData 처리
        if (formData) {
            options.headers = {'Content-Type': 'multipart/form-data'};
        }


        axios.defaults.withCredentials = true;
        try {
            const authOptions = await addAuthHeader(options, requiresToken || false); // 인증 헤더 추가
            const response: HttpResponse<T> = await axios.post(`${apiBaseUrl}/${url}`, payload, authOptions);
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