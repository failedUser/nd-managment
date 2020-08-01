import React, {useState, useEffect, useCallback} from 'react';
import { Modal, Radio, Button, Input } from 'antd';
import './index.less';



const customerInfo = [
    {title: '客户', key: 'customer'},
    {title: '电话', key: 'phone'},
    {title: '量体时间', key: 'time'},
    {title: '量体师', key: 'volumer_Name'},
    {title: '性别', key: 'volumer_Gender'},
    {title: '身高CM', key: 'height'},
    {title: '体重', key: 'weight'},
    {title: '量体地址', key: 'volumer_Address'}
]

const pureSize = [
    {title: '胸围', key: 'customer'},
    {title: '腰围', key: 'phone'},
    {title: '腰节', key: 'time'},
    {title: '臀围', key: 'volumer_Name'},
    {title: '中腰', key: 'volumer_Gender'},
    {title: '裤长', key: 'height'},
    {title: '下摆', key: 'weight'},
    {title: '横档', key: 'volumer_Address'},
    {title: '肩宽', key: 'customer'},
    {title: '中裆', key: 'phone'},
    {title: '袖长', key: 'time'},
    {title: '小腿围', key: 'volumer_Name'},
    {title: '大臂围', key: 'volumer_Gender'},
    {title: '脚口', key: 'height'},
    {title: '小臂围', key: 'weight'},
    {title: '通裆', key: 'volumer_Address'},
    {title: '袖口', key: 'volumer_Address'},
    {title: '前胸', key: 'customer'},
    {title: '衣长', key: 'phone'},
    {title: '后背', key: 'time'},
    {title: '领围', key: 'volumer_Name'},
    {title: '胸高', key: 'volumer_Gender'},
    {title: '备注', key: 'volumer_Gender'},
]


const Figure = [
    {
        title: '肩型',
        children: [
            { title:'溜肩', key: 'name1' },
            { title:'前冲肩', key: 'name1' },
            { title:'耸肩', key: 'name1' },
        ]
    },
    {
        title: '肚型',
        children: [
            { title:'啤酒肚', key: 'name1' },
            { title:'小蛮腰', key: 'name1' },
            { title:'小腹凸', key: 'name1' },
        ]
    },
    {
        title: '胸背部',
        children: [
            { title:'挺胸体', key: 'name1' },
            { title:'后背高', key: 'name1' }
        ]
    },
    {
        title: '臀部',
        children: [
            { title:'翘臀', key: 'name1' },
            { title:'平臀', key: 'name1' }
        ]
    }
]

export default function VolumeModal({ info, editable, submit, cancel, showModal }) {
    const [ _info, updateInnfo ] = useState(info);
    const updateForm = useCallback((key, value) => {
        updateInnfo(obj => ({...obj, ...{[key]: value}}))
    }, [])

    const [ _editable, setEditable ] = useState(editable);

    useEffect(() => {
        if (info) {
            updateInnfo(obj => ({...obj || {}, ...info || {}}))
        }
    }, [info])
    if (!_info) return null;
    return <Modal
        title={`量体数据-${_info.name}`}
        visible={showModal}
        width={1000}
        footer={<div>
            <Button type="primary" onClick={() => setEditable(!_editable)} size="small" >{_editable ? '取消修改' : '修改'}</Button>
            <Button type="primary" onClick={() => submit(_info)} size="small" >保存</Button>
            <Button type="primary" onClick={cancel} size="small" >取消</Button>
        </div>}
    >
        <div className="pm-edit-container">
            <div className="volume-modal-customer">
                {customerInfo.map(cust => <div className="volume-customer-item">
                    <div className="customer-item__title">{cust.title}</div>
                    {
                        _editable 
                        ? <Input 
                            value={_info[cust.key] || ''} 
                            placeholder={`请输入${cust.title}`}
                            onChange={e => updateForm(cust.key, e.target.value)}
                         />
                        : <div className="customer-item__value">{_info[cust.key]}</div>
                    }
                    
                </div>)}
            </div>

            <div className="volume-modal-size">
                <div className="modal-size-container">
                    <div className="modal-size-title">净尺寸</div>
                    <div className="modal-size-content">
                        {pureSize.map(size => <div className="modal-size-item">
                            <div className="size-item__title">{size.title}</div>
                            {
                                _editable
                                ? <Input 
                                    value={_info[size.key] || ''} 
                                    placeholder={`请输入${size.title}`}
                                    onChange={e => updateForm(size.key, e.target.value)}
                                />
                                : <div className="size-item__value">{_info[size.key]}</div>
                            }
                            
                        </div>)}
                        
                    </div>
                </div>


                <div className="modal-size-container modal-size-container--figure">
                    <div className="modal-size-title">体型</div>
                    <div className="modal-size-content">
                        {Figure.map((size) => <div>
                            {
                                size.children.map((child, index) => <React.Fragment>
                                    <div className={`modal-size-item  modal-size-item--${index > 0 ? 'hidden' : ''}`}>
                                        <div className="size-item__title">{size.title || ''}</div>
                                        <div className="size-item__value"> </div>
                                    </div>
                                    <div className="modal-size-item">
                                        <div className="size-item__title">{child.title}</div>
                                        <div className="size-item__value"><Radio 
                                            defaultChecked={_info[child.key]} 
                                            disabled={!_editable}
                                        /></div>
                                    </div>
                                </React.Fragment>)
                            }
                        </div>)}
                    </div>
                </div>

                <div className="modal-figure-images">
                    <div className="figure-images-title">体型图</div>
                    <div className="figure-images-content">
                        <img alt="figure" className="figure-image-item" src="http://static.caibeike.com/i/a69324297309b6b155e93d127c9613b0-55rA4W-bMMMwbMMMhj2" />
                        <img alt="figure" className="figure-image-item" src="http://static.caibeike.com/i/a69324297309b6b155e93d127c9613b0-55rA4W-bMMMwbMMMhj2" />
                        <img alt="figure" className="figure-image-item" src="http://static.caibeike.com/i/a69324297309b6b155e93d127c9613b0-55rA4W-bMMMwbMMMhj2" />
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}