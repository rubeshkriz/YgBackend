var client = require("../../model/Config");
var DbName = require("../../model/Db");


const saleOrder =   async(req, res) => {
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
                // var sql0 = ` select "ObjectCode","NextNumber",* from "NNM1" where "ObjectCode"='17'`;
            var sql = ` select A."U_EndCusCode",C."ItmsGrpCod",C."ItemName",C."U_ProductGrp",A."U_PODate",A."U_PONo",A."ItemCode",A."Quantity",A."Price",A."DiscPrcnt",B."U_WhsCode",B."DocDate",B."DocNum",B."CardName",B."DocTotal",B."DocStatus",B."DocTotal" from  ${DbName}."RDR1" A RIGHT JOIN  ${DbName}."ORDR" B on A."DocEntry"=B."DocEntry" RIGHT JOIN ${DbName}."OITM" C on A."ItemCode"=C."ItemCode" WHERE B."SlpCode"='${req.params.id}'`;
        }
    }else{
        if(req.query.DocDate){
            var sql = `select "DocDate","CardName" from ${DbName}."ORDR" WHERE "CardCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
        }else{
        var sql = `select A."U_EndCusCode",C."ItmsGrpCod",C."ItemName",C."U_ProductGrp",A."U_PODate",A."U_PONo",A."ItemCode",A."Quantity",A."Price",A."DiscPrcnt",B."U_WhsCode",B."DocDate",B."DocNum",B."CardName",B."DocTotal",B."DocStatus",B."DocTotal" from  ${DbName}."RDR1" A RIGHT JOIN  ${DbName}."ORDR" B on A."DocEntry"=B."DocEntry" RIGHT JOIN ${DbName}."OITM" C on A."ItemCode"=C."ItemCode" WHERE B."CardCode"='${req.params.id}'`;
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
    saleOrder 
}