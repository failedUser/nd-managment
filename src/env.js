console.log('--1212-', process.env.NODE_ENV);

let reqUrl = '//newdreamer.cn';

if (window.location.href.indexOf('localhost') >= 0) {
    reqUrl = '';   
}

export default reqUrl;