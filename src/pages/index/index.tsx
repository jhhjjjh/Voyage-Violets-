import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import './index.scss'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}
