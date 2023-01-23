const jwt = require("jsonwebtoken")
const blogModel = require("../model/blogModel")
const { idCharacterValid } = require("../validatore/validator")


//      Authentication
const Authentication = async function (req, res, next) {
try {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(400).send({ status: false, message: "Token is mandatory" })

    let decodedToken = jwt.verify(token, "secret Project devo...")
    req.id = decodedToken.userId;
    next()
    }
catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}}


//     Authorisation
const authorisation = async function (req, res, next) {
try {
    const id = req.params.blogId
    if (id) {
    if (!idCharacterValid(id)) return res.status(400).send({ status: false, message: "Please provide the valid blogid2" })
    
    const data = await blogModel.findById(id)
    if (!data) return res.status(404).send({ status: false, message: "id not found in DB" })

    const authorid = data.authorId
    const reqId = req.id
    if (authorid != reqId) return res.status(400).send({ status: false, message: "Unauthorized User" })

    next()
    }
    else{
    const qid = req.query
    const reqID = req.id

    let count = 0;
    const qdata = await blogModel.find(qid).select({ _id: 0, authorId: 1 }) 
    if (qdata.length == 0) return res.status(404).send({ status: false, message: "id not found in DB" })

    for (let a = 0; a < qdata.length; a++) {    
    if ((qdata[a].authorId).toString() == reqID) {count++}   
    }

    if (count == 0) return res.status(400).send({ status: false, message: "Unauthorised User" })

    next()
    }
    }
catch(err) {
    return res.status(500).send({ status: false, msg: err.message })
    }}


//
module.exports={authorisation,Authentication}