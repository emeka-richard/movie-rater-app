const fsPromises = require("fs").promises
const path = require("path")
const {v4:uuidv4} = require("uuid")
// let collectionDB = require("../DB/collections.json")
// const mutatingCollDB = (collectionDatum)=> collectionDB = collectionDatum
const userMDB = require("../DB/user-mongo")


const getAllCollections = (req, res)=>{
    res.status(200).json(collectionDB)
}

const getEachCollection = (req, res)=>{
    const collection = collectionDB.find((singleCollection)=> {return singleCollection.id === parseInt(req.params.id)})
    res.status(200).json(collection)
}

const addNewCollection = (req, res)=>{
    const newCollection = {
        id: uuidv4(),
        name: req.body.name,
        describ: req.body.description
    }
    if(!newCollection.name || !newCollection.describ) return res.status(400).json({message: "Collection title and description are required"})
    mutatingCollDB([...collectionDB, newCollection])
    fsPromises.writeFile(path.join(__dirname, "..", "DB", "collections.json"), JSON.stringify(collectionDB))
    res.status(201).json(collectionDB)
}

const updateExistingCollection = (req, res)=>{
    const updatingCollection = {
        id: req.body.id,
        name: req.body.name,
        describ: req.body.description
    }
    collectionDB.forEach((collection)=> {
        if(collection.id === updatingCollection.id){
            collection.name = updatingCollection.name
            collection.describ = updatingCollection.describ
        }
    })
    fsPromises.writeFile(path.join(__dirname, "..", "DB", "collections.json"), JSON.stringify(collectionDB))
    res.status(201).json(collectionDB)    
}

const deleteExistingCollection = (req, res)=>{
    const deletingCollection = {
        id: req.body.id,
        name: req.body.name,
        describ: req.body.description
    }
    const otherCollections = collectionDB.filter((collection)=>{ collection.id !== deletingCollection.id})
    mutatingCollDB([...otherCollections])
    fsPromises.writeFile(path.join(__dirname, "..", "DB", "collections.json"), JSON.stringify(collectionDB))
    res.status(201).json(collectionDB)    
}

module.exports = { getAllCollections, getEachCollection, updateExistingCollection, addNewCollection, deleteExistingCollection}