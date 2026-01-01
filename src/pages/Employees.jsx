import EmployeeTable from "../components/employees/EmployeeTable";

const Employees = () => {
  return (
    <>
      <div className="w-full">
        <h1 className="text-4xl font-bold">Employee Records</h1>

        {/* Table */}
        <EmployeeTable />
      </div>
    </>
  );
};

export default Employees;
