import GoogleProvider from "@auth/core/providers/google"
import { Auth } from "@auth/core"
import { useRuntimeConfig } from '#imports'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    // 환경 설정 값 가져오기
    const config = useRuntimeConfig()
    const { req } = event.node

    // 요청 URL 설정
    const url = `${config.public.baseUrl}${req.url ?? ''}`
    const headers = new Headers()

    // 요청 헤더 처리
    for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') headers.append(key, value)
        else if (Array.isArray(value)) value.forEach(v => headers.append(key, v))
    }

    // 요청 객체 생성
    const request = new Request(url, {
        headers,
        method: req.method,
        body: req.method === 'GET' || req.method === 'HEAD' ? null : req as unknown as BodyInit,
    })

    // GoogleProvider로 구글 로그인 처리
    return Auth(request, {
        providers: [
            GoogleProvider({
                clientId: config.googleClientId,
                clientSecret: config.googleClientSecret,
            })
        ],
        secret: config.authSecret, // 인증 비밀
        pages: {
            signIn: '/login', // 로그인 페이지로 리디렉션
        }
    })
})
