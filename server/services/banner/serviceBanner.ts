// server/services/banner/serviceBanner.ts
export const getBannerListFetch = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/banner');  // 또는 실제 API URL을 사용
        return await response.json();  // JSON 데이터 반환
    } catch (error) {
        console.error('배너 데이터를 가져오는 중 에러가 발생했습니다.', error);
        throw error;
    }
};
