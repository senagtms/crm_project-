const Log = require("../model/logModel");
const {User} = require("../model/userModel")

const LogContoller = {
    async list(req,res,next){
        const logList  =  await Log.find().sort({_id:-1});
        const user = []
        for(let i=0 ; i<logList.length ; i++){
            const value = await User.findById(logList[i].userId)
            user.push(value)
        }
        res.render("activeLog", {url:req.projectUrl,data:logList,userdata:user})
    }
}

module.exports = LogContoller