import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestEvaluateList } from './action';
const { RangePicker } = DatePicker;

export default function OrderEvaluate() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 0,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
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

    const pageData = useCallback(() => {
        requestEvaluateList(pageInfo).then(data => {
            setTableSize(data.totalElements);
            updateSource(data.content);
        })
    }, [pageInfo])


    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])
    
    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
        { title: '评价商品', dataIndex: 'name', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
        { title: '商品条码', dataIndex: 'productMain'},
        { title: '评价时间', dataIndex: 'evaluation_Time'},
        { title: '客户', dataIndex: 'customerName',width: 100},
        { title: '评价选项1', dataIndex: 'name5', key: 'name1',},
        { title: '评价选项2', dataIndex: 'volume_Name'},
        { title: '评价选项3', dataIndex: 'shipment_Id',},
        { title: '评价选项4', dataIndex: 'remarks' },
        { title: '评价选项5', dataIndex: 'order_Status'},
        { title: '评价内容', dataIndex: 'evaluation_Content'},
        { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
           <Button type="primary" size="small" >订单</Button>
           <Button type="primary" size="small" >删除</Button>
        </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">商品名称</div>
                <Input size="small" placeholder="请输入商品名称" onChange={e => updateSearch('customerame', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">时间范围</div>
                <RangePicker onChange={(date, dateString) => {
                    updateSearch('order_Status', dateString.join('-'));
                }} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={startSearch} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
        </section>
        <section className="product-manager-table">
            <Table 
                rowKey="order_Id"
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        setChooseItems((selectedRowKeys + '').split(',').filter(item => item));
                      }
                }}
                dataSource={dataSource} 
                columns={columns} 
                pagination={{
                    current: pageInfo.page+1,
                    total: tableSize,
                    onChange: onPageChange
                }}
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