import { useEffect, useState } from "react";
import { sampleDB } from "./../db/sampleDB";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorageFc";

export const useEmployees = () => {
  // All-Employee data states
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  //   Local storage data load to local states
  useEffect(() => {
    try {
      setAllEmployees(() => loadFromLocalStorage());
    } catch (error) {
      console.log("Failed to load employee data!", error);
    } finally {
      setLoading(false);
    }
  }, []);

  //   when not loading
  useEffect(() => {
    if (!loading) {
      saveToLocalStorage(allEmployees);
    }
  }, [loading, allEmployees]);

  //   create;
  const addEmployee = (employee) => {
    try {
      setAllEmployees((prev) => [
        ...prev,
        {
          ...employee,
          id: crypto.randomUUID(),
        },
      ]);
    } catch (error) {
      console.log("Failed to add employee!", error);
    }
  };

  //   update
  const updateEmployee = (updatedEmployee) => {
    try {
      setAllEmployees((prevAllEmp) =>
        prevAllEmp.map((prevEmp) =>
          prevEmp.id === updatedEmployee.id ? updatedEmployee : prevEmp,
        ),
      );
    } catch (error) {
      console.log("Failed to update employee!", error);
    }
  };

  const archiveEmployee = (id) => {
    setAllEmployees((prevAllEmp) =>
      prevAllEmp.map((prevEmp) =>
        prevEmp.id === id ? { ...prevEmp, status: "archived" } : prevEmp,
      ),
    );
  };

  // load sample data
  const loadSampleData = () => {
    try {
      saveToLocalStorage(sampleDB);
      setAllEmployees(sampleDB);
    } catch (error) {
      console.log("Failed to load sample data!", error);
    }
  };

  return {
    allEmployees,
    loading,
    addEmployee,
    updateEmployee,
    archiveEmployee,
    loadSampleData,
  };
};
