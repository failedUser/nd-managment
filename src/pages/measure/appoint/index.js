import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestAppointList, requestForAppointCreate, requestForAppointEdit } from './action';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10,
        name: '',
        phone: '',
        college: ''
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ visible, setVisible ] = useState(false);
    const [ modalInfo, setModalInfo ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);

    const updateSearch = useCallback((key, value) => {
        updatePageInfo(search => {
            search[key] = value;
            return {...search}
        });
    }, [])

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        console.log('----开始批量导出-----', chooseItems)
    }, [chooseItems])



    const edit = useCallback((item) => {
        setVisible('edit');
        setModalInfo({...item});
    }, []);

    const create = useCallback(() => {
        setVisible('create');
        setModalInfo({});
    }, []);

    const updateModalInfo = useCallback((key, value) => {
        setModalInfo(info => ({...info, ...{[key]: value}}));
    }, [])

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestAppointList(_pageInfo).then(data => {
            setTableSize(data.totalElements)
            updateSource(data.content)
        })
    }, [pageInfo])

    const submit = useCallback(() => {
        if (visible === 'create') {
            requestForAppointCreate(modalInfo).then(res => {
                message.info('新建成功');
                setVisible(false);
                pageData()
            })
        }
        if (visible === 'edit') {
            requestForAppointEdit(modalInfo).then(res => {
                message.info('修改成功');
                setVisible(false);
                pageData()
            })
        }
        
    }, [modalInfo, pageData, visible])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    const updateStatus = useCallback((item) => {
        requestForAppointEdit(item).then(res => {
            message.info('修改成功');
            setVisible(false);
            pageData()
        })
    }, [pageData])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])
     // TODO 修改有问题
    const [ columns ] = useState([
            { title: '客户名称', dataIndex: 'name'},
            { title: '客户电话', dataIndex: 'phone'},
            { title: '性别', dataIndex: 'gender'},
            { title: '订单号', dataIndex: 'volume_Id'}, // TODO: 订单号字段是不是这个
            { title: '预约时间', dataIndex: 'time'}, // TODO 预约时间和量体时间只有一个time字段
            { title: '量体地点', dataIndex: 'adress'},
            { title: '量体时间', dataIndex: 'shipment_Id'},
            { title: '量体师', dataIndex: 'volumer_Name'},
            { title: '完成情况', dataIndex: 'reservation_Status'}, 
            { title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
                <Button onClick={() => {
                    let _record = {...record};
                    _record.reservation_Status = '派单'
                    updateStatus(_record);
                }} type="primary" size="small" >派单</Button>
                
               <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
               <Button onClick={() => {
                    let _record = {...record};
                    _record.reservation_Status = '取消'
                    updateStatus(_record);
                }}  type="primary" size="small" >取消</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('name', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('phone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">量体地点</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('address', e.target.value)} />
            </div>

            <div className="manager-search-item">
                <div className="search-item__title">量体时间</div>
                <RangePicker onChange={(date, dateString) => {
                    updateSearch('startTime', dateString[0]);
                    updateSearch('endTime', dateString[1]);
                }} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={pageData} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
            {/* <Button onClick={create} type="primary">新增</Button> */}
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
                onOk={submit}
                onCancel={() => setVisible(false)}
            >
                <div className="pm-edit-container">
                {columns.map(col => <div className="pm-edit-item">
                    <span className="edit-item__title">{col.title}</span>
                    <Input value={modalInfo[col.dataIndex]} onChange={e => updateModalInfo(col.dataIndex, e.target.value)} />
                </div>)}
                </div>
            </Modal>}
        
        </div>
}