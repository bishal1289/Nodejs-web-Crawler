const express = require('express');
const app = express()
const request = require('request');
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream("post.csv");
writeStream.write(`Links_Name \t Links \n`);

const arr = [];
const URL = "https://www.google.com/";
request(URL, function (err, res, body) {
    if(err)
    {
        console.log(err);
    }
    else
    {
        let $ = cheerio.load(body);
        const links = $("a");

        links.each((index, value) => {
            console.log($(value).text(), " --> ", $(value).attr("href"));
            let url = $(value).attr("href");
            writeStream.write(`${$(value).text()},${url} \n`);
            if (url.includes("https")) {
                arr.push($(value).text() + " --> ", $(value).attr("href"));
            }
        })

    }
});

app.get("/", (req, res) => {
    res.send(arr)
})


app.listen(3001, ()=> console.log("Server Started at PORT 3001 ❤️❤️❤️"))