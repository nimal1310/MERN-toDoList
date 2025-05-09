const express=require('express');
const cors=require('cors');
const fs=require('fs');
const app=express();

const File='tasks.json';

app.use(cors())
app.use(express.json());


app.get('/tasks', (req, res) => {
    fs.readFile(File, 'utf-8', (err, data) => {
        const tasks = err ? [] : JSON.parse(data);
        res.json(tasks);
    });
});

app.post('/tasks',(req, res) => {
    const newTask=req.body;
    fs.readFile(File, 'utf-8', (err, data) => {
        const tasks = err ? [] : JSON.parse(data);
        tasks.push(newTask);
        fs.writeFile(File,JSON.stringify(tasks,null,2),()=>
        {
            res.json({status:'Task added'});
        });
    });
});


app.delete('/tasks/:index',(req, res) => {
    const idx=parseInt(req.params.index);   
     fs.readFile(File, 'utf-8', (err, data) => {
        const tasks = err ? [] : JSON.parse(data);
        tasks.splice(idx,1);
        fs.writeFile(File,JSON.stringify(tasks,null,2),()=>
        {
            res.json({status:'Task deleted'});
        });
    });
});

app.listen(3001,()=>
{
console.log('server running..');
});