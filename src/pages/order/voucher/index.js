import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestOrderList, requestOrderDetail, requestForOrderExport, requestForOrdrStatusUpdate, requestForOrdrShip } from './action';
import {exportFile} from '../../../assets/js/common';
const { RangePicker } = DatePicker;

export default function OrderVoucher() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(info => {
            info[key] = value;
            return {...info}
        });
    }, [])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }

        requestForOrderExport(chooseItems);
    }, [chooseItems])


    const showOrderVoucher = useCallback((item) => {
        requestOrderDetail({orderId:item.order_Id}).then(data => {
            setVisible(true);
            item.dataSource = data;
            setModalInfo({...item});
        })
        
    }, []);

    const updateOrderStatus = function (record, status) {
        // TODO Required List parameter 'ids' is not presen 
        requestForOrdrStatusUpdate({
            id: record.order_Id,
            status
        }).then(pageData);
    }

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
;        requestOrderList(_pageInfo).then(data => {
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
            { title: '付款时间', dataIndex: 'payment_Time'},
            { title: '收款金额', dataIndex: 'name5', key: 'name1',},
            { title: '量体师', dataIndex: 'volume_Name'},
            { title: '物流单号', dataIndex: 'shipment_Id', width: 80, render: (text, record) => {
                if (!text) {
                    return <Button type="primary" onClick={() => {
                        // 去发货
                        requestForOrdrShip({orderId: record.order_Id}).then(pageData);
                    }} >发货</Button>
                } else {
                    return <span>{text}</span>
                }
            }},
            { title: '备注', dataIndex: 'remarks', width: 80 },
            { title: '状态', dataIndex: 'order_Status', width: 80},
            { title: '分销人手机号', dataIndex: 'receiver_Phone', width: 160},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button onClick={() => {
                   updateOrderStatus(record, '备货中').then(pageData);
               }} type="primary" size="small" >备货</Button>
               <Button onClick={() => {
                   updateOrderStatus(record, '待发货').then(pageData);
               }} type="primary" size="small" >撤销</Button>
            </div>},
        ])
        const [ ModalColumns ] = useState([
            { title: '单品编号', dataIndex: 'item_Id', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
                { title: '商品', dataIndex: 'name'},
                { title: '条码', dataIndex: 'barcode'},
                { title: '颜色', dataIndex: 'style'},
                { title: '尺码', dataIndex: 'size', },
                { title: '数量', dataIndex: 'amounts'},
                { title: '单价', dataIndex: 'retail_Price'},
                { title: '折扣', dataIndex: 'discount'},
                { title: '折后价', dataIndex: 'order_Status'},
                { title: '折后总金额', dataIndex: 'receiver_Phone'},
                { title: '状态', dataIndex: 'item_Status'},
            ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">订单号</div>
                <Input size="small" placeholder="请输入订单号" onChange={e => updateSearch('orderId', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入客户名称" onChange={e => updateSearch('customerName', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入电话" onChange={e => updateSearch('phone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">状态</div>
                <Input size="small" placeholder="请选择状态" onChange={e => updateSearch('status', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">时间范围</div>
                <RangePicker onChange={(date, dateString) => {
                    updateSearch('startTime', dateString[0])
                    updateSearch('endTime', dateString[1])
                }} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
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
                title={`单据信息-${modalInfo.order_Id}-${modalInfo.customerame}`}
                visible={visible}
                width={1000}
                onOk={() => {}}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {columns.map(col => <div className="order-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    <span className="edit-item__value">{modalInfo[col.dataIndex]}</span>
                </div>)}
                <Table 
                rowKey="order_Id"
                dataSource={modalInfo.dataSource} 
                columns={ModalColumns} 
                pagination={false}
            />
                </div>
            </Modal>}
        
        </div>
}