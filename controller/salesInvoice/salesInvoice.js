var client = require("../../model/Config");
var DbName = require("../../model/Db");


const salesInvoice =   async(req, res) => {
    req.params.id = req.params.id.toString();
    console.log(req.params.id)

    console.log(req.params.id)
    try {if(req.params.id){
        if(req.params.id.length < 3){
            if(req.query.DocNum){ 
                // select B."SlpCode",B."CardName",B."DocDate",B."DocNum",B."DocStatus",A."ItemCode" from "RDR1" A INNER JOIN "ORDR" B on A."SlpCode"=B."SlpCode" where B."SlpCode"='3'
                var sql = `select "DocDate","DocNum","CardName","DocTotal" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}'`
            }else if(req.query.CardName && req.query.DocDate){ 
                var sql = `select "DocDate","DocNum","CardName","DocTotal" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}'`
            }else if(req.query.CardName){ 
                var sql = `select "DocDate","DocNum","CardName","DocTotal" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}'`
            }else if(req.query.DocDate){
                var sql = `select "DocDate","DocNum","CardName","DocTotal" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}'`
            }else{
                // console.log(`now is ${req.user}`);

               var sql = `select A."ItemCode",A."Dscription",A."U_PONo",A."DiscPrcnt",A."Quantity",A."TaxCode",B."DocStatus",B."DocDueDate",B."DocDate",B."DocNum",B."CardName",B."DocTotal" from ${DbName}."INV1" A RIGHT JOIN ${DbName}."OINV" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.params.id}'`
                // var sql = `select A."ItemCode",A."Dscription",A."U_PONo",A."DiscPrcnt",A."Quantity",A."TaxCode",B."DocStatus",B."DocDueDate",B."DocDate",B."DocNum",B."CardName",B."DocTotal" from ${DbName}."INV1" A RIGHT JOIN ${DbName}."OINV" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.user}'`
        }
    }else{
        if(req.query.DocDate){
            var sql = `select "DocDate","DocNum","CardName","DocTotal" from ${DbName}."OINV" WHERE "CardCode"='${req.params.id}'`
        }else{
            var sql = `select A."ItemCode",A."Dscription",A."U_PONo",A."DiscPrcnt",A."Quantity",A."TaxCode",B."DocStatus",B."DocDueDate",B."DocDate",B."DocNum",B."CardName",B."DocTotal" from ${DbName}."INV1" A RIGHT JOIN ${DbName}."OINV" B on A."DocEntry"=B."DocEntry" WHERE B."CardCode"='${req.params.id}'`
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
    
    }
        } catch (e) {
        throw Error(e);
    }    
    }

    module.exports = {
    salesInvoice 
}