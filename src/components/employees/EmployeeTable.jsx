import { EditOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Button, message, Progress, Space, Table, Tag } from "antd";

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
      title: "Joining Date",
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
      title: "Performance Score",
      dataIndex: "performanceScore",
      key: "performanceScore",
      render: (number) => {
        // color
        const performanceScoreColor = (score) => {
          if (score <= 20) return "#ff4d4f";
          if (score <= 40) return "#fa8c16";
          if (score <= 60) return "#fadb14";
          if (score <= 80) return "#1890ff";
          return "#52c41a";
        };

        // if performance score is not available
        if (!number)
          return (
            <Progress type="dashboard" size="small" format={() => "N/A"} />
          );

        return (
          <Progress
            type="dashboard"
            percent={number}
            size="small"
            strokeColor={performanceScoreColor(number)}
          />
        );
      },
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
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
      }}
    />
  );
};

export default EmployeeTable;
