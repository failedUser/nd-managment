import React, {useEffect, useState, useCallback} from 'react';
import './index.less';
import { Button, Table, Modal, Input, Upload, message, DatePicker } from 'antd';
import { requestBonusSettingList } from './action';
const { RangePicker } = DatePicker;

// TODO 这里交互有点问题，要改的话2个应该都可以同时改，但是数据怎么会有2条
export default function ProductManager() {
    const [ isInit, setIsinit ] = useState(false);
    const [ pageInfo, updatePageInfo ] = useState({
        page: 1,
        size: 10
    })
    const [ tableSize, setTableSize ] = useState(0);
    const [ dataSource, updateSource ] = useState(null);
    const [ chooseItems, setChooseItems ] = useState(null);
    const [ editable, setEditable ] = useState(false);

    const export_data = useCallback(() => {
        if (!chooseItems || chooseItems.length <= 0) {
            message.info('请先选择商品, 再导出数据');
            return ;
        }
        console.log('----开始批量导出-----', chooseItems)
    }, [chooseItems])

    const pageData = useCallback(() => {
        let _pageInfo = {...pageInfo};
        _pageInfo.page -= 1;
        requestBonusSettingList(pageInfo).then(data => {
            setTableSize(data.totalElements)
            updateSource(data.content);
        })
    }, [pageInfo])

    const submit = useCallback(() => {
        console.log('提交了')
    }, [])

    useEffect(() => {
        if (isInit) return;
        pageData();
        setIsinit(true);
    }, [isInit, pageData])

    const onPageChange = useCallback((page) => {
        if (page !== pageInfo.page) {
            pageInfo.page = page;
            updatePageInfo({...pageInfo});
            pageData();
        }
    }, [pageData, pageInfo])

    const [ columns ] = useState([
            { title: '设置编号', dataIndex: 'volumer_Reward_Setting_Id'},
            { title: '设置时间', dataIndex: 'reward_Setting_Time'},
            { title: '设置内容', dataIndex: 'reward_Price'},
            { title: '设置方式', dataIndex: 'name5'},
            { title: '设置人', dataIndex: 'reward_Setting_Person'},
            { title: '设置参数', dataIndex: 'reward_Percentage'}
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
                         <div className="setting-content-item"><Input placeholder="请设置参数" addonAfter="元" /></div>
                        
                     </React.Fragment>
                     : <React.Fragment>
                        <div className="setting-content-item">10 元</div>
                     </React.Fragment>
                    }

                </div>
                <div className="setting-content-row">
                    <div className="setting-content-item">比例设置</div>
                    {
                     editable
                     ? <React.Fragment>
                          <div className="setting-content-item"><Input placeholder="请设置参数" addonAfter="%" /></div>
                     </React.Fragment>
                     : <React.Fragment>
                        <div className="setting-content-item">10 %</div>
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
                pagination={{
                    current: pageInfo.page,
                    total: tableSize,
                    onChange: onPageChange
                }}
            />
        </section>
    </div>
}