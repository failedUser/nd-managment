console.log('--1212-', process.env.NODE_ENV);

let reqUrl = 'http://newdreamer.cn:8080';

if (window.location.href.indexOf('localhost') >= 0) {
    reqUrl = '';   
}

export default reqUrl;