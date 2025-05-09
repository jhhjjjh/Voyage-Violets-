import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad, showToast, navigateTo, useDidShow } from '@tarojs/taro'
import { Button, Cell, Tag, Dialog, Toast } from '@nutui/nutui-react-taro'
import { useState, useEffect } from 'react'
import './travel-list.scss'

// 模拟游记数据
let mockTravels = [
  {
    id: 1,
    title: '杭州西湖一日游',
    cover: 'https://q3.itc.cn/images01/20240827/ee5d6bf240e943659cc113450c3a7f3e.jpeg',
    status: 'approved', // 'pending', 'approved', 'rejected'
    rejectReason: '',
    content: '西湖美景三月天...',
    createTime: '2023-05-10',
    updateTime: '2023-05-10'
  },
  {
    id: 1,
    title: '北京故宫游记',
    cover: 'https://img2.baidu.com/it/u=1241031426,3128424632&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1067',
    status: 'pending',
    rejectReason: '',
    content: '紫禁城的宏伟...',
    createTime: '2023-05-15',
    updateTime: '2023-05-15'
  },
  {
    id: 1,
    title: '三亚海滩度假',
    cover: 'https://img2.baidu.com/it/u=1148647961,400191113&fm=253&fmt=auto?w=500&h=653',
    status: 'rejected',
    rejectReason: '图片不符合规范',
    content: '阳光沙滩...',
    createTime: '2023-05-18',
    updateTime: '2023-05-20'
  }
]

export default function TravelList() {
  const [travelList, setTravelList] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useLoad(() => {
    // 模拟从本地存储获取当前用户
    const user = { id: 1, username: 'admin', nickname: '管理员' }
    setCurrentUser(user)
    loadTravels(user.id)
  })

  useDidShow(() => {
    // 每次页面显示时刷新数据
    if (currentUser) {
      loadTravels(currentUser.id)
    }
  })

  const loadTravels = (id) => {
    // 模拟API请求，实际项目中替换为真实API调用
    setTimeout(() => {
      // 模拟只获取当前用户的游记
      const userTravels = mockTravels.filter(t => t.id === id)
      setTravelList(userTravels || [])
    }, 500)
  }

  const handleEdit = (travel) => {
    if (travel.status === 'approved') {
      Taro.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      }).then(r => {})
      return
    }
    navigateTo({
      url: `/pages/travel-edit/index?id=${travel.id}`
    })
  }

  const handleDelete = (travel) => {
    Dialog({
      content: `确定要删除游记《${travel.title}》吗？`,
      onConfirm: () => {
        // 模拟删除操作
        mockTravels = mockTravels.filter(t => t.id !== travel.id)
        setTravelList(travelList.filter(t => t.id !== travel.id))
        Taro.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        }).then(r => {})

      },
      title: '确认删除'
    })
  }

  const handleCreate = () => {
    navigateTo({
      url: '/pages/travel-edit/index'
    })
  }

  const getStatusTag = (status) => {
    const statusMap = {
      pending: { text: '待审核', color: 'warning' },
      approved: { text: '已通过', color: 'success' },
      rejected: { text: '未通过', color: 'danger' }
    }
    return (
      <Tag type={statusMap[status].color} plain>
        {statusMap[status].text}
      </Tag>
    )
  }

  return (
    <View className='travel-container'>
      <View className='header'>
        <Text className='title'>我的游记</Text>
        <Button
          type='primary'
          size='small'
          onClick={handleCreate}
        >
          发布游记
        </Button>
      </View>

      {travelList.length === 0 ? (
        <View className='empty-tip'>
          <Text>暂无游记，快去发布你的第一篇游记吧~</Text>
        </View>
      ) : (
        <View className='travel-list'>
          {travelList.map(travel => (
            <View key={travel.id} className='travel-item'>
              <Image src={travel.cover} className='cover' />
              <View className='content'>
                <View className='title-line'>
                  <Text className='title'>{travel.title}</Text>
                  {getStatusTag(travel.status)}
                </View>
                <Text className='time'>{travel.createTime}</Text>

                {travel.status === 'rejected' && (
                  <Text className='reject-reason'>
                    拒绝原因: {travel.rejectReason}
                  </Text>
                )}

                <View className='actions'>
                  {(travel.status === 'pending' || travel.status === 'rejected') && (
                    <Button
                      type='primary'
                      size='small'
                      onClick={() => handleEdit(travel)}
                    >
                      编辑
                    </Button>
                  )}
                  <Button
                    type='danger'
                    size='small'
                    onClick={() => handleDelete(travel)}
                  >
                    删除
                  </Button>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
