var client = require("../../model/Config");
var DbName = require("../../model/Db");


const EndCustomer =   async(req, res) => {
    req.params.id = req.params.id.toString();
    console.log(req.params.id)

    console.log(req.params.id)
    try {
        if(req.params.id){
            var sql = `select "U_EndCode","U_EndName" from ${DbName}."@INSY_OCEND" where "U_EndCode"='${req.params.id}'`            
        }
        console.log(sql);           
        await client.exec(sql, function(err, data) {
            if (err) {
                res.send({ "error": err.message });
            }
            res.status(200).json({
                status:"Sucess",
                message: data
            });
        });
     } catch (e) {
        throw Error(e);
    }    
    }

    module.exports = {
    EndCustomer 
}