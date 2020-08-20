export default [{
    path: '/user',
    name: '用户',
    children: [{
        path: '/login',
        name: '登陆',
        component: require('../pages/user/login/login').default
    }]
}]