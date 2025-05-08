import { View, Text, ScrollView } from '@tarojs/components'
import { Button, Cell, Tag, SearchBar, Divider, TextArea, Popup } from '@nutui/nutui-react-taro'
import { useState, useEffect } from 'react'
import './audit.scss'

type TravelNoteStatus = 'pending' | 'approved' | 'rejected'
type UserRole = 'admin' | 'auditor'

interface TravelNote {
    id: string
    title: string
    author: string
    status: TravelNoteStatus
    createTime: string
    images: string[]
    rejectReason?: string
}

const AuditPage = () => {
    const [travelNotes, setTravelNotes] = useState<TravelNote[]>([])
    const [loading, setLoading] = useState(false)
    const [filterStatus, setFilterStatus] = useState<TravelNoteStatus | 'all'>('all')
    const [searchText, setSearchText] = useState('')
    const [rejectModalVisible, setRejectModalVisible] = useState(false)
    const [currentNote, setCurrentNote] = useState<TravelNote | null>(null)
    const [rejectReason, setRejectReason] = useState('')
    const [userRole] = useState<UserRole>('admin')
    const [tabIndex, setTabIndex] = useState(0)

    useEffect(() => {
        fetchTravelNotes()
    }, [filterStatus, searchText])

    const fetchTravelNotes = async () => {
        setLoading(true)
        try {
            // 模拟数据
            const mockData: TravelNote[] = [
                {
                    id: '1',
                    title: '无锡三天两晚旅游攻略',
                    author: '小吴要干饭',
                    status: 'pending',
                    createTime: '2023-05-01',
                    images: [],
                },
                // 其他模拟数据...
            ]

            setTravelNotes(mockData.filter(note =>
                (filterStatus === 'all' || note.status === filterStatus) &&
                (searchText === '' || note.title.includes(searchText) || note.author.includes(searchText))
            ))
        } finally {
            setLoading(false)
        }
    }
    type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

    const renderStatusTag = (status: TravelNoteStatus) => {
        const config: Record<TravelNoteStatus, { color: TagType; text: string }> = {
            pending: { color: 'warning', text: '待审核' },
            approved: { color: 'success', text: '已通过' },
            rejected: { color: 'danger', text: '未通过' }
        };
        return <Tag type={config[status].color}>{config[status].text}</Tag>;
    };


    return (
        <View className="audit-container">
            <View className="header">
                <Text className="title">游记审核管理</Text>
                <SearchBar
                    placeholder="搜索游记"
                    value={searchText}
                    onChange={(val) => setSearchText(val)}
                />
                <View className="tabs">
                    {['全部', '待审核', '已通过', '未通过'].map((tab, index) => (
                        <Button
                            key={tab}
                            type={tabIndex === index ? 'primary' : 'default'}
                            size="small"
                            onClick={() => {
                                setTabIndex(index)
                                setFilterStatus(index === 0 ? 'all' : ['pending', 'approved', 'rejected'][index - 1] as TravelNoteStatus)
                            }}
                        >
                            {tab}
                        </Button>
                    ))}
                </View>
            </View>

            <ScrollView className="content" scrollY>
                {travelNotes.map(note => (
                    <Cell
                        key={note.id}
                        title={note.title}
                        description={`作者: ${note.author} | 创建时间: ${note.createTime}`}
                        extra={renderStatusTag(note.status)}
                    // onClick={() => Taro.navigateTo({ url: `/pages/audit/detail?id=${note.id}` })}
                    >
                        <View className="actions">
                            {note.status === 'pending' && (
                                <>
                                    <Button
                                        type="primary"
                                        size="small"
                                    // onClick={(e) => { e.stopPropagation(); handleApprove(note.id) }}
                                    >
                                        通过
                                    </Button>
                                    <Button
                                        type="default"
                                        size="small"
                                    // onClick={(e) => { e.stopPropagation(); handleReject(note) }}
                                    >
                                        拒绝
                                    </Button>
                                </>
                            )}
                            {userRole === 'admin' && (
                                <Button
                                    type="danger"
                                    size="small"
                                //   onClick={(e) => { e.stopPropagation(); handleDelete(note.id) }}
                                >
                                    删除
                                </Button>
                            )}
                        </View>
                    </Cell>
                ))}
            </ScrollView>

            <Popup
                visible={rejectModalVisible}
                position="bottom"
                onClose={() => setRejectModalVisible(false)}
            >
                <View className="reject-modal">
                    <Text className="modal-title">拒绝原因</Text>
                    <Divider />
                    <View className="modal-content">
                        <Text>游记标题: {currentNote?.title}</Text>
                        <Text>作者: {currentNote?.author}</Text>
                        <TextArea
                            placeholder="请输入拒绝原因"
                            value={rejectReason}
                            onChange={(val) => setRejectReason(val)}
                        />
                    </View>
                    <View className="modal-actions">
                        <Button type="default" onClick={() => setRejectModalVisible(false)}>
                            取消
                        </Button>
                        {/* onClick={confirmReject} */}
                        <Button type="primary" >
                            确认
                        </Button>
                    </View>
                </View>
            </Popup>
        </View>
    )
}

export default AuditPage