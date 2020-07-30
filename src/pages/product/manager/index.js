import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message } from 'antd';
import { requestForProductList, requestForProductEdit, requestForProductCreate, requestForProductDelete } from './action';


let editConfig = [
    { title: '条码', dataIndex: 'barcode' },
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
        pageNumber: 1,
        pageSize: 20,
        paged: true,
        sort: {
            empty: true,
            sorted: true,
            unsorted: true
        }
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

    const startSearch = useCallback(() => {
        if (!search.code) {
            message.info('请先输入条码');
            return ;
        }
        console.log('----开始筛选----', search);
    }, [search])

    const _delete = useCallback((item) => {
        requestForProductDelete(item).then(data => {
            message.info('删除成功');
        })
    }, []);

    const _delete_batch = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再批量删除');
            return ;
        }
        console.log('----开始批量删除-----', chooseItems)
    }, [chooseItems])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        console.log('----开始批量导出-----', chooseItems)
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

    const submitModal = useCallback(() => {
        if (modelType === 'edit') {
            requestForProductEdit(editInfo).then(data => {
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
            requestForProductCreate(editInfo).then(data => {
                message.info('新建成功');
                setVisible(false);
                setDataSource(source => {
                    source = [...[data], ...source];
                    return [...source];
                })
            })
        }
    }, [editInfo, modelType])

    // 获取分页数据
    const pageData = useCallback(() => {
        requestForProductList(pageInfo).then(data => {
            if (!data) return ;
            setTableSize(data.size);
            if (data && Array.isArray(data.content)) {
                setDataSource([...dataSource || [], ...data.content]);
            }
        })
    }, [dataSource, pageInfo])

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
            { title: '显示', dataIndex: 'name8', width: 80},
            { title: '图片', dataIndex: 'images', width: 220, render: item => <div className="product-table-images">
                {Array.isArray(item) && item.map(_img => <img className="product-table-image" alt="img" src={_img} />)}
            </div>},
            { title: '详情页', dataIndex: 'detailImages', width: 220,render: item => <div className="product-table-images">
                {Array.isArray(item) && item.map(_img => <img className="product-table-image" alt="img" src={_img} />)}
            </div>},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" onClick={() => _edit(record)} >编辑</Button>
               <Button type="primary" size="small" onClick={() => _delete(record)}>删除</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">条码</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('barcode', e.target.value)} />
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
                    {(col.type === 'images') 
                        && <div className="pm-edit__images">
                            {Array.isArray(editInfo[col.dataIndex]) && editInfo[col.dataIndex].map(img => <img className="pm-edit__image" alt="edit" src={img} />)}
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