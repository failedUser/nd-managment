import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestCustomeVolumeList } from './action';
import VolumeModal from '../../../components/volumeModal'
const { RangePicker } = DatePicker;

export default function ProductManager() {
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

    const edit = useCallback((record) => {
        console.log('--edit--', record);
        setVisible(true);
        setModalInfo({...record});
    }, [])

    const modalSubmit = useCallback((newInfo) => {
        console.log('---modalSubmit---', modalSubmit);
        setVisible(false);
    }, [])

    const showOrderVoucher = useCallback((item) => {
        setVisible(true);
        setModalInfo({...item});
    }, []);

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestCustomeVolumeList(_pageInfo).then(data => {
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
            // TODO 缺少客户姓名
            { title: '姓名', dataIndex: 'order_Id', render: (text, record) => <span onClick={() => showOrderVoucher(record)} style={{color: '#1890ff'}}>{text}</span> },
            // TODO 这个电话是客户电话 不是量体师电话
            { title: '电话', dataIndex: 'volumer_Phone'},
            { title: '量体师', dataIndex: 'volumer_Name'},
            { title: '量体时间', dataIndex: 'admission_Time'},
            { title: '性别', dataIndex: 'volumer_Address', key: 'name1',},
            { title: '身高', dataIndex: 'volumer_Birth'},
            { title: '体重', dataIndex: 'volumer_College'},
            { title: '胸围', dataIndex: 'volumer_Department'},
            { title: '中腰', dataIndex: 'volumer_Gender'},
            { title: '肩宽', dataIndex: 'volumer_Id'},
            { title: '袖长', dataIndex: 'volumer_Major'},
            { title: '腰围', dataIndex: 'volumer_Name'},
            { title: '臀围', dataIndex: 'volumer_Phone'},
            { title: '裤长', dataIndex: 'volumer_Part'},
            { title: '操作', dataIndex: 'name11', width: 150, render: (item, record) => <div className="product-table-operations">
               <Button type="primary" onClick={() => edit(record)} size="small" >修改</Button>
               <Button type="primary" size="small" >删除</Button>
            </div>},
        ])
    return <div className="product-manager">
        <section className="product-manager-search">
            <div className="manager-search-item">
                <div className="search-item__title">客户名称</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('customerame', e.target.value)} />
            </div>
            <div className="manager-search-item">
                <div className="search-item__title">电话</div>
                <Input size="small" placeholder="请输入要筛选的条码" onChange={e => updateSearch('customerPhone', e.target.value)} />
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
        <VolumeModal 
            showModal={visible}
            info={modalInfo}
            submit={modalSubmit}
            cancel={() => setVisible(false)}
        />
        {/* {modalInfo && <Modal
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
            </Modal>} */}
        
        </div>
}