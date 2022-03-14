var client = require("../model/Config");
var DbName = require("../model/Db");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = async (req, res, next) => {
		// let clientEmpId = Cookies.get("empID")
        let  token
        if (req.params.token != "undefined") {token = req.params.token;}else{res.send("Login Cumpulsry")}     
  
    // if (token) {
    //     res.status(400).json({
    //         success: false,
    //         message: "Need Authorization of Login",
    //       });
    // }
  
    if(token){
    console.log("nowin")

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if(decodedData.id.startsWith("E")){
        var sql =  `select "empID","lastName","firstName" from ${DbName}."OHEM" WHERE "govID"='${decodedData.id}'`;
        }else{
            var sql =  `select "CardCode","CardName" from ${DbName}."OCRD" WHERE "CardCode"='${decodedData.id}'`;

        }
        await client.exec(sql, function(err, data) {
            if (err) {
                res.send({ "error": err.message });
            } else if (data.length == 0) {
                res.send({ status: 0, "error": "Cannot Login." });
            } else {                
                data.id = decodedData.id
                req.user = data[0].empID;
        next();                

            }

        });



    }
  
  
  };