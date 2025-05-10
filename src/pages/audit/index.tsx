import React, { useState, useEffect } from 'react';
import {
    Button,
    Cell,
    Tag,
    SearchBar,
    Dialog,
    TextArea,
    Space,
    Divider,
    Popup
} from '@nutui/nutui-react';
import '@nutui/nutui-react/dist/style.css';
import './audit.scss';
import { serialize } from 'v8';

// 定义类型
type TravelNoteStatus = 'pending' | 'approved' | 'rejected';
type UserRole = 'admin' | 'auditor';

interface TravelNote {
    id: string;
    title: string;
    author: string;
    status: TravelNoteStatus;
    createTime: string;
    images: string[];
    rejectReason?: string;
}

const statusOptions = [
    { label: '全部状态', value: 'all' },
    { label: '待审核', value: 'pending' },
    { label: '已通过', value: 'approved' },
    { label: '未通过', value: 'rejected' },
];

const AuditPage: React.FC = () => {
    const [travelNotes, setTravelNotes] = useState<TravelNote[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filterStatus, setFilterStatus] = useState<TravelNoteStatus | 'all'>('all');
    const [searchText, setSearchText] = useState<string>('');
    const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);
    const [currentNote, setCurrentNote] = useState<TravelNote | null>(null);
    const [rejectReason, setRejectReason] = useState<string>('');
    const [userRole] = useState<UserRole>('auditor');

    useEffect(() => {
        fetchTravelNotes();
    }, [filterStatus, searchText]);

    const fetchTravelNotes = async (): Promise<void> => {
        setLoading(true);
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
                {
                    id: '2',
                    title: '无锡霍头渚樱花季',
                    author: '旅游研究所',
                    status: 'approved',
                    createTime: '2023-04-15',
                    images: [],
                },
                {
                    id: '3',
                    title: '无锡本帮菜馆推荐',
                    author: '强哥',
                    status: 'rejected',
                    createTime: '2023-04-10',
                    images: [],
                    rejectReason: '包含不实信息',
                },
            ];

            // 过滤数据
            const filteredData = mockData.filter(note =>
                (filterStatus === 'all' || note.status === filterStatus) &&
                (searchText === '' ||
                    note.title.includes(searchText) ||
                    note.author.includes(searchText))
            );

            setTravelNotes(filteredData);
        } catch (error) {
            Dialog.alert({
                title: '错误',
                content: '获取游记列表失败',
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string): Promise<void> => {
        try {
            Dialog.alert({
                title: '成功',
                content: '审核通过',
            });
            const updatedNotes = travelNotes.map(note =>
                note.id === id
                    ? {
                        ...note,
                        status: 'approved' as TravelNoteStatus
                    }
                    : note
            )
            setTravelNotes(updatedNotes)
        } catch (error) {
            Dialog.alert({
                title: '错误',
                content: '操作失败',
            });
            console.error(error);
        }
    };

    const handleReject = (id: string): void => {
        const targetNote = travelNotes.find(note => note.id === id);
        if (!targetNote) return;

        // 更新 currentNote（用于弹窗显示）
        setCurrentNote(targetNote);
        // 打开弹窗
        setRejectModalVisible(true);
    };

    const confirmReject = async (): Promise<void> => {
        if (!rejectReason || !currentNote) {
            Dialog.alert({
                title: '提示',
                content: '请填写拒绝原因',
            });
            return;
        }

        try {
            const updatedNotes = travelNotes.map(note =>
                note.id === currentNote.id
                    ? {
                        ...note,
                        status: "rejected" as TravelNoteStatus,
                        rejectReason
                    }
                    : note
            );

            Dialog.alert({
                title: '成功',
                content: '已拒绝该游记',
            });
            setTravelNotes(updatedNotes);
            setRejectModalVisible(false);
            setRejectReason('');
            // fetchTravelNotes();
        } catch (error) {
            Dialog.alert({
                title: '错误',
                content: '操作失败',
            });
            console.error(error);
        }
    };

    const handleDelete = async (id: string): Promise<void> => {
        try {
            Dialog.alert({
                title: '成功',
                content: '已删除该游记',
            });
            const updateNotes = travelNotes.filter(note => note.id !== id)
            setTravelNotes(updateNotes);
            //fetchTravelNotes();
        } catch (error) {
            Dialog.alert({
                title: '错误',
                content: '操作失败',
            });
            console.error(error);
        }
    };

    type TagType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

    const renderStatusTag = (status: TravelNoteStatus) => {
        const config: Record<TravelNoteStatus, { color: TagType; text: string }> = {
            pending: { color: 'warning', text: '待审核' },
            approved: { color: 'success', text: '已通过' },
            rejected: { color: 'danger', text: '未通过' }
        };
        return <Tag
            type={config[status].color}
            style={{ height: '24px', width: '80px', textAlign: 'center', display: 'inline-block', lineHeight: '20px', padding: '0', fontSize: '15px' }}
        >{config[status].text}
        </Tag>;
        //return <Tag type={config[status].color}>{config[status].text}</Tag>;
    };

    return (
        <div className="audit-container">
            <div className="header">
                <h2>游记审核管理</h2>
                <SearchBar
                    placeholder="搜索游记标题或作者"
                    value={searchText}
                    onChange={(val) => setSearchText(val)}
                />
                {/* <Picker
                    options={statusOptions}
                    defaultValue={['all']}
                    onChange={(values) => setFilterStatus(values[0] as TravelNoteStatus | 'all')}
                    style={{ margin: '10px 0' }}
                /> */}
            </div>

            <div className="travel-note-list" >
                {travelNotes.map((note) => (
                    <div key={note.id} className="travel-note-item" style={{
                        border: '1px solid #eee', padding: '12px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between'
                    }}>
                        <div className="note-header" style={{ flex: 1, fontWeight: 'bold', fontSize: '16px', marginBottom: '4px' }}>
                            {note.title}
                            {/* 状态标签 */}
                            <div className="note-status-tag" style={{ marginTop: '8px' }}>
                                {renderStatusTag(note.status)}
                            </div>
                        </div>
                        <div className="note-info" style={{ flex: 1, fontSize: '14px', color: '#666' }}>
                            <div style={{ marginBottom: '10px' }}>作者: {note.author}</div>
                            <div>创建时间: {note.createTime}</div>
                            {note.rejectReason && (
                                <span className="reject-reason" style={{ color: 'red' }}>
                                    拒绝原因: {note.rejectReason}
                                </span>
                            )}
                        </div>
                        <div
                            className="note-footer"
                            style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                height: '100 %'

                            }}
                        >

                            {/* 操作按钮组 */}
                            <div className="note-actions" style={{ marginRight: '5px' }}>
                                {/* {note.status === 'pending' && ( */}
                                <>
                                    <Button
                                        type="success"
                                        size="small"
                                        onClick={() => handleApprove(note.id)}
                                        disabled={userRole !== 'auditor' || note.status !== 'pending'}

                                    >
                                        通过
                                    </Button>
                                    <Button
                                        type="warning"
                                        size="small"
                                        onClick={() => handleReject(note.id)}
                                        disabled={userRole !== 'auditor' || note.status !== 'pending'}
                                        style={{ marginLeft: '8px' }}
                                    >
                                        拒绝
                                    </Button>
                                    <Button
                                        type="danger"
                                        size="small"
                                        onClick={() => handleDelete(note.id)}
                                        style={{ marginLeft: '8px' }}
                                        disabled={userRole !== 'auditor'}
                                    >
                                        删除
                                    </Button>
                                </>


                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <Popup
                visible={rejectModalVisible}
                position="bottom"
                onClose={() => {
                    setRejectModalVisible(false);
                    setRejectReason('');
                }}
            >
                <div className="reject-modal">
                    <h3>拒绝原因</h3>
                    <Divider />
                    <Cell title="游记标题" description={currentNote?.title} />
                    <Cell title="作者" description={currentNote?.author} />
                    <TextArea
                        placeholder="请填写拒绝原因"
                        value={rejectReason}
                        onChange={(val) => setRejectReason(val)}
                        rows={3}
                        style={{ margin: '10px 0' }}
                    />
                    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                        <Button
                            type="default"
                            onClick={() => {
                                setRejectModalVisible(false);
                                setRejectReason('');
                            }}
                        >
                            取消
                        </Button>
                        <Button type="primary" onClick={confirmReject}>
                            确认
                        </Button>
                    </Space>
                </div>
            </Popup>
        </div>
    );
};

export default AuditPage;