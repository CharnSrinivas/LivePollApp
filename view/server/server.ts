import express from 'express';
import * as fs from 'fs';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 3000;
const IndexHtml = '/index.html';
const PageTitle = "%%PAGE_TITTLE%%";
const PageDescription = "%%PAGE_DESCRIPTION%%";
const OgTitle = "%%OG_TITLE%%";
const OgDescription = "%%OG_DESCRIPTION%%";
const OgImage = "%%OG_IMAGE%%";
app.get('/', (req, res, next) => {
    var req_path = req.originalUrl;
    if (req_path == '/') {
        req_path = IndexHtml;
    }

    const filePath = path.resolve(__dirname, `../build${req_path}`)
    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(
                file_data.replace(PageTitle, 'LivePollApp')
                    .replace(PageDescription,
                        "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.")
                    .replace(OgTitle, "LivePollApp")
                    .replace(OgDescription, "Create and vote poll(s) with Live poll App for Free.Simple easy and secure.")
                    .replace(OgImage, path.resolve('../build/media/images/Logo.png'))
            )
        }
        return res.sendFile(filePath);
    })
})

app.get('/dashboard', (req, res, next) => {

    var req_path = req.originalUrl;
    if (req_path == '/dashboard') {
        req_path = IndexHtml;
    }
    const filePath = path.resolve(__dirname, `../build${req_path}`)

    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(
                file_data.replace(PageTitle, 'LivePollApp')
                    .replace(PageDescription,
                        "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.")
                    .replace(OgTitle, "LivePollApp")
                    .replace(OgDescription, "Create and vote poll(s) with Live poll App for Free.Simple easy and secure.")
                    .replace(OgImage, path.resolve('../build/media/images/Logo.png'))
            )
        }
        return res.sendFile(filePath);
    })

})

app.get('/signin', (req, res, next) => {

    var req_path = req.originalUrl;
    if (req_path == '/signin') {
        req_path = IndexHtml;
    }
    const filePath = path.resolve(__dirname, `../build${req_path}`)

    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(
                file_data.replace(PageTitle, 'LivePollApp')
                    .replace(PageDescription,
                        "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.")
                    .replace(OgTitle, "LivePollApp")
                    .replace(OgDescription, "Create account in LivePollApp to make something awesome.")
                    .replace(OgImage, path.resolve('../build/media/images/Logo.png'))
            )
        }

        return res.sendFile(filePath);
    })

})

app.get('/signup', (req, res, next) => {

    var req_path = req.originalUrl;
    if (req_path == '/signup') {
        req_path = IndexHtml;
    }
    const filePath = path.resolve(__dirname, `../build${req_path}`)

    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(
                file_data.replace(PageTitle, 'LivePollApp')
                    .replace(PageDescription,
                        "Create custom online poll(s) with Live poll App for Free,And share your link to make people participate in poll.Create your poll in seconds. Ask a question, choose answers and share the link. Simple & Easy.")
                    .replace(OgTitle, "LivePollApp")
                    .replace(OgDescription, "Sign up to LivePollApp.")
                    .replace(OgImage, path.resolve('../build/media/images/Logo.png'))
            )
        }
        return res.sendFile(filePath);
    })

})
app.get('/create', (req, res, next) => {

    var req_path = req.originalUrl;
    if (req_path == '/create') {
        req_path = IndexHtml;
    }
    const filePath = path.resolve(__dirname, `../build${req_path}`)

    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data)
        }
        return res.sendFile(filePath);
    })

})


app.get('/vote', (req, res, next) => {

    var req_path = req.originalUrl;
    if (req_path == '/vote') {
        req_path = IndexHtml;
    }
    const filePath = path.resolve(__dirname, `../build${req_path}`)

    fs.readFile(filePath, 'utf8', (err, file_data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("<h2>Opps! Something went wrong </h2>").end();
        }
        if (req_path === IndexHtml) {
            return res.send(file_data)
        }
        return res.sendFile(filePath);
    })

})




app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
    console.log("App launched at Port: " + PORT);
})

