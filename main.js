const {Client, Result} = require('pg')
const express = require('express')
const { swaggerUi, swaggerSpec } = require('./swagger')

const app =express()
app.use(express.json())

app.use('/swagger-ui/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const con = new Client({
    host : "localhost",
    user : "postgres",
    port : 5433,
    password: "nadege33",
    database : "demoDb"
})


con.connect()
.then(()=>console.log("connected"))
.catch(()=>console.log("connected error",error));



app.post('/addStudents',(req,res)=>{
    const {name,place,phone} = req.body
    const insert_querry = 'insert into students (name,place,phone) values ($1,$2,$3)'

    con.query(insert_querry,[name,place,phone],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            console.log(result)
            res.send("added correctly")
        }
    })
})

app.post('/addStudent',async(req,res)=>{
    const {name,place,phone} = req.body
    try{
        const result = await con.query("insert into students(name,place,phone) values ($1,$2,$3)",[name,place,phone])
        res.send("student added successfully")
    }catch(error){
        res.send(error)
    }
})


app.post('/addList',async(req,res)=>{
    const dataList = req.body;
    try {
        
        for(const item of dataList){
            const {name,id} = item
            await con.query('insert into student(name,id) values ($1,$2)',[name,id])
        }
        res.send('posted correctely..')

    } catch (error) {
        res.send(error)
    }
})


app.get('/getData',(req,res)=>{
    
    const fetch_query = "select * from student"

    con.query(fetch_query,(err,result)=>{
        if(err){
            result.send(err)
        } else{
            res.send(result.rows )
        }
        
    })
})


app.get('/getDataById/:id',(req,res)=>{
    const id = req.params.id
    const fetch_querry = "select * from student where id = $1"
    con.query(fetch_querry,[id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result.rows[0])

        }
 
    })
})


app.put('/updateStudent/:id',(req,res)=>{
    const id = req.params.id
    const name = req.body.name
    const fetch_querry = "update student set name = $1 where id = $2"
    con.query(fetch_querry,[name,id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("UPDATED successfully")
        }
    })
})



app.delete('/deleteStudent/:id',(req,res)=>{
    const id = req.params.id
    const delete_querry = "delete from student where id = $1"
    con.query(delete_querry,[id],(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send("Deleted successfully")
        }
    })
})


//deleting data using await
app.delete('/deleteDataById/:id',async(req,res)=>{
    const id = req.params.id
    try{
        await con.query("delete from student where id = $1", [id])
        res.send('Successfully Deleted')

    }catch(error){
        res.send(error)
    }
})


app.get('/maxminValue',async(req,res)=>{
    try{
      const result =  await con.query("select min(id) as min_value, max(id) as max_value from student")
        res.send(result.rows[0])
    }catch(error){
        res.send(error)
    }
})


app.post('/autopost',async(req,res)=>{
    const {name,email} = req.body
    try{
        const result = await con.query("insert into users(name,email) values ($1,$2)",[name,email])
        res.send("user add successfully")
    }catch(error){
        res.send(error)
    }
})


app.listen(3000,()=>{
    console.log("server is running....")
})