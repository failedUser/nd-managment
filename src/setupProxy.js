const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            "target": "https://newdreamer.cn",
            changeOrigin: true,
            onProxyReq(proxyReq, req, res) {
                proxyReq.setHeader('cookie', 'JSESSIONID=CB9485DD9CEB7EEAE20D82F2AB2A9127');
            }
        })
    );
};
