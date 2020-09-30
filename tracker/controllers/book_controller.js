const express = require('express')
const book = express.Router()
const Book = require('../models/book.js')

//======================
//  READ
//======================

module.exports = book

//// Book Create Route   WORKS IN POSTMAN
book.post('/',(req,res) => {
  Book.create(req.body, (err, newBook) => {
    console.log(req.body)
    Book.find({}, (err,newBookArray) => {
      res.json(newBookArray)
    })
  })
})


// GET ROUTE  WORKS IN POSTMAN//
book.get('/', (req,res) => {
  Book.find({}, (err,newBookArray) => {
    res.json(newBookArray)
  })
})


// DELETE ROUTE WORKS IN POSTMAN  //
book.delete('/:id',(req,res) =>{
  Book.findByIdAndRemove(req.params.id, (err,deletedMark) => {
    Book.find({},(err,newBookArray)=> {
      res.json(newBookArray)
    })
  })
})

// UPDATE ROUTE WORKS IN POSTMAN? //
book.put('/:id',(req,res) =>{
  Book.findByIdAndUpdate(req.params.id,req.body,{new: true},
    (err,updatedBooks) => {
      if(err) {
        res.send(err)
      } else {
        Book.find({},(err,newBookArray) =>{
          res.json(newBookArray)
        })
      }
    })
})
