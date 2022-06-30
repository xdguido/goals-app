const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.json(goals);
});

// @desc Set goals
// @route POST /api/goals
// @access Private

const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field to the request");
  }
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  res.json(goal);
});

// @desc Update goals
// @route PUT /api/goals
// @access Private

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    request.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to update goals");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedGoal);
});

// @desc Delete goals
// @route DELETE /api/goals
// @access Private

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    request.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized to delete goals");
  }

  await goal.remove();

  res.json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
