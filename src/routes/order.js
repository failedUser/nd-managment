export default [{
    path: '/order',
    name: '订单管理',
    children: [{
        path: '/voucher/info',
        name: '单据信息',
        component: require('../pages/order/voucher').default
    }]
}]