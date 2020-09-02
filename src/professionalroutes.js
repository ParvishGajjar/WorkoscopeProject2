import * as api from './apifunctions.js'
import express from 'express'
var router=express.Router()

router.post('/professiondata',api.professiondata)

module.exports = router;