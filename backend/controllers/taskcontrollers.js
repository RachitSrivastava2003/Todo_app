const db = require('../database/db');

//get all tasks
exports.getalltasks = async (req,res)=>{
    try{
        const [rows] = await db.query('SELECT * FROM tasks ORDER BY date DESC');
        res.status(200).json(rows);
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'});
    }  
}

//create task
exports.createTasks = async (req,res)=>{
    try{
        const {title,description} = req.body;
        if(!title || !description){
            return res.status(400).json({message:'Please Provide me all the fields'});
        }
        await db.query('INSERT INTO tasks (title,description) VALUES (?,?)',[title,description]);
        res.status(201).json({message:'Task Created Successfully'});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
}

//update task
exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: 'Please provide all fields' });
      }
      await db.query('UPDATE tasks SET title = ?, description = ? WHERE id = ?', [title, description, id]);
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  

//delete task
exports.deleteTask = async (req,res)=>{
    try{
        const {id} = req.params;
        await db.query('DELETE FROM tasks WHERE id = ?',[id]);
        res.status(200).json({message:'Task Deleted Successfully!!'});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
}

//complete task
exports.completeTask = async (req,res)=>{
    try{
        const {id} = req.params;
        await db.query('UPDATE tasks SET complete = ? WHERE id = ?',[1,id]);
        res.status(200).json({message:'Task Completed Successfully!!'});
    }catch(err){
        res.status(500).json({message:'Internal server error'});
    }
}