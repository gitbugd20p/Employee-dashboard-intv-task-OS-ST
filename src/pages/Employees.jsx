import { Button, Space } from "antd";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useEffect, useMemo, useState } from "react";
import AddEmployeeDrawer from "../components/employees/AddEmployeeDrawer";
import { useEmployees } from "./../hooks/useEmployees";
import EditEmployeeDrawer from "../components/employees/EditEmployeeDrawer";
import Search from "antd/es/transfer/search";
import MultiFilterEmployee from "../components/employees/MultiFilterEmployee";
import dayjs from "dayjs";

import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

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

  // Input-search text
  const [searchText, setSearchText] = useState("");

  // Input-search text for debounce search
  const [debounceText, setDebounceText] = useState("");

  // Debounce search
  useEffect(() => {
    const debounceTimerFunction = setTimeout(() => {
      setDebounceText(searchText);
    }, 500);

    return () => clearTimeout(debounceTimerFunction);
  }, [searchText]);

  // Multi filter state
  const [multiFilter, setMultiFilter] = useState({
    department: null,
    role: null,
    dateRange: null,
  });

  console.log(multiFilter);

  // Filters the main data for search and multi filters
  const filteredEmployees = useMemo(() => {
    return (
      allEmployees
        // For Search (name, department, role, status)
        .filter((employee) => {
          if (!debounceText) return true;
          const text = debounceText.toLowerCase();

          return (
            employee.name.toLowerCase().includes(text) ||
            employee.department.toLowerCase().includes(text) ||
            employee.role.toLowerCase().includes(text) ||
            employee.status.toLowerCase().includes(text)
          );
        })

        // Multi filter
        .filter((employee) => {
          // for department
          if (
            multiFilter.department &&
            multiFilter.department !== employee.department
          ) {
            return false;
          }

          // for role
          if (multiFilter.role && multiFilter.role !== employee.role) {
            return false;
          }

          // joining Date
          if (
            multiFilter.dateRange &&
            multiFilter.dateRange[0] &&
            multiFilter.dateRange[1]
          ) {
            const startDate = multiFilter.dateRange[0];
            const endDate = multiFilter.dateRange[1];

            const empJoiningDate = dayjs(employee.joiningDate);

            return empJoiningDate.isBetween(startDate, endDate, "day", []);
          }

          // return true, for passed all other above checks,
          return true;
        })
    );
  }, [allEmployees, debounceText, multiFilter]);

  return (
    <>
      <div className="w-full">
        <h1 className="py-8 text-4xl font-bold">Employee Records</h1>

        <Space>
          {/* Add employee button (drawer) */}
          <Space>
            <Button onClick={() => setOpenDrawer(true)} type="primary">
              Add Employee
            </Button>
          </Space>

          {/* Employee search and filters */}
          <Space>
            {/* Search */}
            <Search
              placeholder="input search text"
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>

          {/* Multi-filters component*/}
          <Space>
            <MultiFilterEmployee
              multiFilter={multiFilter}
              setMultiFilter={setMultiFilter}
              onReset={() => {
                setMultiFilter({
                  department: null,
                  role: null,
                  dateRange: null,
                });
              }}
            />
          </Space>
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
          data={filteredEmployees}
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
