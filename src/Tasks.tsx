import React from "react";
import { Table, Space, Progress } from "antd";
import { taskType } from "./Tasks.d";

const Column = Table.Column;

interface TasksProps {
  tasks: taskType[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
}

const TasksComponent: React.FC<TasksProps> = (props: TasksProps) => {
  const handleDelete = (id: string) => {
    props.onDelete(id);
  };
  const handleDownload = (id: string) => {
    console.log(id);
    props.onDownload(id);
  };
  return (
    <Table<taskType> dataSource={props.tasks} rowKey="id">
      <Column key="title1" title="标题" dataIndex="title" />
      <Column
        key="percent1"
        title="进度"
        dataIndex="percent"
        render={(_: number) => <Progress percent={_} size="small" />}
      />
      <Column
        key="action"
        title="操作"
        render={(_: undefined, record: taskType) => (
          <Space size="middle">
            <a onClick={() => handleDownload(record.id)}>下载</a>
            <a onClick={() => handleDelete(record.id)}>删除</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default TasksComponent;
