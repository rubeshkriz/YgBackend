var client = require("../../model/Config");
var DbName = require("../../model/Db");

const stockReport =   async(req, res) => {
    console.log(req.query)
    try {
        // 12000003,1C03U,YGFGTN
         if(req.params.id.length < 3){
            if(req.query.ItemCode && req.query.WhsCode){ 
                var sql = `Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTN' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMN' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
                
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTS' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
                
                union all
                
                
                Select distinct D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMS' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'`;
    
            }else if(req.query.ItemCode){ 
                var sql = `Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTN' and A."ItemCode"='${req.query.ItemCode}'
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMN' and A."ItemCode"='${req.query.ItemCode}'
                
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTS' and A."ItemCode"='${req.query.ItemCode}'
                
                union all
                
                
                Select D."DocNum",distinct D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMS' and A."ItemCode"='${req.query.ItemCode}'`;
    
            }else if(req.query.WhsCode){ 
                var sql = `Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTN' and B."WhsCode" ='${req.query.WhsCode}'
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMN' and B."WhsCode" ='${req.query.WhsCode}'
                
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTS' and B."WhsCode" ='${req.query.WhsCode}'
                
                union all
                
                
                Select D."DocNum",distinct D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMS' and B."WhsCode" ='${req.query.WhsCode}'`;
    
            }else{ 
                var sql = `Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTN'
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMN'
                
                
                union all
                
                
                Select D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGTS'
                
                union all
                
                
                Select distinct D."DocNum",D."SlpCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
                from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
                left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
                where D."SlpCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
                and B."WhsCode" ='YGFGMS'`;
    
            }
    }else{
        if(req.query.ItemCode && req.query.WhsCode){ 
            var sql = `Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
            from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
            left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
            where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
            and B."WhsCode" ='YGFGTN' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
            
            union all
            
            
            Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
            from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
            left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
            where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
            and B."WhsCode" ='YGFGMN' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
            
            
            union all
            
            
            Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
            from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
            left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
            where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
            and B."WhsCode" ='YGFGTS' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'
            
            union all
            
            
            Select D."DocNum",distinct D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
            from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
            left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
            where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
            and B."WhsCode" ='YGFGMS' and A."ItemCode"='${req.query.ItemCode}' and B."WhsCode" ='${req.query.WhsCode}'`;

        }else if(req.query.ItemCode){
        var sql = `Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTN' and A."ItemCode"='${req.query.ItemCode}' 
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMN' and A."ItemCode"='${req.query.ItemCode}' 
        
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTS' and A."ItemCode"='${req.query.ItemCode}' 
        
        union all
        
        
        Select D."DocNum",distinct D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMS' and A."ItemCode"='${req.query.ItemCode}' `;
    }else if(req.query.WhsCode){ 
        var sql = `Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTN' and B."WhsCode" ='${req.query.WhsCode}'
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMN' and B."WhsCode" ='${req.query.WhsCode}'
        
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTS' and B."WhsCode" ='${req.query.WhsCode}'
        
        union all
        
        
        Select D."DocNum",distinct D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMS' and B."WhsCode" ='${req.query.WhsCode}'`;

    }else {
        var sql = `Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101'  and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTN'
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode" 
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMN'
        
        
        union all
        
        
        Select D."DocNum",D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price" 
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode" and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and  B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGTS'
        
        union all
        
        
        Select D."DocNum",distinct D."CardCode",A."ItemCode",A."ItemName",A."ItmsGrpCod",B."OnHand",B."WhsCode",C."Price"  
        from ${DbName}."ORDR" D, ${DbName}."OITM" A inner Join ${DbName}."OITW" B on A."ItemCode" =B."ItemCode"
        left Join ${DbName}."ITM1" C on A."ItemCode" =B."ItemCode"  and C."ItemCode" =B."ItemCode"
        where D."CardCode"='${req.params.id}' and A."ItmsGrpCod"='101' and B."OnHand"<>'0' and C."PriceList"='1'
        and B."WhsCode" ='YGFGMS'`;
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
        stockReport 
}