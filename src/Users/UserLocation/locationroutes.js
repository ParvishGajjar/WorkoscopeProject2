import * as api from './locationfunctions.js'
import express from 'express'
var router=express.Router()

router.get('/getcountry',api.getCountry)

router.get('/getstate/:cid',api.getState)

router.get('/getcity/:sid',api.getCity)

router.get('/getlocation/:uid',api.searchLocation)

router.post('/insertlocation',api.insertLocation)

router.post('/updatelocation',api.updateLocation)

module.exports = router;