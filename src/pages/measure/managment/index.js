import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestOrderList } from './action';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
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
        requestOrderList().then(data => {
            updateSource(source => {
                return [...source || [], ...data.content]
            })
        })
    }, [])

    const submit = useCallback(() => {
        if (visible === 'create') {
            console.log('---新增--', modalInfo)
        }
        if (visible === 'edit') {
            console.log('---修改--', modalInfo)
        }
        
    }, [modalInfo, visible])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
        { title: '姓名', dataIndex: 'order_Id' },
            { title: '电话', dataIndex: 'customerame'},
            { title: '性别', dataIndex: 'customerPhone'},
            { title: '身份证号', dataIndex: 'payment_Time'},
            { title: '学生证号', dataIndex: 'name5', key: 'name1',},
            { title: '出生年月', dataIndex: 'volume_Name'},
            { title: '所属高校', dataIndex: 'shipment_Id'},
            { title: '校区', dataIndex: 'remarks' },
            { title: '专业', dataIndex: 'order_Status'},
            { title: '状态', dataIndex: 'receiver_Phone'},
            { title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
               <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
               <Button type="primary" size="small" >停用</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入要筛选的客户名称" onChange={e => updateSearch('customerame', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">手机号</div>
                <Input size="small" placeholder="请输入要筛选的手机号" onChange={e => updateSearch('customerPhone', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">所属高校</div>
                <Input size="small" placeholder="请输入要筛选的高校" onChange={e => updateSearch('customerPhone', e.target.value)} />
            </div>
            
            <div className="manager-search-btn"><Button onClick={startSearch} type="primary" >筛选</Button></div>
        </section>
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
            <Button onClick={create} type="primary">新增</Button>
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