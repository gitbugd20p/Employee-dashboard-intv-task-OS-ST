import {
  Avatar,
  Button,
  Card,
  Empty,
  Input,
  Progress,
  Radio,
  Space,
  Spin,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import EmployeeTable from "../components/employees/EmployeeTable";
import { useEffect, useMemo, useState } from "react";
import AddEmployeeDrawer from "../components/employees/AddEmployeeDrawer";
import { useEmployees } from "./../hooks/useEmployees";
import EditEmployeeDrawer from "../components/employees/EditEmployeeDrawer";
import MultiFilterEmployee from "../components/employees/MultiFilterEmployee";

import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {
  CheckOutlined,
  EditOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
dayjs.extend(isBetween);

const { Search } = Input;

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

  // Status switch state
  const [isActive, setIsActive] = useState(true);

  // View type state
  const [isViewType, setIsViewType] = useState("table");

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

        // Filter for active or archived (switch)
        .filter((employee) => {
          const isActiveStatus = isActive ? "active" : "archived";
          return employee.status === isActiveStatus;
        })
    );
  }, [allEmployees, debounceText, multiFilter, isActive]);

  // Performance score color
  const performanceScoreColor = (score) => {
    if (score <= 20) return "#ff4d4f";
    if (score <= 40) return "#fa8c16";
    if (score <= 60) return "#fadb14";
    if (score <= 80) return "#1890ff";
    return "#52c41a";
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <div>
          {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 96 }} spin />} /> */}
          <Spin size="large" />
        </div>
        <h1 className="p-8 text-4xl font-bold">Data Loading...</h1>
      </div>
    );
  }

  if (allEmployees.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        {/* Empty data state */}
        <Empty description="NO Data..." />

        <h1 className="text-4xl font-semibold">
          To see employee data, Add employee...
        </h1>

        {/* Add employee */}
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
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <h1 className="pt-4 text-4xl font-bold">Employee Records</h1>

        <Space className="w-full">
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

          {/* Filter: active or archived */}
          <Space vertical>
            <Switch
              checkedChildren="Active"
              unCheckedChildren="Archived"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
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

        {/* Table or Card view selector */}
        <Space>
          <h1 className="font-bold">View Type:</h1>
          <Radio.Group
            value={isViewType}
            onChange={() =>
              setIsViewType(isViewType === "table" ? "card" : "table")
            }
          >
            <Radio.Button value="table">Table</Radio.Button>
            <Radio.Button value="card">Card</Radio.Button>
          </Radio.Group>
        </Space>

        {/* Table or Card view*/}
        {isViewType === "table" ? (
          <EmployeeTable
            data={filteredEmployees}
            onEdit={(employee) => {
              setOpenEditDrawer(true);
              setEditEmployeeInfo(employee);
            }}
            onArchive={archiveEmployee}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEmployees.map((emp) => {
              const actions = [
                <Tooltip title="Edit Employee" key="edit">
                  <EditOutlined
                    onClick={() => {
                      setOpenEditDrawer(true);
                      setEditEmployeeInfo(emp);
                    }}
                  />
                </Tooltip>,
                <Tooltip title="Archive Employee" key="archive">
                  <FileExcelOutlined onClick={() => archiveEmployee(emp.id)} />
                </Tooltip>,
              ];
              return (
                <div key={emp.id} className="shadow">
                  <Card actions={actions} style={{ minWidth: 300 }}>
                    <Card.Meta
                      className="pb-3"
                      avatar={
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                      }
                      title={emp.name}
                      description={
                        <Tag color={"blue"} className="capitalize">
                          {emp.role}
                        </Tag>
                      }
                      actions={actions}
                    />

                    {/* Dept, joined-date and performance-score */}
                    <div className="flex justify-between">
                      <div>
                        <p className="capitalize">
                          <strong>Dept:</strong> {emp.department}
                        </p>
                        <p>
                          <strong>Joined:</strong> {emp.joiningDate}
                        </p>
                      </div>
                      <div>
                        <div className="p-2 text-center">
                          {emp.performanceScore ? (
                            <Progress
                              type="dashboard"
                              percent={emp.performanceScore}
                              size="small"
                              strokeColor={performanceScoreColor(
                                emp.performanceScore,
                              )}
                            />
                          ) : (
                            <Progress
                              type="dashboard"
                              size="small"
                              format={() => "N/A"}
                            />
                          )}
                        </div>
                        <p>
                          <strong>
                            <Tag color="purple">
                              Performance Score{emp.performanceScore}
                            </Tag>
                          </strong>
                        </p>
                      </div>
                    </div>

                    <p className="pt-2">
                      <Tag
                        color={emp.status === "active" ? "green" : "volcano"}
                        className="capitalize"
                        icon={
                          emp.status === "active" ? (
                            <CheckOutlined />
                          ) : (
                            <FileExcelOutlined />
                          )
                        }
                      >
                        {emp.status}
                      </Tag>
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Employees;
