const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy([
        '/newdreamer',
    ],{
            "target": "https://newdreamer.cn",
            changeOrigin: true,
        })
    );
};
