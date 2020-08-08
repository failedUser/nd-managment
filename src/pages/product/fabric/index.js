import React, {useEffect, useState, useCallback} from 'react';
import { Button, Table, Modal, Input, Upload, message } from 'antd';
import {exportFile } from '../../../assets/js/common';

import { 
    requestForFabricList,requestForFabricEdit, 
    requestForFabricCreate, requestForFabricDelete,
    requestForFabricExport
 } from './action';

export default function FabricManager() {
    const [ isInit, updateInit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 0,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ modelType, setModelType ] = useState('');
    const [ dataSource, setDataSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ editInfo, setEditInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ search, setSearch ] = useState({});

    const updateSearch = useCallback((key, value) => {
        setSearch(search => {
            search[key] = value;
            return {...search}
        });
    }, [])
    // 获取分页数据
    const pageData = useCallback(() => {
        requestForFabricList(pageInfo).then(data => {
            if (!data) return ;
            setTableSize(data.size);
            if (data && Array.isArray(data.content)) {
                setDataSource([...data.content]);
            }
        })
    }, [pageInfo])

    const startSearch = useCallback(() => {
        if (!search.code) {
            message.info('请先输入条码');
            return ;
        }
        console.log('----开始筛选----', search);
    }, [search])

    const _delete = useCallback((item) => {
        requestForFabricDelete([item.fabric_Id]).then(data => {
            message.info('删除成功');
        }).then(pageData)
    }, [pageData]);

    const _delete_batch = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再批量删除');
            return ;
        }
        requestForFabricDelete(chooseItems).then(data => {
            message.info('删除成功');
        }).then(pageData)
    }, [chooseItems, pageData])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        requestForFabricExport(chooseItems).then(data => {
            message.info('导出成功');
            exportFile(data, '商品导出');
        })
    }, [chooseItems])

    // 编辑信息
    const _edit = useCallback((item) => {
        setModelType('edit');
        setVisible(true);
        setEditInfo({...item});
    }, []);

    // 新增
    const create = useCallback(() => {
        setModelType('create');
        setVisible(true);
        setEditInfo({});
    }, [])

    // 更新编辑信息
    const updateEditInfo = useCallback((key, value) => {
        setEditInfo(info => {
            return {...info, [key]: value};
        })
    }, [])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    const submitModal = useCallback(() => {
        if (modelType === 'edit') {
            requestForFabricEdit(editInfo).then(data => {
                if (data) {
                    message.info('修改成功');
                    setDataSource(source => {
                        source = source.map(item => {
                            if (item.barcode === data.barcode) {
                                return data;
                            }
                            return item;
                        });
                        return [...source];
                    })
                    setVisible(false);
                }
                
            })
        }
        if (modelType === 'create') {
            requestForFabricCreate(editInfo).then(data => {
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
        { title: '面料编号', dataIndex: 'fabric_Id', render: text => <span style={{color: '#1890ff'}}>{text}</span> },
            { title: '类别', dataIndex: 'fabric_Classsification'},
            { title: '颜色', dataIndex: 'fabric_Color'},
            { title: '材质', dataIndex: 'material',width: 200},
            { title: '厚度', dataIndex: 'thickness'},
            { title: '弹力', dataIndex: 'elasticity'},
            { title: '图片', dataIndex: 'fabric_Image', width: 120,render: item => <div className="product-table-images">
                <img className="product-table-image" alt="img" src="http://alpha-2115.caibeike.com/i/db23aabcc32b698375babffd50de72c4-cXni3O-bMOMwiAMhj2@!750c445" />
            </div>},
            { title: '操作', dataIndex: 'name11', width: 300, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" onClick={() => _edit(record)} >编辑</Button>
               <Button type="primary" size="small" onClick={() => _delete(record)}>删除</Button>
               <Upload ><Button type="primary" size="small" >换图</Button></Upload>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">面料编号</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('code', e.target.value)} />
            </div>
            <div className="manager-search-btn"><Button onClick={startSearch} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
        <Upload onChange={({ file, fileList }) => {
                if (file.status !== 'uploading') {
                    console.log(file, fileList);
                }
            }}><Button type="primary">批量导入</Button></Upload> 
            <Button onClick={_delete_batch} type="primary">批量删除</Button>
            <Button onClick={export_data} type="primary">数据导出</Button>
            <Button onClick={create} type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowKey="fabric_Id"
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                {columns.map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    {(col.type === 'image') 
                        && <div className="pm-edit__images">
                            {editInfo[col.dataIndex] &&  <img className="pm-edit__image" alt="edit" src={editInfo[col.dataIndex]} />}
                            <Upload ><Button type="primary">替换</Button></Upload>
                        </div>
                    }
                    {!col.type && <Input 
                            placeholder="输入你的数据" 
                            value={editInfo && editInfo[col.dataIndex]}
                            onChange={e => updateEditInfo(col.dataIndex, e.target.value)}
                        />}
                </div>)}
                </div>
            </Modal>}
    </div>
}