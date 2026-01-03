import { EditOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Button, message, Space, Table, Tag } from "antd";

const EmployeeTable = ({ data, onEdit, onArchive }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: true,
    },
    {
      title: "JoiningDate",
      dataIndex: "joiningDate",
      key: "joiningDate",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) =>
        text === "active" ? (
          <Tag color="green">{text.toUpperCase()}</Tag>
        ) : (
          <Tag color="red">{text.toUpperCase()}</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<EditOutlined />}
            onClick={() => {
              onEdit(record);
            }}
          >
            Edit
          </Button>

          {/* Archive button on if status is active */}
          {record.status === "active" && (
            <Button
              color="danger"
              variant="outlined"
              icon={<FileExcelOutlined />}
              onClick={() => {
                onArchive(record.id);
                // Archive success message
                message.success("Employee archived successfully!");
              }}
            >
              Archive
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "25"],
        defaultPageSize: 5,
      }}
      style={{
        margin: "24px 16px",
        padding: 16,
      }}
    />
  );
};

export default EmployeeTable;
