// import { sampleDB } from "../db/sampleDB";
// import { saveToLocalStorage } from "../utils/localStorageFc";

// export const useSampleDB = () => {
//   const loadSampleData = () => {
//     try {
//       saveToLocalStorage(sampleDB);
//     } catch (error) {
//       console.log("Failed to load sample data!", error);
//     }
//   };

//   return { loadSampleData };
// };

// // need to refresh manually as the states of data (allEmployee) is not update here, so I need to make this functionality inside the usEmployee (even if I import the setAllEmployee, it will not work, as React hok do ont share state across different hooks).
