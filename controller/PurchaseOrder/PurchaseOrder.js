var client = require("../../model/Config");
var DbName = require("../../model/Db");


const PurchaseOrder =   async(req, res) => {
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
        if(req.query.EndCustomer){
            var sql = `select "U_ECusGST","U_CardName","U_CardCode" from ${DbName}."@INSY_OCEND" WHERE "U_CardCode"='${req.params.id}'`;
        }else if(req.query.ItemCode){
            var sql = `select "ItemCode","ItemName","SalPackMsr","SalPackUn","U_TaxRate","PrdStdCst" from ${DbName}."OITM" where "ItemCode"='${req.query.ItemCode}'`;
        }else{
        // var sql = `select "CardCode","CardName" from ${DbName}."OCRD" WHERE "CardCode"='${req.params.id}'`;
        var sql = `INSERT INTO ${DbName}."ODRF" ("DocNum","DocEntry","CardCode","CardName","NumAtCard","DocStatus","DocDate","U_Type","TaxDate") VALUES ('${req.body.id}','${req.body.DocEntry}','${req.body.CardCode}','${req.body.CardName}','${req.body.PoNumber}','${req.body.Status}','${req.body.DocDate}','${req.body.Utype}','${req.body.TaxDate}')`;
        var sql2 = `INSERT INTO ${DbName}."DRF1" ("DocEntry","LineNum","ItemCode","Dscription","Quantity","UomCode","Price","U_EndCust","DiscPrcnt","TotalFrgn","TaxOnly") VALUES ('${req.body.DocEntry}','${req.body.LineNum}','${req.body.ItemCode}','${req.body.Dscription}','${req.body.Quantity}','${req.body.UOMCode}','${req.body.Price}','${req.body.EndCustomer}','${req.body.Discount}','${req.body.Total}','${req.body.TaxOnly}')`;
    }
    }        
        console.log(sql);           
        console.log(sql2);           
        await client.exec(sql, function(err) {
            if (err) {
                res.send({ "error": err.message });
            }   
                     
        });
        
            await client.exec(sql2, function(err) {
                if (err) {
                res.send({ "error": err.message });                
            } 
            res.status(200).json({
                status:"Sucess",
                message: "Inserted Sucessully 2"
            });
        });
        
    } catch (e) {
        throw Error(e);
    }    
    }

    module.exports = {
    PurchaseOrder 
}