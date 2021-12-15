"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs = __importStar(require("fs"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
var IndexHtml = '/index.html';
app.get('/', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/') {
        req_path = IndexHtml;
    }
    console.log(req.headers['user-agent']);
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.get('/dashboard', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/dashboard') {
        req_path = IndexHtml;
    }
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.get('/signin', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/signin') {
        req_path = IndexHtml;
    }
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.get('/signup', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/signup') {
        req_path = IndexHtml;
    }
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.get('/create', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/create') {
        req_path = IndexHtml;
    }
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.get('/vote', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/vote') {
        req_path = IndexHtml;
    }
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data);
        }
        return res.sendFile(filePath);
    });
});
app.use(express_1.default.static(path_1.default.resolve(__dirname, '..', 'build')));
app.listen(PORT, function () {
    console.log("App launched at Port: " + PORT);
});
