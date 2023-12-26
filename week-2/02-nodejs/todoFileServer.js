let express=require("express");
let fs=require('fs');
let {v4:uuidv4}=require('uuid');
let app=express();


app.use(express.json());

app.get('/todos',(req,res)=>{
    fs.readFile("./todos.json","utf8",(err,data)=>{
        if(err){
            throw err;
        }

        let todos=JSON.parse(data);
        res.status(200).json(todos);
    })
})

app.get('/todos/:id',(req,res)=>{
    fs.readFile("./todos.json","utf8",(err,data)=>{
        if(err){
            throw err;
        }

        let todos=JSON.parse(data);
        let {id:todoId}=req.params;
        let todo=todos.find((ele)=>{
            if(ele.id==todoId){
                return true;
            }
            return false;
        })
        if(todo){
            res.status(200).json(todo);
        }
        else{
            res.status(404).json("Item not found");
        }
    })

})

app.post('/todos',(req,res)=>{

    let id=uuidv4();
    let {title,completed,description}=req.body;

    let reqBody={id,title,completed,description};
    fs.readFile('./todos.json','utf8',(err,data)=>{
        if(err){
            throw err;
        }

        //parsing the data from the file;
        let todos=JSON.parse(data);
        todos.push(reqBody);
        
        //Jsonfying the new whole data
        let json_todos=JSON.stringify(todos);

        //writing to the file again the whole new json data
        fs.writeFile('./todos.json',json_todos,(err)=>{
            if(err){
                throw err;
            }
            res.status(201).json("Todo item added succesfully");
        })
    })
})

app.put('/todos/:id',(req,res)=>{
    let {title,completed}=req.body;
    let {id:todoId}=req.params;
    fs.readFile('./todos.json','utf8',(err,data)=>{
        if(err){
            throw err;
        }

        //parsing the data from the file;
        let todos=JSON.parse(data);
        let ind=todos.findIndex((ele)=>{
            if(ele.id==todoId){
                return true;
            }
            return false;
        })
        if(ind>-1){
            todos[ind].title=title;
            todos[ind].completed=completed;
            let json_todos=JSON.stringify(todos);

            //writing to the file again the whole new json data
            fs.writeFile('./todos.json',json_todos,(err)=>{
                if(err){
                    throw err;
                }
                res.status(200).json("Todo item updated succesfully");
            })
        }else{
            res.status(404).json("Item not found");
        }
    })
})

app.delete('/todos/:id',(req,res)=>{
    let {id:todoId}=req.params;
    fs.readFile('./todos.json','utf8',(err,data)=>{
        if(err){
            throw err;
        }

        //parsing the data from the file;
        let todos=JSON.parse(data);
        let ind=todos.findIndex((ele)=>{
            if(ele.id==todoId){
                return true;
            }
            return false;
        })
        if(ind>-1){
            todos=todos.filter((ele)=>{
                if(ele.id==todoId){
                    return false;
                }
                return true;
            })
            let json_todos=JSON.stringify(todos);

            //writing to the file again the whole new json data
            fs.writeFile('./todos.json',json_todos,(err)=>{
                if(err){
                    throw err;
                }
                res.status(200).json("Todo item deleted succesfully");
            })
        }else{
            res.status(404).json("Item not found");
        }
    })
})

app.use('*',(req,res)=>{
    res.status(404).json("Route not found");
})

app.listen(3500,()=>{
    console.log("Server listening on 3500");
})
