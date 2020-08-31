import * as api from './apifunctions.js'
import express from 'express'
var router=express.Router()

router.route('/getcountry').get(api.getCountry)

router.route('/getstate/:cid').get(api.getState)

router.route('/getcity/:sid').get(api.getCity)

router.route('/insertlocation').post(api.insertLocation)

module.exports = router;