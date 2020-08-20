import React, {useState, useEffect} from 'react';
import './login.less';
import { Input, Button } from 'antd';


export default function Login () {
    const [ userName, setUseName ] = useState('');
    const [ _password, _setPassword ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        if (password.length === _password.length) {
            return ;
        }
        if (!password && _password) {
            _setPassword('');
        } else {
            _setPassword(new Array(password.length).fill('*').join(''));
        }
    }, [_password, password])

    return <div className="new-dream-login">
        <div className="login-content">
            <div className="login-content-input">
                <div className="content-input__label">用户名</div>
                <Input value={userName} onChange={e => {
                    setUseName(e.target.value);
                }} placeholder="用户名" className="content-input__input" />
            </div>
            <div className="login-content-input">
                <div className="content-input__label">密码</div>
                <Input value={_password} onChange={e => {
                    setPassword(e.target.value);
                }} placeholder="密码" className="content-input__input" />
            </div>
            <Button type="primary" >登陆</Button>
        </div>
    </div>

}