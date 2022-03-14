const express = require("express");
var router = express.Router();
const upload = require('../middleware/fileupload');


///////////////////////////////////////////////////////////////////////
/////////////file imports
const {isAuthenticatedUser} = require("../middleware/auth")
const salesQuotation = require('./salesQuotation/salesQuotation');
const saleOrder = require('./saleOrder/saleOrder');
const salesInvoice = require('./salesInvoice/salesInvoice');
const customerOutstanding = require('./customerOutstanding/customerOutstanding');
const penaltyDetails = require('./penaltyDetails/penaltyDetails');
const Distributor = require('./Distributor/Distributor');
const CourierDetails = require('./CourierDetails/CourierDetails');
const stockReport = require('./stockReport/stockReport');
const backlogReport = require('./backlogReport/backlogReport');
const ADR = require('./ADR/ADR');
const PurchaseOrder = require('./PurchaseOrder/PurchaseOrder');
const Item = require('./Item/Item');
const EndCustomer = require('./EndCustomer/EndCustomer');
const login = require('./login/login');
const Requirement = require('./login/login');
const CustomerComplaint = require('./CustomerComplaint/CustomerComplaint');

////////////////////////////////////////////////////////////////////////

router.get("/salesQuotation/view/:id", salesQuotation.salesQuotation);
router.get("/saleOrder/view/:id", saleOrder.saleOrder);
// router.get("/salesInvoice/view",isAuthenticatedUser, salesInvoice.salesInvoice);
router.get("/salesInvoice/view/:token/:id",isAuthenticatedUser, salesInvoice.salesInvoice);
router.get("/customerOutstanding/view/:id", customerOutstanding.customerOutstanding);
router.get("/penaltyDetails/view/:id", penaltyDetails.penaltyDetails);
router.get("/CourierDetails/view/:id", CourierDetails.CourierDetails);
router.get("/Distributor/view/:id", Distributor.Distributor);
router.get("/stockReport/view/:id", stockReport.stockReport);
router.get("/backlogReport/view/:id", backlogReport.backlogReport);
router.post("/ADR/view/:id", ADR.ADR);
router.get("/Item/view/:id", Item.Item);
router.get("/EndCustomer/view/:id", EndCustomer.EndCustomer);
router.post("/PurchaseOrder/view/:id", PurchaseOrder.PurchaseOrder);
router.post("/CustomerComplaint/view/:id", CustomerComplaint.CustomerComplaint);

router.post("/login", login.SelectUser);
router.get("/logout", login.logout);


router.post("/webmaster",upload.uploadad,(req,res)=>{
    res.send("ok")
});


module.exports = router;