const isAuth = (req, res, next) => {
    if(res.locals.currentUser.username != req.params.username ) {
        res.redirect(`/${req.params.username}`)
    }
    next()
}

export default isAuth