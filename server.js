const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary data storage
let students = [];

/* =========================
   GET - Fetch All Students
   ========================= */
app.get("/api/students", (req, res) => {
    res.status(200).json(students);
});

/* =========================
   POST - Add New Student
   ========================= */
app.post("/api/students", (req, res) => {

    const { name } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Student name is required"
        });
    }

    const newStudent = {
        id: Date.now(),
        name: name.trim()
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

/* =========================
   PUT - Update Student
   ========================= */
app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);
    const { name } = req.body;

    const student = students.find(
        s => s.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    if (!name || name.trim() === "") {
        return res.status(400).json({
            message: "Student name cannot be empty"
        });
    }

    student.name = name.trim();

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

/* =========================
   DELETE - Delete Student
   ========================= */
app.delete("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = students.findIndex(
        s => s.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully"
    });
});

/* =========================
   Home Route
   ========================= */
app.get("/", (req, res) => {
    res.send("Student Management API is Running 🚀");
});

/* =========================
   Start Server
   ========================= */
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});