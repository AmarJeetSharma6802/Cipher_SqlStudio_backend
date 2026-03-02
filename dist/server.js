"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const assignmentRoutes_1 = __importDefault(require("./routes/assignmentRoutes"));
const queryRoutes_1 = __importDefault(require("./routes/queryRoutes"));
const llmRoutes_1 = __importDefault(require("./routes/llmRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/assignments', assignmentRoutes_1.default);
app.use('/api/query', queryRoutes_1.default);
app.use('/api/hint', llmRoutes_1.default);
app.get('/', (req, res) => {
    res.send('CipherSQLStudio API is running');
});
const startServer = async () => {
    await (0, database_1.connectMongoDB)();
    await (0, database_1.connectPostgres)();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};
startServer();
