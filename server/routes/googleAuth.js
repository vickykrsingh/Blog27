import express from 'express';
import passport from 'passport'

const router = express.Router();

// /auth/google is the inbuild routes for start the google login page
router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}))

// /auth/google/callback is the routes which trigred after user success/failed signin
router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:`${process.env.CLIENT_URL}/login-failure`
},(req,res)=>{
    res.redirect(`${process.env.CLIENT_URL}/login-success`)
}))

router.get('/auth/check',(req,res)=>{
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: req.user });
      } else {
        res.json({ isAuthenticated: false });
      }
})

router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  });
  
export default router;