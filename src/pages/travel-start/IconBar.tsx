import { View, Text, Button } from '@tarojs/components'
import Taro, {
  usePageScroll,
  PageScrollObject,
  switchTab,
  useShareAppMessage
} from '@tarojs/taro'
import { FC, useMemo, useState } from 'react'
import { throttle } from 'lodash'
import './index.scss'

const IconBar: FC = () => {
  const [opacity, setOpacity] = useState(0)

  // 获取系统信息
  const systemInfo = Taro.getSystemInfoSync()
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect()
  const navBarHeight =
    menuButtonInfo.top +
    menuButtonInfo.height +
    (menuButtonInfo.top - (systemInfo.statusBarHeight || 0))

  // 页面分享
  useShareAppMessage(() => {
    return {
      title: '看看我这次的旅行吧！',
      path: '/pages/detail/detail',
      imageUrl: '/assets/share-cover.png'
    }
  })

  // 滚动透明度
  const scrollSetOpacity = useMemo(
    () =>
      throttle((e: PageScrollObject) => {
        const newOpacity = Math.min(1, Math.max(0, (e.scrollTop * 2) / navBarHeight))
        setOpacity(newOpacity)
      }, 30),
    [navBarHeight]
  )

  usePageScroll(scrollSetOpacity)

  // 返回主页
  const handleBack = () => {
    switchTab({
      url: '/pages/index/index'
    })
  }

  return (
    <View
      className='iconbar-wrapper'
      style={{
        height: `${navBarHeight}px`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`
      }}
    >
      <View
        className='iconbar-inner'
        style={{
          top: `${menuButtonInfo.top}px`,
          padding: `0 ${menuButtonInfo.left}px`
        }}
      >
        {/* 左边返回按钮 */}
        <View className='iconbar-left' onClick={handleBack}>
          <Text className='iconbar-icon'>&lt;</Text>
        </View>

        {/* 中间标题 */}
        <View 
          className='iconbar-title'
          style={{
            flexGrow: 1,     // 让标题撑满剩余空间
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
            padding: '0 10px',  // 给标题左右加点内边距防止紧贴按钮
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Text>游记详情</Text>
        </View>
        {/* 右边分享按钮 */}
        <View className='iconbar-right'>
          <Button open-type='share' className='iconbar-share-btn'>
            🔗
          </Button>
        </View>
      </View>
    </View>
  )
}

export default IconBar
