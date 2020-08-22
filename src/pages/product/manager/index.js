import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message,Select } from 'antd';
import { requestForProductList, requestForProductEdit, requestForProductCreate, requestForProductDelete, requestForProductExport } from './action';
import {exportFile, dealOssImageUrl, UploadImages, previewImage } from '../../../assets/js/common';

let UploadImage = new UploadImages();

let editConfig = [
    { title: '条码', dataIndex: 'barcode', onlyRead: true,  },
    { title: '材质', dataIndex: 'material'},
    { title: '款号', dataIndex: 'section_Number'},
    { title: '厚度', dataIndex: 'thickness'},
    { title: '商品名称', dataIndex: 'product_Name' },
    { title: '弹力', dataIndex: 'elasticity'},
    { title: '性别', dataIndex: 'gender'},
    { title: '分类', dataIndex: 'classification'},
    { title: '成分', dataIndex: 'ingredient'},
    { title: '工艺', dataIndex: 'crafts'},
    { title: '款式', dataIndex: 'style'},
    { title: '零售价', dataIndex: 'retail_Price',},
    { title: '版型', dataIndex: 'type'},
    { title: '置顶顺序', dataIndex: 'is_Top'},
    { title: '颜色', dataIndex: 'color'},
    { title: '启用', dataIndex: 'product_Status', type: ""},
    { title: '图片', dataIndex: 'images', type:"images"},
    { title: '尺码', dataIndex: 'size'},
    { title: '详情页', dataIndex: 'detailImages', type:"images"},
    
]


export default function ProductManager() {
    const [ isInit, updateInit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ modelType, setModelType ] = useState('');
    const [ dataSource, setDataSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ editInfo, setEditInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(pageInfo => {
            pageInfo[key] = value;
            return {...pageInfo}
        });
    }, [])

    // 获取分页数据
    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestForProductList(_pageInfo).then(data => {
            if (!data) return ;

            setTableSize(data.totalElements);
            if (data && Array.isArray(data.content)) {
                let content = Array.from(data.content, item => {
                    if (item.images) {
                        item.images = JSON.parse(item.images).filter(item => item);
                        item.detailImages = JSON.parse(item.detailImages).filter(item => item);
                    }
                    return item;
                })
                setDataSource(content);
            }
        });
    }, [pageInfo])

    const _delete = useCallback((item) => {
        requestForProductDelete([item.barcode])
        .then(() => {
            message.info('禁用成功');
        })
        .then(pageData)
    }, [pageData]);

    const _delete_batch = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再批量禁用');
            return ;
        }
        requestForProductDelete(chooseItems)
        .then(() => {
            message.info('禁用成功');
        })
        .then(pageData)
    }, [chooseItems, pageData])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        requestForProductExport(chooseItems);
    }, [chooseItems])

    // 编辑信息
    const _edit = useCallback((item) => {
        setModelType('edit');
        setVisible(true);
        let obj = JSON.parse(JSON.stringify(item));
        obj.images = UploadImage.imageToUploadImages(obj.images);
        obj.detailImages = UploadImage.imageToUploadImages(obj.detailImages);
        setEditInfo(obj);
    }, []);

    // 新增
    const create = useCallback(() => {
        setModelType('create');
        setVisible(true);
        setEditInfo({});
    }, [])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    // 更新编辑信息
    const updateEditInfo = useCallback((key, value) => {
        setEditInfo(info => {
            return {...info, [key]: value};
        })
    }, [])

    const submitModal = useCallback(() => {
        let _editInfo = {...editInfo};
        _editInfo.images = JSON.stringify(UploadImage.uploadImageToImages(_editInfo.images));
        _editInfo.detailImages = JSON.stringify(UploadImage.uploadImageToImages(_editInfo.detailImages));
        if (modelType === 'edit') {
            requestForProductEdit(_editInfo).then(data => {
                if (data) {
                    message.info('修改成功');
                    setVisible(false);
                    pageData();
                }
                
            })
        }
        if (modelType === 'create') {
            requestForProductCreate(_editInfo).then(data => {
                message.info('新建成功');
                setVisible(false);
                pageData();
            })
        }
    }, [editInfo, modelType, pageData])


    // 初始化
    useEffect(() => {
        if (isInit) return ;
        pageData();
        updateInit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
        { title: '条码', dataIndex: 'barcode', render: text => <span style={{color: '#1890ff'}}>{text}</span> },
            { title: '款号', dataIndex: 'section_Number' },
            { title: '商品名称', dataIndex: 'product_Name'},
            { title: '零售价', dataIndex: 'retail_Price',width: 100},
            { title: '状态', dataIndex: 'product_Status'},
            { title: '工艺', dataIndex: 'crafts'},
            { title: '排序', dataIndex: 'is_Top', width: 80},
            { title: '图片', dataIndex: 'images', render: item => <div className="product-table-images">
                {Array.isArray(item) && item.map(_img => <img onClick={() => {
                    previewImage(_img);
                }} className="product-table-image" alt="img" src={_img} />)}
            </div>},
            { title: '详情页', dataIndex: 'detailImages', render: item => <div className="product-table-images">
                {Array.isArray(item) && item.map(_img => <img onClick={() => {
                    previewImage(_img);
                }} className="product-table-image" alt="img" src={_img} />)}
            </div>},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" onClick={() => _edit(record)} >编辑</Button>
               <Button type="primary" size="small" onClick={() => _delete(record)}>禁用</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">条码</div>
                <Input size="small" placeholder="输入条码" onChange={e => updateSearch('barcode', e.target.value)} />
            </div>
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Upload 
            action="//newdreamer.cn/newdreamer/productInfo/importExcel"
            method="post"
            onChange={({ file, fileList }) => {
                // TODO 导入之后没有反应，显示上传成功了
                if (file.status === 'done') {
                    message.info('导入成功');
                    pageData();
                } else if (file.status === 'error') {
                    message.info('导入失败');
                }
            }}><Button type="primary">批量导入</Button></Upload> 
            {/* <Button onClick={_delete_batch} type="primary">批量禁用</Button> */}
            <Button onClick={export_data} type="primary">数据导出</Button>
            <Button onClick={create} type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table
                rowKey="barcode"
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(selectedRowKeys, selectedRows);
                        setChooseItems((selectedRowKeys + '').split(','));
                      }
                }}
                dataSource={dataSource} 
                columns={columns} 
                pagination={{
                    current: pageInfo.page,
                    total: tableSize,
                    onChange: onPageChange
                }}
            />
        </section>
        {editInfo && <Modal
                title="商品编辑"
                visible={visible}
                width={1000}
                onOk={submitModal}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {editConfig.map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    {
                        col.dataIndex === 'product_Status' && <Select 
                        style={{ width: 300 }}
                        defaultValue={editInfo[col.dataIndex]} 
                        onChange={value => updateEditInfo(col.dataIndex, value)}>
                        <Select.Option value="显示">显示</Select.Option>
                        <Select.Option value="隐藏">隐藏</Select.Option>
                      </Select>
                    }
                    {(col.type === 'images') 
                        && <div className="pm-edit__images">
                            {/* {Array.isArray(editInfo[col.dataIndex]) && editInfo[col.dataIndex].map(img => <img className="pm-edit__image" alt="edit" src={img} />)} */}
                            <Upload
                                action="/newdreamer/file/upload?FileDirectorEnum=PRODUCT"
                                method="post"
                                multiple
                                listType="picture-card"
                                fileList={editInfo[col.dataIndex]||[]}
                                data={(file) => {
                                    return {
                                        fileDirectorEnum: 'PRODUCT',
                                        files: file
                                    }
                                }}
                                onChange={({ file, fileList }) => {
                                    updateEditInfo(col.dataIndex, fileList);
                                }}
                            >{editInfo[col.dataIndex] && editInfo[col.dataIndex].length >= 3 ? null : '上传'}</Upload>
                        </div>
                    }

                    {(!col.type && col.dataIndex!=='product_Status') && <Input 
                            placeholder="输入你的数据" 
                            disabled={col.onlyRead && modelType === 'edit'}
                            value={editInfo && editInfo[col.dataIndex]}
                            onChange={e => updateEditInfo(col.dataIndex, e.target.value)}
                        />}
                </div>)}
                </div>
            </Modal>}
        
        </div>
}