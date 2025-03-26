// composables/languageStore.ts
import { ref } from 'vue';

// 메시지 타입을 정의
type Messages = {
    [key: string]: string;
};

// JSON 파일을 import 합니다.
import enMessages from '@/locales/en.json';
import koMessages from '@/locales/ko.json';

export const languageStore = () => {
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('currentLanguage') : null;
    const locale = ref<'en' | 'ko'>(storedLanguage as 'en' | 'ko' || 'en');  // 'en' 또는 'ko'만 허용

    // import된 JSON 파일을 messages 객체로 사용
    const messages: Record<'en' | 'ko', Messages> = {
        en: enMessages,
        ko: koMessages,
    };

    // 언어 변경 함수
    const setLocale = (lang: 'en' | 'ko') => {
        locale.value = lang;
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentLanguage', lang);
        }
    };

    // 메시지 반환 함수
    const t = (key: string): string => {
        return messages[locale.value][key] || key;  // key에 해당하는 메시지 반환
    };

    return {
        locale,
        setLocale,
        t,
    };
};
