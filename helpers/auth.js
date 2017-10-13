module.exports = function (access_level) {	
    return function (req, res, next) {
        if (access_level == 'user' && req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    }
}