import { Button, Space } from "antd";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useState } from "react";
import AddEmployeeDrawer from "../components/employees/AddEmployeeDrawer";
import { useEmployees } from "./../hooks/useEmployees";

const Employees = () => {
  // Employee info with functions
  const {
    allEmployees,
    loading,
    addEmployee,
    updateEmployee,
    archiveEmployee,
  } = useEmployees();

  // Drawer state
  const [openDrawer, setOpenDrawer] = useState(false);

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
          onAdd={(employee) => addEmployee(employee)}
        />

        {/* Table */}
        <EmployeeTable data={allEmployees} />
      </div>
    </>
  );
};

export default Employees;
