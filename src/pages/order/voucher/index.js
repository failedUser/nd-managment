import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import data from './data';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
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


    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        console.log('----开始批量导出-----', chooseItems)
    }, [chooseItems])
    const showOrderVoucher = useCallback((item) => {
        setVisible(true);
        setModalInfo({...item});
    }, []);

    const [ columns ] = useState([
        { title: '订单号', dataIndex: 'name1', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            { title: '客户名称', dataIndex: 'name2', key: 'name1',},
            { title: '客户电话', dataIndex: 'name3', key: 'name1',},
            { title: '付款时间', dataIndex: 'name4',width: 100, key: 'name1',},
            { title: '收款金额', dataIndex: 'name5', key: 'name1',},
            { title: '量体师', dataIndex: 'name6', key: 'name1',},
            { title: '物流单号', dataIndex: 'name7', width: 80, key: 'name1',},
            { title: '备注', dataIndex: 'name8', width: 80, key: 'name1',},
            { title: '状态', dataIndex: 'name5', width: 220},
            { title: '分销人手机号', dataIndex: 'name5', width: 220},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" >备货</Button>
               <Button type="primary" size="small" >撤销</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">订单号</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('name1', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('name2', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('name3', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">状态</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('name5', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">时间范围</div>
                <RangePicker onChange={(date, dateString) => {
                    console.log(date, dateString)
                }} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={startSearch} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                      }
                }}
                dataSource={data} 
                columns={columns} 
            />
        </section>
        {modalInfo && <Modal
                title="商品编辑"
                visible={visible}
                width={1000}
                onOk={() => {}}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {columns.map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>
                </div>)}
                </div>
            </Modal>}
        
        </div>
}