var client = require("../../model/Config");
var DbName = require("../../model/Db");
const jwt = require("jsonwebtoken");

const sendToken = require("../../utils/jwtToken");


/////////////////////////////////////////////
//////////JWT


const SelectUser = async(req, res) => {
    const tokening ={ getJWTToken : (data) => {console.log(data)
        return jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
      }};
    try {console.log(req.body.id)

      if(req.body.id.startsWith("E")){
        var sql =  `select "empID","lastName","firstName" from ${DbName}."OHEM" WHERE "govID"='${req.body.id}' AND "U_PassWord" = '${req.body.password}'`;
      }else{
        var sql =  `select "CardCode","CardName","CardCode" as "empID" from ${DbName}."OCRD" WHERE "CardCode"='${req.body.id}' AND "ZipCode" = '${req.body.password}'`;
      }
        await client.exec(sql, function(err,data) {
            if (err) {
                res.send({ "error": err.message });
            } else if (data.length !== 1) {             
              console.log(data.length)   
                res.send({ status: 0, "error": "Cannot Login." });                
            } else {data[0].id = req.body.id
              console.log(data[0])
                const result = data[0];
                sendToken(tokening, 200,result, res);
            }
        });
    } catch (e) {
        throw Error(e);
    }
};

const logout = async (req, res, next) => {
    if(res.cookie){
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })};
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };


module.exports = {
    SelectUser, logout
}