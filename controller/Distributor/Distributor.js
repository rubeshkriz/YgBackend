var client = require("../../model/Config");
var DbName = require("../../model/Db");

const Distributor =   async(req, res) => {
    let sql2
    console.log(req.query)
    try {
         if(req.params.id.length < 3){
            if(req.query.CardName && req.query.DocDate){ 
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."INV1" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}' AND "DocDate"='${req.query.DocDate}'`;
            }else if(req.query.CardName){ 
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."INV1" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}'`;
            }else if(req.query.DocDate){
                var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."INV1" WHERE "SlpCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
            }else{
            var sql = `select "CardCode" from ${DbName}."OCRD" where "SlpCode"='${req.params.id}'`;
        }
    }else{
        if(req.query.DocDate){
            var sql = `select "CardCode","CardName","DocType","DocNum","DocDate","DocDueDate","NumAtCard","PaidSum",("DocTotal"-"PaidSum") as "BalaneAmount" from ${DbName}."INV1" WHERE "CardCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
        }else{
        var sql = `select sum(A."U_TotalValue") as "Total",sum(A."U_ActValue") as "ActualTotal",sum(A."U_ABT") as "AbTotal",sum(A."U_ABA")
        as "AbActualTotal",sum(A."U_GBT") as "GbTotal",sum(A."U_GBA") as "GbActualTotal",sum(A."U_Insertt") as "InsertTotal",sum(A."U_InsertA") as "InsertActualTotal"
        from ${DbName}."@INSY_DYT1" A Inner Join ${DbName}."@INSY_ODYT" B on A."DocEntry" = B."DocEntry" where B."U_CardCode"='${req.params.id}'`;
    }
    }
        
        console.log(sql);           
        await client.exec(sql, function(err, datas) {
            if (err) {
                res.send({ "error": err.message });
            }
            let CardCodeDatas = datas.map((data)=>{
                // console.log(data.CardCode);
                sql2 = data.CardCode
            })
            // console.log(CardCodeDatas);
            res.status(200).json({
                status:"Sucess",
                message: datas
            });
        });
    } catch (e) {
        throw Error(e);
    }    
    }

    module.exports = {
        Distributor 
}