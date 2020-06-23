import React from 'react';
import './index.less';
import {  useRouteMatch } from 'react-router-dom';
import { Button } from 'antd';

export default function ProductManager() {
   
    return <div className="product-manager">
        <section className="product-manager-search"></section>
        <section className="product-manager-operation">
            <Button type="primary">批量导入</Button>
            <Button type="primary">批量删除</Button>
            <Button type="primary">删除</Button>
            <Button type="primary">新增</Button>
        </section>
        
        ProductManager home</div>
}