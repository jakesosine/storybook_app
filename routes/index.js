const express = require('express')
const router  = express.Router()
const { ensureAuth, ensureGuest} = require('../middleware/auth')


const Story = require('../models/story')
//  @descr Login/Landing page
//  @route Get / 

router.get('/',ensureGuest,(req,res) => {
    res.render("login",
    {layout:'login'});
})
//  @descr Login/Landing page
//  @rout Get / dashboard
router.get('/dashboard',ensureAuth, async (req,res)=>{
    try{
        const stories = await Story.find({user: req.user.id}).lean()
        res.render("dashboard",{
            name:req.user.firsName,
            stories
        })
    }catch (err){
        console.error(err)
        res.render('error/500')
    }
    
})


module.exports = router