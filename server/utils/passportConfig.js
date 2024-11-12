import passport from "passport";
import PassportOAuth from 'passport-google-oauth20'
import { userModel } from "../models/userModel.js";
import dotenv from 'dotenv'
dotenv.config()
const GoogleStrategy = PassportOAuth.Strategy;

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done)=> {
        console.log(accessToken,"This is accessToken");
        console.log(refreshToken,"This is refreshToken");
        console.log(profile,"This is profile object");
        console.log(done,"This is done function");

        try {
            if(!profile.id){
                return done(null,null)
            }
            const user = await userModel.findOne({googleId:profile.id});
            console.log(crypto.randomUUID(),"This is random uuid")
            if(!user){
                await userModel.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    username:crypto.randomUUID(),
                    password:null,
                    googleId:profile.id
                }).save();
            }
            return done(null,user)
        } catch (error) {
            done(error,null)
        }
    }
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    try {
        const user = await userModel.findOne({googleId:id})
        done(null,user)
    } catch (error) {
        done(error,null)
    }
})