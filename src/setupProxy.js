const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            "target": "https://newdreamer.cn",
            changeOrigin: true,
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('cookie', 'JSESSIONID=26F928BAC76E4A52DFD5C3536067F3A7');
            }
        })
    );
};
