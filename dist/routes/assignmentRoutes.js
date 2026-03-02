"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assignmentController_1 = require("../controllers/assignmentController");
const router = (0, express_1.Router)();
router.get('/', assignmentController_1.getAssignments);
router.get('/:id', assignmentController_1.getAssignmentById);
router.post('/', assignmentController_1.createAssignment);
exports.default = router;
