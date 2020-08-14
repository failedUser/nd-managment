import request from '../../../assets/js/request';



/**
 * 获取商品列表
 * @param {*} data 
 */
export function requestForProductList(data) {
    return request({
        method: 'get',
        url: '/newdreamer/productInfo',
        params: data
    })
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForProductEdit(data) {
    return request({
        method: 'post',
        url: '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}


/**
 * 新建商品
 */

export function requestForProductCreate(data) {
    return request({
        method: 'put',
        url: '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}

/**
 * 删除
 * @param {} data 
 */
export function requestForProductDelete(data) {
    return request({
        method: 'delete',
        url: '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}



/**
 * 导出
 * @param {} data 
 */
export function requestForProductExport(data) {
    return request({
        method: 'get',
        url: '/newdreamer/productInfo/exportExcel',
        params: data
    })
}


/**
 * 导入
 * @param {} data 
 */
export function requestForProductImport(data) {
    return request({
        method: 'get',
        url: '/newdreamer/productInfo/importExcel',
        params: data
    })
}