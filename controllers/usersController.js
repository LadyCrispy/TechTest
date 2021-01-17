'use strict';

const fetch = require('node-fetch')

module.exports = {

    getUsers: async function (req, res) {

        console.log('Starting find users')

        const page = req.query.page || 1
        const limit = req.query.limit || 20

        try {

            if (limit % 20 != 0) return res.status(400).json({ message: 'Limit must be multiple of 20' });

            let num = limit / 20
            let endPage = num * page
            let startPage = endPage - num + 1

            let data = []

            for (let i = startPage; i <= endPage; i++) {
                const apiResponse = await fetch(`https://gorest.co.in/public-api/users?page=${i}`)
                const apiResponseJson = await apiResponse.json()
                data = await data.concat(apiResponseJson.data)
            }

            return res.status(200).send({ 
                "code": 200,
                data 
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ 'code': 500, 'message': "An error happened" })
        }
    },

    getUserById: async function (req, res) {
        console.log(`Starting find user with Id: ${req.params.id}`)

        const id = req.params.id

        try {

            let data

            const userData = await fetch(`https://gorest.co.in/public-api/users/${id}`)
            const userPosts = await fetch(`https://gorest.co.in/public-api/users/${id}/posts`)

            const userDataJson = await userData.json()
            const userPostsJson = await userPosts.json()

            if(userDataJson.code != 200) return res.status(userDataJson.code).send({ code : userDataJson.code, message: userDataJson.data.message });

            data = userDataJson.data
            data.posts = userPostsJson.data

            return res.status(200).send({
                "code": 200,
                data
            })
        } catch (err) {
            console.log(err)
            res.status(500).send({ 'message': "An error happened" })
        }
    }

};
