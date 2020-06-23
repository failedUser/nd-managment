export default [{
    path: '/shop',
    name: '店铺设置',
    children: [{
        path: '/home',
        name: '首页',
        // component: require('../pages/shop/home').default,
        children: [{
            path: '/home2',
            name: '首页2',
            component: require('../pages/shop/home').default,
        }]
    }]
}]