import { EditOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";

const EmployeeTable = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      department: "UI/UX",
      status: "active",
    },
    {
      key: "2",
      name: "John",
      department: "Engineering",
      status: "archived",
    },
  ];

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
          <Button color="primary" variant="outlined" icon={<EditOutlined />}>
            Edit
          </Button>

          <Button
            color="danger"
            variant="outlined"
            icon={<FileExcelOutlined />}
          >
            Archive
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "25"],
        defaultPageSize: 5,
      }}
      style={{
        margin: "24px 16px",
        padding: 24,
      }}
    />
  );
};

export default EmployeeTable;
