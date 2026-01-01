// Key for local storage
export const EMP_KEY = "EMP_DB_DATA";

// Load from local storage
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(EMP_KEY);
    //   parse data
    const parsedData = JSON.parse(data) || [];
    // console.log("Loaded Data!");

    return parsedData;
  } catch (error) {
    console.log("Failed to load data from Local Storage!", error);
    return [];
  }
};

// Save from local storage
export const saveToLocalStorage = (employee) => {
  try {
    const stringifyData = JSON.stringify(employee);
    localStorage.setItem(EMP_KEY, stringifyData);
    // console.log("Data Saved!");
  } catch (error) {
    console.log("Failed to save data to Local Storage!", error);
  }
};

// Remove or reset from local storage
export const removeFromLocalStorage = () => {
  try {
    localStorage.removeItem(EMP_KEY);
    // console.log("Storage Clear");
  } catch (error) {
    console.log("Failed to clear data in Local Storage!", error);
  }
};
