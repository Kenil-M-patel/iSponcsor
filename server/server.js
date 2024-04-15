
const { log } = require('console');
const express = require('express');
const app = express()
const path = require('path')
const {v4: uuidv4} = require('uuid')

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))


app.set(express.static(path.join(__dirname, 'public')))
const port = 5000

app.use(express.urlencoded({extended: true}))

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`)
})


let posts =[
    {
        id: uuidv4(),
        user: "user_1",
        content: "i am user 1"
    },
    {
        id: uuidv4(),
        user: "user_2",
        content: "i am user 2"
    },
    {
        id: uuidv4(),
        user: "user_3",
        content: "i am user 3"
    },
]

app.get('/posts' , (req , res)=>{
    res.render("index.ejs" , {posts: posts})
    
})

app.get('/posts/new' , (req , res)=>{
    res.render('new.ejs')
})

app.get('/posts/:id' , (req , res)=>{
    let { id }= req.params;
    console.log(id);
    
    let post = posts.find(post => post.id === id)
    res.render('show.ejs' , {post})
})

app.post('/create' , (req , res)=>{
    let{content , user} = req.body; // destructuring (req.body);
    posts.push({user , content});
    res.redirect("/posts");
})
