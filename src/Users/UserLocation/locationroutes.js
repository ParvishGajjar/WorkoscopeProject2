import * as api from './locationfunctions.js'
import express from 'express'
var router=express.Router()

router.get('/getcountry',api.getCountry)

router.get('/getstate/:cid',api.getState)

router.get('/getcity/:sid',api.getCity)

router.post('/insertlocation',api.insertLocation)

module.exports = router;