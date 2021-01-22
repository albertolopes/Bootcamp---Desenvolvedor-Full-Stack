import express from "express";
import {promises as fs} from "fs";

const { readFile, writeFile} = fs;
const router = express.Router();

router.post("/", async (req, res, next) => {
    try { 
        let grades = req.body;

        const data = JSON.parse(await readFile(global.fileName));

        grades = { 
            id: data.nextId + 1,
            student: req.body.student, 
            subject: req.body.subject,
            type: req.body.type,
            value: req.body.value,
            timestamp: new Date(Date.now()).toISOString()
        };

        data.nextId = grades.id;
        data.grades.push(grades);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(grades);

        logger.info(`POST /grade - ${JSON.stringify(grades)}`);
    } catch (err) {        
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try { 
        let grades = req.body;

        const data = JSON.parse(await readFile(global.fileName));        
        const index = data.grades.findIndex(a => a.id === req.body.id);

        if (index === -1) {
            throw new Error("Registro não encontrado.");
        }

        grades = { 
            id: req.body.id,
            student: req.body.student, 
            subject: req.body.subject,
            type: req.body.type,
            value: req.body.value,
            timestamp: new Date(Date.now()).toISOString()
        };

        data.grades[index] = grades;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(grades);

        logger.info(`PUT /grade - ${JSON.stringify(grades)}`);
    } catch (err) {        
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));    
        data.grades = data.grades.filter(
            grades => grades.id !== parseInt(req.params.id));
                    
        await writeFile(global.fileName, JSON.stringify(data, null, 2));        
        res.end();
        logger.info(`DELETE /grade/:id - ${req.params.id}`)
    } catch (err) {
        next(err);  
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info("GET /grade");
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const grades = data.grades.find(
            grades => grades.id === parseInt(req.params.id));
        res.send(grades);
        logger.info("GET /grade/:id")
    } catch (err) {
        next(err);
    }
});

router.get("/sum/:student/:subject", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let result = data.grades.filter(function(el) {
            return el.student.toLowerCase().indexOf(req.params.student.toLowerCase()) > -1 
            && el.subject.toLowerCase().indexOf(req.params.subject.toLowerCase()) > -1;
        }) 
        
        let sum = 0;
        result.forEach(re => {
            sum += re.value;
        }); 
        
        res.send(JSON.stringify(sum));
        logger.info("GET /grade/:student/:subject")
    } catch (err) {
        next(err);
    }
});

router.get("/mean/:subject/:type", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let result = data.grades.filter(function(el) {
            return el.subject.toLowerCase().indexOf(req.params.subject.toLowerCase()) > -1 
            && el.type.toLowerCase().indexOf(req.params.type.toLowerCase()) > -1;
        }) 
        
        let sum = 0;
        result.forEach(re => {
            sum += re.value;
        }); 
        let mean = sum/ result.length;

        res.send(JSON.stringify(mean));
        logger.info("GET /grade/:student/:subject")
    } catch (err) {
        next(err);
    }
});

router.get("/best/:subject/:type", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let result = data.grades.filter(function(el) {
            return el.subject.toLowerCase().indexOf(req.params.subject.toLowerCase()) > -1 
            && el.type.toLowerCase().indexOf(req.params.type.toLowerCase()) > -1;
        }) 
        
        let numbersAsc = result.sort(function(a, b) {
            return b.value - a.value;
        });
        
        res.send(numbersAsc);
        logger.info("GET /grade/:student/:subject")
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;