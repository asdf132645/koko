import { defineStore } from 'pinia';
import { ref } from 'vue';
import enMessages from '@/locales/en.json';
import koMessages from '@/locales/ko.json';

type Messages = { [key: string]: string };

interface LanguageStore {
    locale: 'en' | 'ko';
    setLocale: (lang: 'en' | 'ko') => void;
    t: (key: string) => string;
}

export const useLanguageStore = defineStore('languageStore', () => {
    const storedLanguage = typeof window !== 'undefined' ? localStorage.getItem('currentLanguage') : null;
    const locale = ref<'en' | 'ko'>((storedLanguage as 'en' | 'ko') || 'en');

    const messages: Record<'en' | 'ko', Messages> = {
        en: enMessages,
        ko: koMessages,
    };

    const setLocale = (lang: 'en' | 'ko') => {
        locale.value = lang;
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentLanguage', lang);
        }
    };

    const t = (key: string): string => {
        return messages[locale.value][key] || key;
    };

    return {
        locale,
        setLocale,
        t,
    };
});

