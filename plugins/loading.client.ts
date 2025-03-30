export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        const loadingElement = document.getElementById('custom-loading')
        if (loadingElement) {
            loadingElement.style.display = 'none'
        }
    })
})
