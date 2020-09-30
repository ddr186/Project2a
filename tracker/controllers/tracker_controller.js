const express = require('express')
const tracker = express.Router()
// const Animal = require('../models/animals.js')

//======================
//  READ
//======================

tracker.get('/', (req, res) => {
    res.send('in controller')
})
