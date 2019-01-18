const express = require("express");

const app = express()
const Task = require("../models/Task");

app.get('/task/get', (req, res) => {
    Task.find({}, (err, tasks) => {
        if (err) res.status(400).json({
            state: false,
            tasks: null
        })
        res.json({
            state: true,
            tasks
        })
    })
})

app.post('/task/create', (req, res) => {
    const body = req.body;

    let newTask = new Task({
        name: body.name
    })

    newTask.save((err, task) => {
        if (err) res.json({
            state: false,
            task: null
        })
        res.json({
            state: true,
            task
        })
    })
})

app.put('/task/:id/update', (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const { name, state } = body;

    Task.findById(id, (err, task) => {
        if (err) res.json({
            state: false,
            message: `Tarea con el id ${id} no se encontro o no existe`,
            task: null
        })
        task.state = state
        task.name = name
        task.save((err, task) => {
            if (err) res.json({
                state: false,
                message: "Ocurrio un error al actualizar la tarea",
                task: null
            })
            res.json({
                state: true,
                message: "Tarea Actualizada correctamente",
                task
            })
        })
    })
})

app.delete('/task/:id/delete', (req, res) => {
    const id = req.params.id;
    Task.findByIdAndRemove(id, (err, task) => {
        if (err) res.json({
            state: false,
            message: "Ocurrio un error al eliminar la tarea",
            task: null
        })
        res.json({
            state: true,
            message: "Tarea eliminada correctamente",
            task
        })
    })
})

module.exports = app;