const express = require("express");
const passport = require("passport");
const router = express.Router();

//@desc     Auth with Google
//@route    GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc     Callback
//@route    GET /auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/", //redirect to login if failed
    }),
    (req, res) => {
        res.redirect("/dashboard"); //Go to dashboard if successfull
    }
);

module.exports = router;
