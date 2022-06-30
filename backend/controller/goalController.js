const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
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
  const goal = await Goal.create({ text: req.body.text });
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

  await goal.remove();

  res.json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
