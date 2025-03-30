import {apiConstants} from "~/composables/clients/apiConstants";  // service에서 가져온 데이터 함수
import {useHttpClient} from "~/composables/clients/httpClient";
import type {ApiResponse, HttpResponse} from "~/types/api";
import type {BannerDto} from "~/server/services/banner/dto/bannerDto";

export const useBanner = async (): Promise<ApiResponse<BannerDto[] | undefined>> => {
    const httpClient = useHttpClient();

    return httpClient.httpGet(apiConstants.banner, '' , false);// 가져온 데이터 반환
};
