import React from 'react'
import { Table, Tag, Space, Tabs, Layout, Button } from 'antd';
import { DownloadOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { exportCSVFile } from '../../../utils/exportCsv';
import generateFileName from '../../../utils/generateFileName';

interface Props {
    text?: string;
}


const Pelayanan: React.FC<Props> = () => {

    const { TabPane } = Tabs;

    function callback(key: any) {
        console.log(key);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string[]) => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <a>Invite</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const handleExport = () => {
        exportCSVFile({
            fileTitle: generateFileName('CLAIM'),
            items: data,
        });
    }

    const tableTitle = () => (
        <div style={{ float: 'right', paddingBottom: 24 }}>
            <Space>
                <Button onClick={handleExport} icon={<DownloadOutlined />}>CSV</Button>
                <Button icon={<PlusSquareOutlined />}>New</Button>
            </Space>
        </div>
    )

    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Claims" key="1">
                <Layout style={{ height: '100%' }}>
                    <Table
                        title={tableTitle} dataSource={data} columns={columns} />
                </Layout>
            </TabPane>
            <TabPane tab="History" key="2">
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
    )

}

export default Pelayanan