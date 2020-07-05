module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect("/");
        }
    },

    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect("/dashboard");
        } else {
            next();
        }
    },
};
