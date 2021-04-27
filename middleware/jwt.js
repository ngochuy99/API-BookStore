var jwt = require('jsonwebtoken');


let generateToken = function(user_info, secretKey, tokenLife){
    return new Promise(function(resolve,reject){
        const user = {
            id:user_info.id,
            firstname:user_info.firstname,
            lastname:user_info.lastname,
            email:user_info.email
        };
        jwt.sign(
            {
                data:user
            },
            secretKey,
            {
                algorithm:"HS512",
                expiresIn:tokenLife
            },
            function(error,token){
                if(error){
                    reject(error);
                }
                resolve(token);
            }
        )
    })
}

let verify = function(token,secretKey){
    return new Promise(function(resolve,reject){
        jwt.verify(token,secretKey,function(error,decoded){
            if(error){
                reject(error);
            }
            resolve(decoded);
        })
    })
}

module.exports = {
    generateToken:generateToken,
    verify:verify
}