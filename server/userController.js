const User = require("./user");

module.exports = {
    create: (req,res,next)=>{
        const {fname,lname,email,password} = req.body;
        let newUser = new User({fname,lname,email,password});
        newUser.save()
        .then((data)=>{
            res.locals.redirect = "/login";
            next();
        })
        .catch((err)=>{
            res.locals.redirect = "/";
            next();
        });
    },

    redirect: (req,res)=>{
        // console.log(res.locals.redirect);
        res.send(res.locals.redirect);
    },

    authenticate: (req,res,next)=>{
        const currentuser = req.body;
        // console.log(currentuser);
        User.find({}).exec()
        .then((users)=>{
            // console.log(users);
            res.locals.redirect = "/login";
            users.forEach((user)=>{
                if(user.email===currentuser.email && user.password === currentuser.password){
                    res.locals.redirect = "/join";
                }
            })
            next();
        })
        .catch((err)=>res.send(err));
    }
};