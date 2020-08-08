import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestOrderList, requestOrderDetail } from './action';
const { RangePicker } = DatePicker;

export default function OrderVoucher() {
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
        requestOrderDetail({orderId:item.order_Id}).then(data => {
            console.log(data)
            setVisible(true);
            setModalInfo({...item});
        })
        
    }, []);

    const pageData = useCallback(() => {
        requestOrderList(pageInfo).then(data => {
            setTableSize(data.totalElements);
            updateSource(data.content)
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
        { title: '订单号', dataIndex: 'order_Id', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            { title: '客户名称', dataIndex: 'customerame'},
            { title: '客户电话', dataIndex: 'customerPhone'},
            { title: '付款时间', dataIndex: 'payment_Time',width: 100},
            { title: '收款金额', dataIndex: 'name5', key: 'name1',},
            { title: '量体师', dataIndex: 'volume_Name'},
            { title: '物流单号', dataIndex: 'shipment_Id', width: 80},
            { title: '备注', dataIndex: 'remarks', width: 80 },
            { title: '状态', dataIndex: 'order_Status', width: 220},
            { title: '分销人手机号', dataIndex: 'receiver_Phone', width: 220},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" >备货</Button>
               <Button type="primary" size="small" >撤销</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">订单号</div>
                <Input size="small" placeholder="请输入订单号" onChange={e => updateSearch('order_Id', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入客户名称" onChange={e => updateSearch('customerame', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入电话" onChange={e => updateSearch('customerPhone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">状态</div>
                <Input size="small" placeholder="请选择状态" onChange={e => updateSearch('order_Status', e.target.value)} />
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
                    current: pageInfo.page,
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