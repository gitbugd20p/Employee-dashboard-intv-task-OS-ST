import { Button, DatePicker, Form, Select } from "antd";

const { RangePicker } = DatePicker;

const MultiFilterEmployee = ({ multiFilter, setMultiFilter, onReset }) => {
  return (
    <Form layout="inline" style={{ padding: "24px" }}>
      {/* Department */}
      <Form.Item label="Department" name="department">
        <Select
          value={multiFilter.department}
          onChange={(val) =>
            setMultiFilter({ ...multiFilter, department: val })
          }
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
      <Form.Item label="Role" name="role">
        <Select
          value={multiFilter.role}
          onChange={(val) => setMultiFilter({ ...multiFilter, role: val })}
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
      <Form.Item label="Joining" name="joiningDate">
        <RangePicker
          value={multiFilter.dateRange}
          onChange={(val) => setMultiFilter({ ...multiFilter, dateRange: val })}
        />
      </Form.Item>

      {/* Reset Form */}
      <Button color="purple" variant="filled" onClick={onReset}>
        Reset
      </Button>
    </Form>
  );
};

export default MultiFilterEmployee;
