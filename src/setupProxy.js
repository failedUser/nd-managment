const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/volumeRewardConfig', 
        '/productInfo',
        '/fabric',
        '/backOrder',
        '/backCustomer',
        '/volumer',
        '/backVolumer',
        '/rewardConfig',
        '/withdrawConfig'
    ],{
            "target": "https://newdreamer.cn:8080",
            changeOrigin: true,
        })
    );
};
