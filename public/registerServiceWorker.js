/* eslint-disable no-console */

// import { register } from 'register-service-worker'

// if (process.env.NODE_ENV === 'production') {
//     register(`${process.env.BASE_URL}service-worker.js`, {
//         ready() {
//             console.log(
//                 'App is being served from cache by a service worker.\n' +
//                 'For more details, visit https://goo.gl/AFskqB'
//             )
//         },
//         registered() {
//             console.log('Service worker has been registered.')
//         },
//         cached() {
//             console.log('Content has been cached for offline use.')
//         },
//         updatefound() {
//             console.log('New content is downloading.')
//         },
//         updated() {
//             console.log('New content is available; please refresh.')
//         },
//         offline() {
//             console.log(
//                 'No internet connection found. App is running in offline mode.'
//             )
//         },
//         error(error) {
//             console.error('Error during service worker registration:', error)
//         },
//     })
// }

// install service worker
self.addEventListener('install', event => {
    console.log('service worker has been installed')
    event.waitUntil(
        caches
        .open('LiaraPWA')
        .then(cache =>
            cache.addAll([
                'favicon.ico',
                'js/chunk-vendors.js',
                'manifest.json',
                'fonts/dana-fanum-bold.0dd44d65.woff2',
                'fonts/dana-fanum-regular.870a0b65.woff2',
                'img/icons/android-chrome-192x192.png',
            ])
        )
    )
})

// activate
self.addEventListener(
    'activate',
    console.log('service worker has been actived')
)

//fetch
self.addEventListener('fetch', e => {
    console.log('fetch event', e)
})