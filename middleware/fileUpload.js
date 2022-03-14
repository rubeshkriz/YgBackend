const path = require("path");
var multer = require('multer');

var storagead = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/image')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadad = multer({ storage: storagead }).fields([{ name: "IMAGE", maxCount: 20 }]);



// SET STORAGE
var singlestorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/video')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadsingle = multer({ storage: singlestorage }).fields([{ name: "PDF", maxCount: 10 }, { name: "IMAGE", maxCount: 10 }]);


// SET STORAGE
var Complaintstorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/complaint')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadComplaint = multer({ storage: Complaintstorage }).fields([{ name: "INVOICECOPYIMAGE", maxCount: 10 }, { name: "LRCOPYIMAGE", maxCount: 10 }, { name: "PHOTOGRAPHSIMAGE", maxCount: 10 }, { name: "DRIVERVERIFIEDIMAGE", maxCount: 10 }]);

module.exports = {
    uploadad,
    uploadsingle,
    uploadComplaint
}