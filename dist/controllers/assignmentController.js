"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssignment = exports.getAssignmentById = exports.getAssignments = void 0;
const Assignment_1 = require("../models/Assignment");
const getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment_1.Assignment.find({}, 'title description difficulty');
        res.status(200).json(assignments);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error fetching assignments' });
    }
};
exports.getAssignments = getAssignments;
const getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment_1.Assignment.findById(req.params.id);
        if (!assignment) {
            res.status(404).json({ error: 'Assignment not found' });
            return;
        }
        res.status(200).json(assignment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error fetching assignment' });
    }
};
exports.getAssignmentById = getAssignmentById;
const createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment_1.Assignment(req.body);
        await assignment.save();
        res.status(201).json(assignment);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error creating assignment' });
    }
};
exports.createAssignment = createAssignment;
