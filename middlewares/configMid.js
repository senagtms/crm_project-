module.exports = (req,res,next) => {
    req.projectUrl = req.protocol  + '://'+req.headers.host + '/';
    next();
}