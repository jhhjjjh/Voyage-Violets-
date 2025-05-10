import React, { useState } from 'react';
import Taro from '@tarojs/taro'
import {
    Input,
    Button,
    Toast,

} from '@nutui/nutui-react';
import { Eye, Marshalling, Ask } from '@nutui/icons-react';
import '@nutui/nutui-react/dist/style.css';
import './login.scss'; // 自定义样式
import { authService } from '../../services/authService'; // 导入服务层
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [inputType, setInputType] = useState('password');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 阻止表单默认提交行为
        setLoading(true);

        try {
            const response = await authService.login(username, password);

            if (response.success) {
                // 存储Token和用户信息
                localStorage.setItem('authToken', response.token ? response.token : '');
                localStorage.setItem('userInfo', JSON.stringify(response.userInfo));

                Toast.show('登录成功');
                Taro.navigateTo({ url: 'pages/audit/index' })
            } else {
                Toast.show(response.message || '登录失败');
            }
        } catch (error) {
            Toast.show('网络错误，请稍后重试');
            console.error('登录错误:', error);
        } finally {
            setLoading(false);
        }
    };

    // 这里可以添加实际的登录逻辑，如调用 API
    return (
        <div className='login'>
            <div className="title" >
                <h3 style={{ color: 'black', fontSize: '1rem' }}>Voyage Violets 在线审核系统</h3>
            </div>
            <div className='login-container'>
                <form onSubmit={handleSubmit}>
                    <div className='login-content'>
                        <div style={{ fontSize: '0.4rem', width: '4vw' }} >用户名</div>
                        <Input
                            placeholder='请输入用户名'
                            value={username}
                            onChange={(username) => setUsername(username)}
                        >
                        </Input>

                    </div>
                    <div
                        className='login-content'
                        style={{
                            marginTop: '25px',
                        }}
                    >

                        <div style={{ fontSize: '0.4rem', width: '4vw' }} >密 码</div>
                        <Input
                            style={{
                            }}
                            type={inputType}
                            placeholder="请输入密码"
                            value={password}
                            onChange={(password) => setPassword(password)}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                height: '100%' // 与输入框同高
                            }}
                            onClick={() => setInputType(inputType === 'text' ? 'password' : 'text')}
                        >
                            {inputType === 'text' ? (
                                <Eye color="black" style={{ verticalAlign: 'middle' }} />
                            ) : (
                                <Marshalling color="black" style={{ verticalAlign: 'middle' }} />
                            )}
                        </div>
                    </div>
                    <div
                        className='login-button'

                    >
                        <Button
                            type='primary'
                            style={{ width: '20vw', marginTop: '40px' }}
                            nativeType="submit">
                            登录
                        </Button>
                        <a style={{
                            marginTop: '20px', fontSize: '0.35rem', display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Ask style={{ marginRight: '3px' }} />
                            <p>登录失败? 联系管理员</p>
                        </a>
                    </div >
                </form>
            </div>

        </div>);
}
