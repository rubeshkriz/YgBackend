var client = require("../../model/Config");
var DbName = require("../../model/Db");

const salesQuotation =   async(req, res) => {
    console.log(req.query)
    try {
        if(req.params.id.length < 3){
            if(req.query.CardName && req.query.DocDate){ 
                var sql = `select A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A FULL JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.params.id}' AND B."CardName"='${req.query.CardName}' AND B."DocDate"='${req.query.DocDate}'`;
            }else if(req.query.doc){ 
                var sql = `select A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A FULL JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.params.id}'  AND B."DocNum"='${req.query.DocNum}' `;
            }else if(req.query.DocDate){
                var sql = `select A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A FULL JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.params.id}' AND B."DocDate"='${req.query.DocDate}'`;
            }else{
            var sql = `select A."ItemCode",A."Price",B."DocTotal",A."Dscription",A."Quantity",A."U_StandDis",A."UomCode",A."DiscPrcnt",A."TaxCode",A."U_EndCust",A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A RIGHT JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" WHERE B."SlpCode"='${req.params.id}'`;
        }
    }else{
        
        if(req.query.DocNum){ 
            var sql = `select A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A FULL JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" where B."CardCode"='${req.params.id}' AND B."DocNum"='${req.query.DocNum}'`;
        }else if(req.query.DocDate){ 
            var sql = `select A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A FULL JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" where B."CardCode"='${req.params.id}' AND B."DocDate"='${req.query.DocDate}'`;
        }else{
        var sql = `select A."ItemCode",A."Price",B."DocTotal",A."Dscription",A."Quantity",A."U_StandDis",A."UomCode",A."DiscPrcnt",A."TaxCode",A."U_EndCust",A."ShipDate",B."DocDate",B."CardName",B."CardCode",B."DocNum",B."DocDueDate",B."DocStatus",B."NumAtCard",B."U_CustRefDt" from ${DbName}."QUT1" A RIGHT JOIN ${DbName}."OQUT" B on A."DocEntry"=B."DocEntry" WHERE B."CardCode"='${req.params.id}'`;

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
    salesQuotation, 
}