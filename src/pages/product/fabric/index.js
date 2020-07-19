import React, {useEffect, useState, useCallback} from 'react';
import { Button, Table, Modal, Input, Upload, message } from 'antd';
import data from '../manager/data';

export default function FabricManager() {
    const [ search, setSearch ] = useState({});
    const [ visible, setVisible ] = useState(false);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ editInfo, setEditInfo ] = useState(null);
    const _delete = useCallback((item) => {
        console.log('去删除', item);
    }, [])

    const _edit = useCallback((item) => {
        setVisible(true);
        setEditInfo({...item});
    }, []);

    const addNew = useCallback((item) => {
        setVisible(true);
        setEditInfo({});
    }, []);

    const updateEditInfo = useCallback((key, value) => {
        setEditInfo(info => {
            info[key] = value;
            return {...info};
        })
    }, [])

    const updateSearch = useCallback((key, value) => {
        setSearch(search => {
            search[key] = value;
            return {...search}
        });
    })

    const startSearch = useCallback(() => {
        if (!search.code) {
            message.info('请先输入面料编号');
            return ;
        }
        console.log('----开始筛选----', search);
    }, [search])
    
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

    const [ columns ] = useState([
        { title: '面料编号', dataIndex: 'name1', render: text => <span style={{color: '#1890ff'}}>{text}</span> },
            { title: '类别', dataIndex: 'name2', key: 'name1',},
            { title: '颜色', dataIndex: 'name3', key: 'name1',},
            { title: '材质', dataIndex: 'name4',width: 200, key: 'name1',},
            { title: '厚度', dataIndex: 'name5', key: 'name1',},
            { title: '弹力', dataIndex: 'name6', key: 'name1',},
            { title: '图片', dataIndex: 'name10', type: "image", width: 120,render: item => <div className="product-table-images">
                <img className="product-table-image" alt="img" src="http://alpha-2115.caibeike.com/i/db23aabcc32b698375babffd50de72c4-cXni3O-bMOMwiAMhj2@!750c445" />
            </div>},
            { title: '操作', dataIndex: 'name11', width: 300, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" onClick={() => _edit(record)} >编辑</Button>
               <Button type="primary" size="small" onClick={() => _delete(record)}>删除</Button>
               <Upload ><Button type="primary" size="small" onClick={() => _edit(record)} >换图</Button></Upload>
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
            <Button onClick={addNew} type="primary">新增</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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