var client = require("../../model/Config");
var DbName = require("../../model/Db");


const Item =   async(req, res) => {
    console.log(req.query)
    try {
        if(req.params.id.length < 3){
            if(req.query.DocNum){ 
                // select B."SlpCode",B."CardName",B."DocDate",B."DocNum",B."DocStatus",A."ItemCode" from "RDR1" A INNER JOIN "ORDR" B on A."SlpCode"=B."SlpCode" where B."SlpCode"='3'
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "DocNum"='${req.query.DocNum}'`;
            }else if(req.query.CardName && req.query.DocDate){ 
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}' AND "DocDate"='${req.query.DocDate}'`;
            }else if(req.query.CardName){ 
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}'`;
            }else if(req.query.DocDate){
                var sql = `select "DocDate","CardName" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
            }else{
            var sql = `select "DocDate","DocNum","CardName","DocTotal","DocStatus","DocTotal" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}'`;
        }
    }else{
        if(req.query.DocDate){
            var sql = `select "DocDate","CardName" from ${DbName}."ORDR" WHERE "CardCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
        }else{
        var sql = `select "ItemCode","ItemName","FrgnName","UgpEntry" from ${DbName}."OITM"`;
    }
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
    Item 
}