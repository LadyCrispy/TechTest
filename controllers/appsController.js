'use strict';

const { Builder, By, Key, until } = require('selenium-webdriver');

module.exports = {

    getApps: async function (req, res) {

        console.log('Starting find apps')
        let driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
        driver.get('https://play.google.com/store/apps');

        try {


            let descriptions = []
            let downloads = []

            async function getDesc(num) {
                if (num > 0) await driver.navigate().back()
                await titles[num].click()
                await driver.wait(until.elementLocated(By.xpath('//*[@jsname="sngebd"]'), 4000))
                    .then(async data => {
                        let desc = await driver.findElement(By.xpath('//*[@jsname="sngebd"]'), 4000)
                        await desc.getText().then(res => {
                            descriptions.push(res)
                        })

                        let download = await driver.findElements(By.xpath('//*[@class="htlgb"]'), 4000)
                        await download[4].getText().then(res => {
                            downloads.push(res)
                        })
                    }).catch(err => {
                        console.log(err)
                        driver.quit()
                        res.json('err')
                    })
            }


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

                    (await driver).quit()
                    return res.json({ data: names })

                })
                .catch(err => {
                    console.log(err)
                    driver.quit()
                    res.json('err')
                })
        } catch (err) {
            driver.quit()
            res.json('err')
        }
    },




    getAppsByCategory: async function (req, res) {
        console.log(`Starting find apps by category. Category: ${req.params.category}`)

        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        let category = capitalize(req.params.category)

        let driver = new Builder().forBrowser('chrome').build();
        driver.manage().window().maximize();
        driver.get('https://play.google.com/store/apps');
        try {


            await driver.findElement(By.id("action-dropdown-parent-Categorías")).click()
            let btn = await driver.findElement(By.xpath(`//*[contains(text(), '${category}')]`), 4000)
            btn.click()

            let descriptions = []
            let downloads = []

            await driver.wait(until.titleContains(`${category}`), 4000)

            let apps = {}

            let section = await driver.findElement(By.xpath(`//*[@style="visibility: visible; opacity: 1;"]`))

            let names = await section.findElements(By.className("WsMG1c"))


            let promesitas = []

            for (let i = 0; i < 4; i++) {
                promesitas.push(names[i].getText())
            }

            async function getDesc(num) {
                if (num > 0) await driver.navigate().back()
                await names[num].click()
                await driver.wait(until.elementLocated(By.xpath('//*[@jsname="sngebd"]'), 4000))
                    .then(async data => {
                        let desc = await driver.findElement(By.xpath('//*[@jsname="sngebd"]'), 4000)
                        await desc.getText().then(res => {
                            descriptions.push(res)
                        })

                        let download = await driver.findElements(By.xpath('//*[@class="htlgb"]'), 4000)
                        await download[4].getText().then(res => {
                            downloads.push(res)
                        })
                    }).catch(err => {
                        driver.quit()
                        res.json('err')
                    })
            }

            Promise.all(promesitas).then(async function (data) {
                for (let key in data) {
                    apps[key] = { 'title': data[key] }
                }
            })
                .then(async function (data) {

                    for (let j = 0; j < 4; j++) {
                        await getDesc(j)
                    }

                    for (let key in descriptions) {
                        apps[key].description = descriptions[key]
                    }

                    for (let key in downloads) {
                        apps[key].downloads = downloads[key]
                    }

                    (await driver).quit()
                    return res.json({ data: apps })

                })
                .catch(err => {
                    console.log(err)
                    driver.quit()
                    res.json('err')
                })
        } catch (err) {
            driver.quit()
            res.json('err')
        }

    }

};
