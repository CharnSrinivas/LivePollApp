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
var os_1 = require("os");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
var IndexHtml = '/index.html';
var PageTitle = "%%PAGE_TITLE%%";
var PageDescription = "%%PAGE_DESCRIPTION%%";
var OgTitle = "%%OG_TITLE%%";
var OgDescription = "%%OG_DESCRIPTION%%";
var OgImage = "%%OG_IMAGE%%";
var LogoPath = '/media/images/Logo.png';
var getFormattedIndexFile = function (file_data, title, description, host, og_image, og_title, og_description) {
    var _a;
    return file_data.replace(PageTitle, 'LivePollApp')
        .replace(PageDescription, "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.")
        .replace(OgTitle, og_title !== null && og_title !== void 0 ? og_title : title)
        .replace(OgDescription, og_description !== null && og_description !== void 0 ? og_description : description)
        .replace(OgImage, (_a = og_image !== null && og_image !== void 0 ? og_image : "https://" + host) !== null && _a !== void 0 ? _a : "" + LogoPath);
};
app.get('/', function (req, res, next) {
    var req_path = req.originalUrl;
    if (req_path == '/') {
        req_path = IndexHtml;
    }
    console.log(req.headers.host);
    var filePath = path_1.default.resolve(__dirname, "../build".concat(req_path));
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(getFormattedIndexFile(file_data, "LivePollApp", "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.", req.headers.host));
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
    console.log(req.headers);
    fs.readFile(filePath, 'utf8', function (err, file_data) {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(getFormattedIndexFile(file_data, "Dashboard | LivePollApp", "Create and vote poll(s) with Live poll App for Free.Simple easy and secure.", req.headers.host));
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
            return res.send(getFormattedIndexFile(file_data, "Sign In | LivePollApp", "Create and vote poll(s) with Live poll App for Free.Simple easy and secure.", req.headers.host));
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
            return res.send(getFormattedIndexFile(file_data, "Sign In | LivePollApp", "Create and vote poll(s) with Live poll App for Free.Simple easy and secure.", req.headers.host));
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
            return res.send(file_data
                .replace(PageTitle, "Create Poll| LivepollApp")
                .replace(PageDescription, "Create you poll in seconds and share it to everyone.Simple and Easy.")
                .replace(OgTitle, "Create Poll| LivepollApp")
                .replace(OgDescription, "Create you poll in seconds and share it to everyone.Simple and Easy.")
                .replace(OgImage, "https://" + req.headers.host + LogoPath));
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
// app.get('/image', (req, res, next) => {
//     let base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATcSURBVHgB7Zs9b9tWFIbfS1lS0tqOWg+V0BqRhix1gChTgQ61MnXoUAcFstoG7AKd4v6Cxr+g9lSgdpF4bICi6dIWXaJ2aMeoQN3FgygkgJ3BgPyRKJFi3pxDUYpkfpikRImM8gCSRYqU+fKee+45l+cKBMjtVDl1ch4FAWUWAikpZZ52p+iVPXWoaryqdMy/QqDUkCh9tZdTERACfWYjXS4oijJLAuZoM4/eKAmIYl1q6/2+CX0Rzi2rncOcFGKeNgsIhpIm5fqXe7k76AM9C9/MVG4C8haaJjwIVLoBq73eAN/C2aSFELdh7q+DQqXutLi8lyvCB56F62Z9XvlGQq4gBJAPWFNq2upiNVf1dp4HvkuXs3Eh7mN4rWyH2pDymhcHqLg9kE2bRD9A+EQz3CAP+BrdnuBK+Ob7lXnRbOlBOTA/pPgaN9OVeTcHn2nqLBqavIMoIcXC0t7FLadDHIUbnvs+Igh5/GtOHt9WuOHIuE+H2bydqJLDu2rn8Cz7OA9Z8fD36bPQNbAWqy8thfM4jXB6b69kDS0mTKYe5X5th1V/N7W4EYa+Vlhp6mrxH9LlBRmw8MzHSVz89C0kJl/d8/qhhv3tOnbuPkFQUIj99fJubq213SV8M6OWEWDfnrqcwNwfGdvvf/3iMXb/eYaAqMZqMteK6du3nVsbATu0d2fijt+nyRoCJNWgOYPWRls4mfhNBMz4B2MYJkpzoqT5md84WEHv00RRoNBKZHThcYFQ5NYDosBvhqmLWYwINLR9zn+VETLzFnkOYxUy81ESrXOSQGFMSuSFzylHDkKSF7qDv6OHLxB6YiScbP4KfPDR6ju4vDxp2n9Mwv9a2Q8yEOkZIRW9uTynntzSVqKZ8ekxzCxPIMxIIfMsPAuPcOjpROKC6znMoUA9O+VLeNSRpDncTRMgww2ePTIx3X25zw80PaX1QySEs8P87Kf3LJOcnbvH+ijiFTZ1FSFnZmnCNrO7dGMcUzMJeIGcm8rCPT1sGwbJM0aJ8WlvhktBm6pw6QUiTmLSW+hJ4/gB5ebhb/G+I1FiGypixBAaCY8lR094QyHhi6o+61jC6KCXkenukhzcLxgZ5J/83honihgRGhL6QwVduPFcqYiAqR9KDJl2tWQ7MhBSbrk92+8sS/3wBEFw/NDd73KBYOtzW7hyDvfgMoqrn5Ec7P793HJ/5bea43k7P1o/O+NkxPF63CUqamdRYFfIs5EprwiIb+ECDhMv3XjblDHtbzewvXHoeN7UhwnTZEXl96e2AvicT9am9Ji882Hj0aMX+H/jCP85/L8W1NqLtsKZoB8cDgl1aTeb69xhiv65TBKvGVaaTMKbHv6VE4g+ct2q+sky36Mw9hYikKe7QI3VdC0mLIVzGMu1oYhAru6ArsGuuNc2w+eBnvrGdUQUvnanol7HqQ3uG1oEnZ3moo7d1dTF9+nyghKRaqjT47UdrudsjPq3nxHeakdewXTd7YqFN4X6buAfjiXl1XCN83I9VrMv1rXjzWIcvxjVkIMs+q1KyNXOKkU/9G2loXEDuFYumNISiaIGuRV/hnteVxxZ0fcllk0HyOVjeiVVz0ssjfnAol+TtqPvwjsxbkK+WWcjrlCrNRfUilPdgh7p0L6qkKIkhXZAe4oUYxf70bJ2vASk2uby59DRnAAAAABJRU5ErkJggg==";
//     var img = Buffer.from(base64.split(',')[1], 'base64');
//     res.writeHead(200, {
//         'Content-Type': 'image/png',
//         'Content-Length': img.length
//     });
//     res.end(img);
//     // res.end(base64);
// })
app.use(express_1.default.static(path_1.default.resolve(__dirname, '..', 'build')));
app.listen(PORT, function () {
    console.log("App launched at Port: " + PORT);
});
console.log((0, os_1.hostname)());
