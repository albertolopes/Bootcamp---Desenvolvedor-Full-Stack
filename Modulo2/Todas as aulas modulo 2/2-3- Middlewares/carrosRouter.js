import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("GET /carros");
    res.send("GET /carros");
});

router.get("/teste", (req, res) => {
    console.log("GET /carros/precos");
    res.send("GET /carros/precos");
});

export default router;