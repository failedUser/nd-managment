import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message } from 'antd';
import data from './data';


let editConfig = [
    { title: '条码', dataIndex: 'name1' },
    { title: '材质', dataIndex: 'name11'},
    { title: '款号', dataIndex: 'name2'},
    { title: '厚度', dataIndex: 'name12'},
    { title: '商品名称', dataIndex: 'name3' },
    { title: '弹力', dataIndex: 'name13'},
    { title: '性别', dataIndex: 'name14'},
    { title: '分类', dataIndex: 'name15'},
    { title: '成分', dataIndex: 'name16'},
    { title: '工艺', dataIndex: 'name6'},
    { title: '款式', dataIndex: 'name17'},
    { title: '零售价', dataIndex: 'name4',},
    { title: '版型', dataIndex: 'name18'},
    { title: '置顶顺序', dataIndex: 'name7'},
    { title: '颜色', dataIndex: 'name19'},
    { title: '启用', dataIndex: 'name8', type: ""},
    { title: '图片', dataIndex: 'name9', type:"images"},
    { title: '尺码', dataIndex: 'name20'},
    { title: '详情页', dataIndex: 'name10', type:"images"},
    
]

export default function ProductManager() {
    const [ visible, setVisible ] = useState(false);
    const [ editInfo, setEditInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ search, setSearch ] = useState({});

    const updateSearch = useCallback((key, value) => {
        setSearch(search => {
            search[key] = value;
            return {...search}
        });
    })

    const startSearch = useCallback(() => {
        if (!search.code) {
            message.info('请先输入条码');
            return ;
        }
        console.log('----开始筛选----', search);
    }, [search])

    const _delete = useCallback((item) => {
        console.log('----开始删除----', item);
    }, [])

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
    const _edit = useCallback((item) => {
        setVisible(true);
        setEditInfo({...item});
    }, []);

    const updateEditInfo = useCallback((key, value) => {
        console.log(key, value)
        setEditInfo(info => {
            info[key] = value;
            return {...info};
        })
    }, [])

    const [ columns ] = useState([
        { title: '条码', dataIndex: 'name1', render: text => <span style={{color: '#1890ff'}}>{text}</span> },
            { title: '款号', dataIndex: 'name2', key: 'name1',},
            { title: '商品名称', dataIndex: 'name3', key: 'name1',},
            { title: '零售价', dataIndex: 'name4',width: 100, key: 'name1',},
            { title: '状态', dataIndex: 'name5', key: 'name1',},
            { title: '工艺', dataIndex: 'name6', key: 'name1',},
            { title: '排序', dataIndex: 'name7', width: 80, key: 'name1',},
            { title: '显示', dataIndex: 'name8', width: 80, key: 'name1',},
            { title: '图片', dataIndex: 'name9', width: 220, render: item => <div className="product-table-images">
                {Array.isArray(item) && item.map(_img => <img className="product-table-image" alt="img" src={_img} />)}
            </div>},
            { title: '详情页', dataIndex: 'name10', width: 220,render: item => <div className="product-table-images">
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
            <Button type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(','));
                      }
                }}
                dataSource={data} 
                columns={columns} 
            />
        </section>
        {editInfo && <Modal
                title="商品编辑"
                visible={visible}
                width={1000}
                onOk={() => {}}
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