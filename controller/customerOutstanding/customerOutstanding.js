var client = require("../../model/Config");
var DbName = require("../../model/Db");

const customerOutstanding =   async(req, res) => {
    console.log(req.query)
    try {
         if(req.params.id.length < 3){
            if(req.query.CardName && req.query.DocDate){ 
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}' AND "DocDate"='${req.query.DocDate}'`;
            }else if(req.query.CardName){ 
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}'`;
            }else if(req.query.DocDate){
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
            }else{
            var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount"  from ${DbName}."OINV" WHERE "SlpCode"='${req.params.id}'`;
        }
    }else{
        if(req.query.DocDate){
            var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."OINV" WHERE "CardCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
        }else{
        var sql = `select "CardName",("DocTotal"-"PaidSum") as "BalanceAmount" from ${DbName}."OINV" WHERE "CardCode"='${req.params.id}'`;
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
        customerOutstanding 
}