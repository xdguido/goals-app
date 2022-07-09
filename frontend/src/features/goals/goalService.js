import axios from "axios";

const API_URL = "/api/goals/";

//create goals
const createGoal = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, userData, config);

  return res.data;
};

//get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL, config);

  return res.data;
};

//update goals
const updateGoal = async (userData) => {
  const res = await axios.put(API_URL, userData);

  return res.data;
};

//delete goals
const deleteGoal = async (userData) => {
  const res = await axios.put(API_URL, userData);

  return res.data;
};

const goalService = { getGoals, createGoal, updateGoal, deleteGoal };
export default goalService;
