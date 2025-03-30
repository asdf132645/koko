// core/utils/apiUtils.ts
export const handleApiError = (error: any) => {
    if (error.response) {
        // 서버 응답에 따른 에러 처리
        console.error(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
        // 요청이 이루어졌으나 응답이 없는 경우
        console.error('No response received from server');
    } else {
        // 다른 에러 처리
        console.error('Error', error.message);
    }
};
