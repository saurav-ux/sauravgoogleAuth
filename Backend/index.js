import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./connection/db.js";
import authRouter from "./Routes/routeauth.js";
import router from "./Routes/auth.js";
import passport from "passport";
import session from "express-session";
import passportConfig from "./config/passport.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin:['https://deploy-mern-1whq.vercel.app'],
    methods: "GET,POST",
    credentials: true,
  })
);
const PORT = process.env.PORT || 5001;

passportConfig(passport);
//session

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Welcome Saurav");
});
app.use("/login", authRouter);
app.use("/auth", router);
app.listen(PORT, () => {
  console.log(`Server running in : http://localhost:${PORT}`);
});
