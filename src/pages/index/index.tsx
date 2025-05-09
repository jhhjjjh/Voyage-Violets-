import { View, Text, Image } from '@tarojs/components'
import { useLoad, showToast, navigateTo, chooseImage } from '@tarojs/taro'
import { Button, Input, Cell } from '@nutui/nutui-react-taro'
import { useState } from 'react'
import './index.scss'


const handleNavigate = () => {
  navigateTo({
    url: '/pages/travel-list/travel-list'
  })
}

// 模拟用户数据存储
let mockUsers = [
  { username: 'admin', password: '123456', nickname: '管理员', avatar: 'https://nutui.jd.com/avatar/1.jpg' }
]

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState('https://nutui.jd.com/avatar/default.jpg')
  const [nicknameAvailable, setNicknameAvailable] = useState(true)

  useLoad(() => {
    console.log('Page loaded.')
  })

  const checkNickname = () => {
    if (!nickname) {
      setNicknameAvailable(false)
      return
    }

    const isAvailable = !mockUsers.some(user => user.nickname === nickname)
    setNicknameAvailable(isAvailable)

    if (!isAvailable) {
      showToast({
        title: '该昵称已被使用',
        icon: 'none'
      })
    }
  }

  const chooseAvatar = async () => {
    try {
      const res = await chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera']
      })

      if (res.tempFilePaths.length > 0) {
        setAvatar(res.tempFilePaths[0])
        showToast({ title: '头像已选择', icon: 'success' })
      }
    } catch (err) {
      showToast({ title: '选择图片失败', icon: 'none' })
    }
  }

  const handleSubmit = () => {
    if (!username || !password) {
      showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      })
      return
    }

    if (!isLoginMode && !nickname) {
      showToast({
        title: '请输入昵称',
        icon: 'none'
      })
      return
    }

    if (isLoginMode) {
      // 登录逻辑
      const user = mockUsers.find(u => u.username === username && u.password === password)
      if (user) {
        showToast({
          title: '登录成功',
          icon: 'success',
          success: () => {
            navigateTo({ url: '/pages/home/index' })
          }
        })
      } else {
        showToast({
          title: '用户名或密码错误',
          icon: 'none'
        })
      }
    } else {
      // 注册逻辑
      mockUsers.push({
        username,
        password,
        nickname,
        avatar
      })
      showToast({
        title: '注册成功',
        icon: 'success',
        success: () => {
          setIsLoginMode(true)
          setUsername('')
          setPassword('')
        }
      })
    }
  }

  return (
    <View className='auth-container'>
      <View className='header'>
        <Text className='title'>{isLoginMode ? '用户登录' : '用户注册'}</Text>
        <Text
          className='switch-mode'
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? '没有账号？去注册' : '已有账号？去登录'}
        </Text>
      </View>

      {!isLoginMode && (
        <View className='avatar-section'>
          <View className='avatar-container' onClick={chooseAvatar}>
            <Image src={avatar} className='avatar' />
            <Text className='upload-hint'>点击上传头像</Text>
          </View>
          <Text className='avatar-tip'>未上传将使用默认头像</Text>
        </View>
      )}

      <View className='form'>
        <Cell>
          <Input
            placeholder='请输入用户名'
            value={username}
            onChange={(val) => setUsername(val)}
            className='input-field'
          />
        </Cell>

        <Cell>
          <Input
            type='password'
            placeholder='请输入密码'
            value={password}
            onChange={(val) => setPassword(val)}
            className='input-field'
          />
        </Cell>

        {!isLoginMode && (
          <Cell>
            <Input
              placeholder='请输入昵称（用于显示）'
              value={nickname}
              onChange={(val) => {
                setNickname(val)
                setNicknameAvailable(true)
              }}
              onBlur={checkNickname}
              className='input-field'
            />
            {!nicknameAvailable && (
              <Text className='error-tip'>该昵称已被使用，请换一个</Text>
            )}
          </Cell>
        )}

        <Button
          type='primary'
          className='submit-btn'
          onClick={handleSubmit}
        >
          {isLoginMode ? '立即登录' : '注册账号'}
        </Button>
        <Button onClick={handleNavigate} type="primary">
          跳转到list页面
        </Button>
      </View>
    </View>
  )
}
