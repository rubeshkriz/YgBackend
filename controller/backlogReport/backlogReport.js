var client = require("../../model/Config");
var DbName = require("../../model/Db");


const backlogReport =   async(req, res) => {
    console.log(req.query)
    //1C03U
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
        var sql = `select F."UomCode",F."DiscPrcnt",F."Price",F."QtyToShip",F."DelivrdQty",F."OrderedQty",F."OpenRtnQty",F."NeedQty",F."RetireQty",F."InvQtyOnly",F."U_POQty",E."Ref1",E."Ref2",E."PayToCode",E."ShipToCode",E."CardCode",E."CardName",E."NumAtCard",E."TaxDate",E."DocNum",E."DocDate",B."WhsCode"
        ,A."U_ABGPCategory",A."ItemType",A."ItmsGrpCod",A."ItemCode",A."ItemName",A."FrgnName" 
                from ${DbName}."ORDR" E inner Join ${DbName}."RDR1" F on E."DocNum" = F."DocEntry", ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                Inner Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
                where E."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                `;
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
    backlogReport 
}