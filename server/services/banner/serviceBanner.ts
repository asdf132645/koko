// server/services/banner/serviceBanner.ts
// fetch 서버 데이터 호출용
export const getBannerListFetch = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        return await response.json();  // JSON 데이터 반환
    } catch (error) {
        console.error('배너 데이터를 가져오는 중 에러가 발생했습니다.', error);
        throw error;
    }
};
