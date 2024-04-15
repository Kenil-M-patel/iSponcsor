const fs =require('fs')
const express = require('express')

const app = express()

function bodyParser() {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
}

function logReqRes(filename) {
    return(req ,res , next)=>{
        fs.appendFile(filename , ` \n ${Date.now()} ${req.url}: ${req.method}: ${req.path} \n` ,
         (err,data)=>{
           next() 
        })
    }
}

module.exports = {
    logReqRes,
    bodyParser
}