import express from 'express'
const authRouter = express.Router()

authRouter.get('/',async (req,res)=>{
    res.status(200).send({login:'success'})
})

export default authRouter