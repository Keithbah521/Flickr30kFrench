const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const fs = require('fs');
const Nocaptions = require('./Nocaptions');
const { stringify } = require('querystring');
const { json } = require('body-parser');
app.use(express.json({ extended: true }))
app.use('/public', express.static(__dirname + "/public"));
const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// Reading corresponding English and French Captions with images 
function initializeData() {
    try {
        const img_path = fs.readFileSync('./ImageName.txt', 'utf-8').split('\n')
        const Fr_Data = JSON.parse(fs.readFileSync('./FrenchCaptions.json'), 'utf-8')
        const En_Data = JSON.parse(fs.readFileSync('./captions.json'))
        return [En_Data, Fr_Data, img_path]
    } catch (error) {
        console.log(error)
    }
}
const [En, Fr, img_path] = initializeData()
    // Home route
app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/public/indexx.html'))
    })
    // Evaluate Captions
app.post('/compare', (req, res) => {
    try {
        const { english, french, imgPath, match, correctTrans } = req.body
        console.log(correctTrans)
        const Evaluate = Nocaptions({
                img: imgPath,
                EnCap: english,
                FrCap: french,
                Correc_fr: correctTrans,
                status: match
            })
            // Evaluate.save((error, response) => {
            //     if (error) {
            //         console.log(error)
            //     } else {
            //         console.log("succesfull inserted : ", response)
            //     }
            // })
        console.log(english, french, imgPath, match)
        const [en, fr, img] = GetrandomImgCap()
        res.send(JSON.stringify([en, fr, img]))
    } catch (error) {
        console.log(error)
    }

})
app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    // Get random English and French Captions and images
function GetrandomImgCap() {
    try {
        let randomCap = 0
        let img_idx = getRandomNumberInRange(1, 400)
            // let prev_img = [1, 2, 3]
            // if (prev_img.indexOf(img_idx) == -1) prev_img.push(img_idx)
            // else randomCap = getRandomNumberInRange(0, 5)
        console.log(`image:${ img_idx }`)
        const en = En[img_path[img_idx]][randomCap]
        let fr = Fr[img_path[img_idx]][0]
        const img = img_path[img_idx]
        return [en, fr, img]
    } catch (exceptionVar) {
        console.log(exceptionVar)
    }
}