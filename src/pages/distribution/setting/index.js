import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestOrderList, requestRewardConfigExport } from './action';
const { RangePicker } = DatePicker;

export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ dataSource, updateSource ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ editable, setEditable ] = useState(false);

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        requestRewardConfigExport(chooseItems);
    }, [chooseItems])

    const pageData = useCallback(() => {
        requestOrderList().then(data => {
            updateSource(source => {
                return [...source || [], ...data.content]
            })
        })
    }, [])

    const submit = useCallback(() => {
        console.log('提交了')
    }, [])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const [ columns ] = useState([
            { title: '设置编号', dataIndex: 'customerame'},
            { title: '设置时间', dataIndex: 'customerPhone'},
            { title: '设置内容', dataIndex: 'payment_Time'},
            { title: '设置方式', dataIndex: 'name5'},
            { title: '设置人', dataIndex: 'volume_Name'},
            { title: '设置参数', dataIndex: 'shipment_Id'}
    ])
   
    return <div className="product-manager">
        <section className="product-manager-operation">
            <Button onClick={export_data} type="primary">数据导出</Button>
        </section>
        <section >
            <div className="manager-table__title">
                <span>金额设置</span>       
            </div>
            <div className="setting-content">
                <div className="setting-content-row">
                    <div className="setting-content-item">奖励方式</div>
                    {/* <div className="setting-content-item">设置时间</div> */}
                    <div className="setting-content-item">设置参数</div>
                    {/* <div className="setting-content-item">设置人</div> */}
                </div>
                <div className="setting-content-row">
                    <div className="setting-content-item">金额设置</div>
                    {
                     editable
                     ? <React.Fragment>
                         <div className="setting-content-item"><Input placeholder="请设置参数" /></div>
                        
                     </React.Fragment>
                     : <React.Fragment>
                        <div className="setting-content-item">10</div>
                     </React.Fragment>
                    }

                </div>
                <div className="setting-content-row">
                    <div className="setting-content-item">比例设置</div>
                    {
                     editable
                     ? <React.Fragment>
                          <div className="setting-content-item"><Input placeholder="请设置参数" /></div>
                     </React.Fragment>
                     : <React.Fragment>
                        <div className="setting-content-item">10</div>
                     </React.Fragment>
                    }
                </div>
            </div>
            <div className="setting-content-buttons">
            {
                editable
                ? <React.Fragment>
                    <Button onClick={() => setEditable(false)} type="primary">取消修改</Button>
                    <Button onClick={submit} type="primary">保存</Button>
                </React.Fragment>
                : <Button onClick={() => setEditable(true)} type="primary">修改</Button>
            }
            </div>
        
        </section>
        <section className="product-manager-table">
            <div className="manager-table__title">设置记录</div>
            <Table 
                rowKey="order_Id"
                dataSource={dataSource} 
                columns={columns} 
            />
        </section>
    </div>
}