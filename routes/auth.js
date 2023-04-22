const express = require('express')
const passport = require('passport')
const router  = express.Router()
//  @descr Auth with Google
//  @route Get /auth/google

router.get('/google',passport.authenticate('google',{scope:['profile']}))
//  @descr Google auth callback
//  @rout Get /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{ failureRedirect:'/'}),
    (req,res)=> {
        res.redirect('/dashboard')
})
// @descr Logout user
// @route /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((error)=>{
        if (error) {return next(error)}
    }); 
    res.redirect('/')
})

module.exports = router