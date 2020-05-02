module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    pwa: {
        name: 'LiaraPWA',
        themeColor: '#2c333f',
        msTileColor: '#FFFFFF',
        manifestOptions: {
            background_color: '#FFFFFF',
        },
    },
}