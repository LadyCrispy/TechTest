'use strict';

const mongoose = require('mongoose');

var Promise = global.Promise;
mongoose.promise = Promise;
const { Builder, By, Key, until } = require('selenium-webdriver');


module.exports = {

    getApps: async function (req, res) {

        console.log('Starting find apps')

        let descriptions = []
        let downloads = []

        async function getDesc(num) {
            if (num > 0) await driver.navigate().back()
            await titles[num].click()
            await driver.wait(until.elementLocated(By.xpath('//*[@jsname="sngebd"]'), 30000))
                .then(async data => {
                    let desc = await driver.findElement(By.xpath('//*[@jsname="sngebd"]'), 30000)
                    await desc.getText().then(res => {
                        descriptions.push(res)
                    })

                    // let select = await driver.findElements(By.xpath('//div[contains(text(), "Descargas")]'))
                    let download = await driver.findElements(By.xpath('//*[@class="htlgb"]'), 30000)
                    await download[4].getText().then(res => {
                        downloads.push(res)
                    })
                })
        }

        let driver = new Builder().forBrowser('chrome').build();
        driver.get('https://play.google.com/store/apps');

        let titles = await driver.findElements(By.className("WsMG1c"))

        let promesitas = []
        for (let i = 0; i < 4; i++) {
            promesitas.push(titles[i].getText())
        }

        let names = {}

        Promise.all(promesitas).then(async function (data) {
            for (let key in data) {
                names[key] = { 'title': data[key] }
            }
        })
            .then(async function (data) {

                for (let j = 0; j < 4; j++) {
                    await getDesc(j)
                }

                for (let key in descriptions) {
                    names[key].description = descriptions[key]
                }

                for (let key in downloads) {
                    names[key].downloads = downloads[key]
                }

                return res.json({data: names})

            })
            .catch(err => console.log(err))


    },

    getAppsByCategory: function (req, res) {
        console.log(`Starting find apps by category. Category: ${req.params.category}`)
        res.json({
            "hola": {
                "nombre": "find five by categ."
            }
        })
    }

};
