const express = require('express')
const router = express.Router()
const path = require('path')

//get request
//regex to grab index file
//sned the file back with dirname nodejs variable
//find the views folder to find index
router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views','index.html'))
})

module.exports = router