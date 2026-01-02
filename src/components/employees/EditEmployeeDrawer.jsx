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
import dayjs from "dayjs";
import { useEffect } from "react";

const EditEmployeeDrawer = ({
  onOpen,
  onClose,
  editEmployeeInfo,
  onUpdate,
}) => {
  const [form] = Form.useForm();

  //   preload data
  useEffect(() => {
    if (editEmployeeInfo) {
      const formattedValues = {
        ...editEmployeeInfo,
        joiningDate: dayjs(editEmployeeInfo.joiningDate),
      };
      form.setFieldsValue(formattedValues);
    }
    // console.log(editEmployeeInfo);
  }, [editEmployeeInfo, form]);

  //   form submit
  const handleUpdate = (values, isContinue = false) => {
    // Date formatting
    values = {
      ...values,
      joiningDate: values.joiningDate.format("YYYY-MM-DD"),
      id: editEmployeeInfo.id,
    };

    if (isContinue) {
      onUpdate(values);
    } else {
      onUpdate(values);
      onClose();
      form.resetFields();
    }
  };

  return (
    <Drawer
      title="Edit Employee"
      closable={{ "aria-label": "Close Button" }}
      onClose={onClose}
      open={onOpen}
      size={600}
    >
      <h2 className="pb-4 text-center text-4xl font-bold">
        Edit Employee information
      </h2>

      <Form
        layout="vertical"
        style={{ maxWidth: 500, padding: "24px" }}
        form={form}
        onFinish={(values) => handleUpdate(values, false)}
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
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Radio.Group>
            <Radio value="active">Active</Radio>
            <Radio value="archived">Archive</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Submit and reset form*/}
        <Space>
          <Button type="primary" htmlType="submit">
            Save
          </Button>

          <Button
            htmlType="button"
            onClick={() =>
              form.validateFields().then((values) => handleUpdate(values, true))
            }
          >
            Save & Continue
          </Button>
        </Space>
      </Form>
    </Drawer>
  );
};

export default EditEmployeeDrawer;
