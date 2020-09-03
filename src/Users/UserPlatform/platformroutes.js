import * as api from './platformfunctions.js'
import express from 'express'
var router=express.Router()

router.get('/getsimilarplatforms',api.getSimilarPlatforms)

router.post('/insertplatform',api.insertPlatform)

module.exports = router;