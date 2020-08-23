import React from 'react';
import { Upload, Button, Input } from 'antd';
import './index.less';
import { requestHomeConfig, requestHomeSave } from './action';
import { dealOssImageUrl } from '../../../assets/js/common';
const { TextArea } = Input;

export default class ShopHome extends React.Component {
    state = {
        photos: [],
        photosCount: 4,
        noticeCount: 2,
        manCount: 4,
        notice: [],
        editable: '',
        manModules: {},
        womenModules: {}
    }
    componentDidMount() {
        this.PageData();
    }

    PageData = () => {
        requestHomeConfig().then(res => {
            if (res) {
                let photos = res.photos ? JSON.parse(res.photos) : [];
                let notice = res.notice ? JSON.parse(res.notice) : [];
                let manModules= res.manModules ? JSON.parse(res.manModules) : {};
                let womenModules= res.womenModules ? JSON.parse(res.womenModules) : {};
                this.setState({photos,notice, editable: '', womenModules, manModules })
            }

        })
    }

    updateInfo = () => {
        console.log('提交数据');
        let { notice, photos, manModules, womenModules } = this.state;
        requestHomeSave({
            photos: JSON.stringify(photos), 
            notice: JSON.stringify(notice),
            manModules: JSON.stringify(manModules),
            womenModules: JSON.stringify(womenModules)
        }).then(this.PageData)
            
    }

    // EVALUATION("evaluation","评价图片目录"),
    // INDEX("index","首页图片目录"),
    // PRODUCT("product","商品图片目录"),
    // VOLUME("volume","量体数据图片目录"),
    // FABRIC("fabric","面料图片目录");
    render () {
        let { photos, photosCount, notice, noticeCount, editable, manModules } = this.state;
        return <div className="new-dream-home">
            <section className="home-section">
                <div className="home-section__title">顶部滚动图</div>
                <div className="home-photos-content">
                {
                    Array.from({length: photosCount}).map((item,index) => <div className="home-photos-item">
                        <div className="home-photos-image">
                            {
                                photos[index] 
                                ? <img className="photos-image__item" width="100%" alt="photos" src={photos[index]} />
                                : <span>+</span>
                            }
                        </div>
                        <div className="home-photos-btn">
                            <Upload
                                action="/newdreamer/file/upload?FileDirectorEnum=PRODUCT"
                                method="post"
                                data={(file) => {
                                    return {
                                        fileDirectorEnum: 'INDEX',
                                        files: file
                                    }
                                }}
                                onChange={({ file, fileList }) => {
                                    if (file.response) {
                                        let _photos = [...photos];
                                        _photos[index] = dealOssImageUrl(file.response[0]);
                                        this.setState({photos: _photos}, this.updateInfo)
                                    }
                                }}
                            ><Button type="primary">{photos[index] ? '替换' : '上传'}</Button></Upload>
                        </div>
                    </div>)
                }
                </div>
                
            </section>

            <section className="home-section">
                <div className="home-section__title">小喇叭</div>
               {
                   Array.from({length: noticeCount}).map((item, index) =>  <div className="home-section__tip">
                   <TextArea 
                       value={notice[index] || ''} 
                       className="tip-input"
                       placeholder="请输入小喇叭的内容"
                       onChange={e => {
                           let _notice = [...notice];
                           _notice[index] = e.target.value;
                           this.setState({notice: _notice});
;                       }}
                   />
                   <Button onClick={this.updateInfo} type="primary">修改</Button>
               </div>)
               }
            </section>
            <section className="home-section">
                <div className="home-section__title">男士条码</div>
                <div className="section-barcode-setting">
                    <div className="barcode-setting_title">
                        <span>男士西服横栏</span>
                        {
                            editable === 'man-suits'
                            ? <div>
                            <Button onClick={() => {
                                this.updateInfo();
                            }} type="primary">保存</Button>
                            <Button onClick={() => {
                                this.setState({editable: '', manModules: this.state.cacheManModules})
                            }} type="primary">取消</Button>
                            </div>
                            :  <Button onClick={() => {
                                this.setState({editable: 'man-suits', cacheManModules: JSON.parse(JSON.stringify(manModules))})
                            }} type="primary">修改</Button>
                        }

                    </div>
                    <div className="edit-list">
                        {
                            Array.from({length:4}).map((item, index) => <div className="man-row-eidt">
                                {editable === 'man-suits'  // 男西服
                                    ?   <Input 
                                        value={manModules.suits && manModules.suits[index]}
                                        onChange={e => {
                                        let _manModules = {...manModules};
                                        if (!_manModules.suits) {
                                            _manModules.suits = [];
                                        }
                                        _manModules.suits[index] = e.target.value;
                                        this.setState({manModules: _manModules})
                                    }} />
                                            
                                    :   <div>{(manModules.suits && manModules.suits[index]) || `条码${index}`}</div>}
                            </div>)
                        }
                    </div>
                    
                    
                    
                </div>
            </section>
        </div>
    }
}