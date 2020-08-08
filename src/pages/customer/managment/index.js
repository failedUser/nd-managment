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
    const showOrderVoucher = useCallback((item) => {
        setVisible(true);
        setModalInfo({...item});
    }, []);

    const pageData = useCallback(() => {
        requestOrderList().then(data => {
            updateSource(source => {
                return [...source || [], ...data.content]
            })
        })
    }, [])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
            { title: '微信ID', dataIndex: 'customer_Wechat_Id'},
            { title: '微信昵称', dataIndex: 'customerPhone'},
            { title: '客户姓名', dataIndex: 'name'},
            { title: '手机号', dataIndex: 'phone',},
            { title: '性别', dataIndex: 'volume_Name'},
            { title: '购买次数', dataIndex: 'purchase_Count'},
            { title: '累计消费', dataIndex: 'total_Consumption'},
            { title: '高校', dataIndex: 'gender'},
            { title: '校区', dataIndex: 'college'},
            { title: '操作', dataIndex: 'name11', render: (item, record) => <div className="product-table-operations">
               <Button type="primary" size="small" >删除</Button>
            </div>},
        ])
   
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入客户名称" onChange={e => updateSearch('customerame', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">手机号</div>
                <Input size="small" placeholder="请输入手机号" onChange={e => updateSearch('customerPhone', e.target.value)} />
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