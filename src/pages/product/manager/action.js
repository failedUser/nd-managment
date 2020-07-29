import { dataSource } from './data';



/**
 * 获取商品列表
 * @param {*} data 
 */
export function requestForProductList(data) {
    return Promise.resolve().then(() => dataSource);
}

/**
 * 修改商品信息
 * @param {} data 
 */
export function requestForProductEdit(data) {
    console.log('---编辑---', data);
    return Promise.resolve(data);
}


/**
 * 新建商品
 */

export function requestForProductCreate(data) {
    console.log('---新建---', data);
    return Promise.resolve({
        "barcode": "333333", // 条码
        "classification": "44444", // 分类
        "color": "黑色", // 颜色 
        "crafts": "什么工艺", // 工艺
        "detailImages": "string", //  详情图片
        "elasticity": "弹性弹性弹性", // 弹性
        "gender": "string", // 性别
        "images": "string", // 图片
        "ingredient": "成分成分成分成分", // 成分
        "is_Top": 0, // 置顶顺序
        "material": "string", // 材质
        "product_Name": "string", //  商品名称
        "product_Status": "string", // 商品状态
        "retail_Price": 0, // 零售价格
        "section_Number": "string", // 款号
        "size": "string", // 尺码
        "style": "string", // 款式
        "thickness": "string", // 厚度
        "type": "string" // 版型
      },);
}

/**
 * 删除
 * @param {} data 
 */
export function requestForProductDelete(data) {
    console.log('---删除---', data);
    return Promise.resolve();
}