import * as api from './wageskillfunctions.js'
import express from 'express'
var router=express.Router()

router.post('/wageskills',api.wageskilldata)

module.exports = router;