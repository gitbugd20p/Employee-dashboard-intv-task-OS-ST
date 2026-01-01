import { Button, Space } from "antd";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useState } from "react";
import AddEmployeeDrawer from "../components/employees/AddEmployeeDrawer";

const Employees = () => {
  // Drawer state
  const [openDrawer, setOpenDrawer] = useState(true);

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
  return (
    <>
      <div className="w-full">
        <h1 className="py-8 text-4xl font-bold">Employee Records</h1>

        {/* Add employee button (drawer) */}
        <Space>
          <Button onClick={() => setOpenDrawer(true)} type="primary">
            Add Employee
          </Button>
        </Space>

        {/* Add drawer */}
        <AddEmployeeDrawer
          onOpen={openDrawer}
          onClose={() => setOpenDrawer(false)}
        />

        {/* Table */}
        <EmployeeTable data={dataSource} />
      </div>
    </>
  );
};

export default Employees;
