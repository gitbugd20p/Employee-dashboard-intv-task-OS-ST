import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Space,
} from "antd";

const AddEmployeeDrawer = ({ onOpen, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Date formatting
    values = {
      ...values,
      joiningDate: values.joiningDate.format("YYYY-MM-DD"),
    };

    onAdd(values);
    onClose();
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Drawer
      title="Add Employee Drawer"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={onOpen}
      size={600}
    >
      <h2 className="pb-4 text-center text-4xl font-bold">
        Add Employee information
      </h2>

      <Form
        layout="vertical"
        style={{ maxWidth: 500, padding: "24px" }}
        form={form}
        onFinish={onFinish}
      >
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required!" }]}
        >
          <Input placeholder="Employee name..." />
        </Form.Item>

        {/* Department */}
        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Department is required!" }]}
        >
          <Select
            allowClear
            placeholder="Select Department..."
            options={[
              { label: "Engineering", value: "engineering" },
              { label: "Product & Design", value: "product&design" },
              { label: "Data & AI", value: "data&ai" },
              { label: "Sales & Marketing", value: "sales&marketing" },
              { label: "HR", value: "hr" },
              { label: "Others", value: "others" },
            ]}
          />
        </Form.Item>

        {/* Role */}
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Role is required!" }]}
        >
          <Select
            allowClear
            placeholder="Select Role..."
            options={[
              { label: "Frontend Developer", value: "frontend-developer" },
              { label: "Backend Developer", value: "backend-developer" },
              { label: "Full-Stack Developer", value: "full-stack-developer" },
              { label: "Product Manager (PM)", value: "product-manager" },
              { label: "UI/UX Designer", value: "ui&ux" },
              { label: "Data Scientist", value: "data-scientist" },
              { label: "Product Marketer", value: "product-marketer" },
              { label: "Account Executive (AE)", value: "account-executive" },
              { label: "Technical Recruiter", value: "technical-recruiter" },
              { label: "People Ops", value: "people-ops" },
              { label: "Others", value: "others" },
            ]}
          />
        </Form.Item>

        {/* Joining Date */}
        <Form.Item
          label="Joining Date"
          name="joiningDate"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        {/* Status */}
        <Form.Item
          name="status"
          label="Status"
          initialValue={"active"}
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Radio.Group>
            <Radio value="active">Active</Radio>
            <Radio value="archive">Archive</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Submit and reset form*/}
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default AddEmployeeDrawer;
