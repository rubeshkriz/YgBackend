var client = require("../../model/Config");
var DbName = require("../../model/Db");


const CustomerComplaint = async (req, res) => {
    console.log(req.query)
    //1C03U
    try {
        if (req.params.id.length < 3) {
            if (req.query.DocNum) {
                // select B."SlpCode",B."CardName",B."DocDate",B."DocNum",B."DocStatus",A."ItemCode" from "RDR1" A INNER JOIN "ORDR" B on A."SlpCode"=B."SlpCode" where B."SlpCode"='3'
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "DocNum"='${req.query.DocNum}'`;
            } else if (req.query.CardName && req.query.DocDate) {
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}' AND "DocDate"='${req.query.DocDate}'`;
            } else if (req.query.CardName) {
                var sql = `select "CardName","DocDate","DocNum","DocStatus" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "CardName"='${req.query.CardName}'`;
            } else if (req.query.DocDate) {
                var sql = `select "DocDate","CardName" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}' AND "DocDate"='${req.query.DocDate}'`;
            } else {
                var sql = `select "DocDate","DocNum","CardName","DocTotal","DocStatus","DocTotal" from ${DbName}."ORDR" WHERE "SlpCode"='${req.params.id}'`;
            }
        } else {
            if (req.query.EndCustomer) {
                var sql = `select "U_ECusGST","U_CardName","U_CardCode" from ${DbName}."@INSY_OCEND" WHERE "U_CardCode"='${req.params.id}'`;
            } else if (req.query.ItemCode) {
                var sql = `select "ItemCode","ItemName","SalPackMsr","SalPackUn","U_TaxRate","PrdStdCst" from ${DbName}."OITM" where "ItemCode"='${req.query.ItemCode}'`;
            } else {
                // var sql = `select "CardCode","CardName" from ${DbName}."OCRD" WHERE "CardCode"='${req.params.id}'`;
                // var sql = `INSERT INTO ${DbName}."ODRF" ("DocNum","DocEntry","CardName") VALUES ('${req.body.id}','${req.body.DocEntry}','${req.body.CardName}')`;
                var sql2 = `INSERT INTO ${DbName}."@INS_OCCM" ("DocNum","DocEntry","U_CardCode","U_CardName","U_ItemCode","U_ActTakn","U_Status","U_ItemName","U_Complnt","U_DocDate") 
                VALUES ('${req.body.DocNum}','${req.body.DocEntry}','${req.body.U_CardCode}','${req.body.U_CardName}','${req.body.U_ItemCode}','${req.body.U_ActTakn}','${req.body.U_Status}','${req.body.U_ItemName}','${req.body.U_Complnt}','${req.body.U_DocDate}')`;
            }
        }
        // console.log(sql);
        console.log(sql2);
        // await client.exec(sql, function (err) {
        //     if (err) {
        //         res.send({ "error": err.message });
        //     }

        // });

        await client.exec(sql2, function (err) {
            if (err) {
                res.send({ "error": err.message });
            }
            res.status(200).json({
                status: "Sucess",
                message: "Inserted Sucessully 2"
            });
        });

    } catch (e) {
        throw Error(e);
    }
}
module.exports = {
    CustomerComplaint
}