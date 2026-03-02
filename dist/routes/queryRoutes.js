"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queryController_1 = require("../controllers/queryController");
const router = (0, express_1.Router)();
router.post('/', queryController_1.executeQuery);
exports.default = router;
