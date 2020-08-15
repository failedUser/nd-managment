import request from '../../../assets/js/request';
import Url from '../../../env';


/**
 * 获取商品列表
 * @param {*} data 
 */
export function requestForProductList(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/productInfo',
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
        url: Url +  '/newdreamer/productInfo',
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
        url: Url + '/newdreamer/productInfo',
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
        url: Url + '/newdreamer/productInfo',
        data: data,
        type: 'json'
    })
}



/**
 * 导出
 * @param {} data 
 */
export function requestForProductExport(data) {
    console.log('---data----', data);
    let params = Object.entries(data).reduce((Result, [key, value], index) => {
        if (index === 0) {
            Result += `${key}=${value}`
        } else {
            Result += `&${key}=${value}`
        }
        return Result;
        
    }, '')
    const link = document.createElement('a');
    link.href = `http://newdreamer.cn:8080/newdreamer/productInfo/exportExcel?${params}`;
    link.click();
    return Promise.resolve();
}


/**
 * 导入
 * @param {} data 
 */
export function requestForProductImport(data) {
    return request({
        method: 'get',
        url: Url + '/newdreamer/productInfo/importExcel',
        params: data
    })
}