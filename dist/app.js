"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherRoutes_1 = __importDefault(require("./routes/teacherRoutes"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/v1/', (req, res) => {
    res.send("hi there");
});
app.use("/api/v1/teacher", teacherRoutes_1.default);
app.listen(3000, () => {
    console.log(`http://localhost:${port}`);
});
