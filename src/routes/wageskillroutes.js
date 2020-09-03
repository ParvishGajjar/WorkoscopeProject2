import * as api from '../apifunctions/wageskillfunction.js'
import express from 'express'
var router=express.Router()

router.post('/wageskills',api.wageskilldata)

module.exports = router;