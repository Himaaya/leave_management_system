const KEY = "leave_data";

// GET DATA FROM LOCALSTORAGE
export const getLeaves = () => {
  const data = localStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];
};

// SAVE DATA TO LOCALSTORAGE
export const saveLeaves = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};