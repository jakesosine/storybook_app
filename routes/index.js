const express = require('express')
const router  = express.Router()

//  @descr Login/Landing page
//  @rout Get / 

router.get('/',(req,res) => {
    res.render("layout");
})
//  @descr Login/Landing page
//  @rout Get / dashboard
router.get('/dashboard',(req,res)=>{
    console.log('test')
    res.render("dashboard");
})

module.exports = router