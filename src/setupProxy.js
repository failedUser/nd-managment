const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            "target": "https://newdreamer.cn",
            changeOrigin: true,
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('cookie', 'JSESSIONID=C156B565CB748C85D4C96DF66991C06F');
            }
        })
    );
};
