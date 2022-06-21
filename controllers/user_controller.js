const User = require("../models/user_model");
const Post = require("../models/post_model");

module.exports.register = (req, res) => {
    if (!req.user) {
        return res.render("register_view");
    }
    console.log("Error: User has not been provided");
};

module.exports.registerLogic = async (req, res, next) => {
    try {
        const {
            firstname,
            surname,
            username,
            email,
            year_of_birth,
            month_of_birth,
            day_of_birth,
            gender,
            password,
            repeat_password,
        } = req.body;
        if (password == repeat_password) {
            const user = await new User({
                firstname,
                surname,
                username,
                email,
            });
            user.extra_info.year_of_birth = year_of_birth,
            user.extra_info.month_of_birth = month_of_birth,
            user.extra_info.day_of_birth = day_of_birth,
            user.extra_info.gender = gender
            const newUser = await User.register(user, password);
            req.login(newUser, (err) => {
                if (err) return next(err);
                res.redirect(res.locals.appUrl);
            });
        } else {
            res.redirect("/register", { error: "Passwords not match" });
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports.login = (req, res) => {
    res.render("login_view");
};

module.exports.loginLogic = async (req, res) => {
    res.redirect(res.locals.appUrl);
};

module.exports.profilePage = async (req, res) => {
    const user = await getUser(req.params.username);
    if(user) 
        var posts = await Post.find({onwer:user.id})
    res.render("profile_view", { user});
};

module.exports.profileEdit = async (req, res) => {
    const user = await getUser(req.params.username);
    res.render("profile-edit_view", { user });
};

module.exports.profileEditLogic = async (req, res) => {
    // var body = {}
    // if(req.body.email != '') body.email = req.body.email
    // if(req.body.username != '') body.username = req.body.username
    const user = await User.findByIdAndUpdate(res.locals.currentUser.id, req.body)
    user.save()
    res.redirect(`/${user.username}`)
}

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.status(200).clearCookie("connect.sid", {
            path: "/",
        });
        req.session.destroy(function (err) {
            res.redirect("/");
        });
    });
};
async function getUser(username) {
    return await User.findOne({ username });
}