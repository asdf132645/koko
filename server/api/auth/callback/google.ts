import GoogleProvider from "@auth/core/providers/google"
import { Auth } from "@auth/core"
import { useRuntimeConfig } from '#imports'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
    const config = useRuntimeConfig()
    const { req } = event.node

    // URL 생성
    const url = `${config.public.baseUrl}${req.url ?? ''}`

    // 헤더 변환 (HeadersInit 타입)
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === 'string') headers.append(key, value)
        else if (Array.isArray(value)) value.forEach(v => headers.append(key, v))
    }

    // 요청 객체 생성
    const request = new Request(url, {
        headers,
        method: req.method,
        body: (req.method !== 'GET' && req.method !== 'HEAD') ? (req as unknown as BodyInit) : null,
    })

    return Auth(request, {
        providers: [
            GoogleProvider({
                clientId: config.googleClientId,
                clientSecret: config.googleClientSecret,
            })
        ],
        secret: config.authSecret,
        pages: {
            signIn: '/login'
        }
    })
})
