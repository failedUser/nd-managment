const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            "target": "https://newdreamer.cn",
            changeOrigin: true,
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('cookie', 'JSESSIONID=CE1363E06C05E62F7572048E3B0A7DE2');
            }
        })
    );
};
