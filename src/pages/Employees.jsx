import { Button, Space } from "antd";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useState } from "react";
import AddEmployeeDrawer from "../components/employees/AddEmployeeDrawer";
import { useEmployees } from "./../hooks/useEmployees";
import EditEmployeeDrawer from "../components/employees/EditEmployeeDrawer";

const Employees = () => {
  // Employee info with functions
  const {
    allEmployees,
    loading,
    addEmployee,
    updateEmployee,
    archiveEmployee,
  } = useEmployees();

  // Add drawer state
  const [openDrawer, setOpenDrawer] = useState(false);

  // Edit drawer
  const [openEditDrawer, setOpenEditDrawer] = useState(false);

  // Edit employee data
  const [editEmployeeInfo, setEditEmployeeInfo] = useState(null);

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

        {/* Edit drawer */}
        <EditEmployeeDrawer
          onOpen={openEditDrawer}
          onClose={() => setOpenEditDrawer(false)}
          editEmployeeInfo={editEmployeeInfo}
          onUpdate={updateEmployee}
        />

        {/* Table */}
        <EmployeeTable
          data={allEmployees}
          onEdit={(employee) => {
            setOpenEditDrawer(true);
            setEditEmployeeInfo(employee);
          }}
          onArchive={archiveEmployee}
        />
      </div>
    </>
  );
};

export default Employees;
