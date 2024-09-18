const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = createProxyMiddleware({
    target: 'http://127.0.0.1:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/employee': '/employee', // Rewrite /employee to /employee in the target
    }
});

module.exports = function (app) {
    app.use('/employee', proxy);
};