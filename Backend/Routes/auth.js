import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/login/success", (req, res) => {
  // if(req.user){
  if (req.isAuthenticated()) {
    res.status(200).send({
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).send({
      error: true,
      message: "Un Autorised",
    });
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "/",
  })
);

//logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Internal Server Error: " + err);
    }
    res.redirect("http://localhost:3000/");

    // res.status(200).send({ status: 'Logout' });
  });
});

export default router;
