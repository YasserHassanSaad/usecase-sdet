const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")


const app = express();
app.use(express.static("client"));
app.use(bodyParser.json());
require("dotenv").config()


const PORT = process.env.PORT || 3000;
const HOST_NAME = process.env.DATA || "localhost"
const DATABASE_PATH = process.env.DATABASE_PATH || "./EKSdetUseCase.json"


const eurekaClient = require("./eureka-config")
let jsonData = require(DATABASE_PATH)


eurekaClient.start(err => {
  if (err) {
    console.error(err);
  }
  console.log('Node.js service registered with Eureka');
});


// Retrieve all records
app.get('/api/data', (req, res) => {
    res.json(jsonData);
});


// Retrieve a record by appName
app.get('/api/data/:appName', (req, res) => {
    const {
        appName
    } = req.params;
    const record = jsonData.find((item) => item.appName === appName);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({
            error: 'Record not found'
        });
    }
});


// Delete a record by appName
app.delete('/api/delete/:appName', (req, res) => {
    const {
        appName
    } = req.params;
    const index = jsonData.findIndex((item) => item.appName === appName);
    if (index !== -1) {
        jsonData.splice(index, 1);
        fs.writeFile(DATABASE_PATH, JSON.stringify(jsonData), (err) => {})
        res.json({
            message: 'Record deleted successfully'
        });
    } else {
        res.status(404).json({
            error: 'Record not found'
        });
    }
});


// Update a record by appName
app.put('/api/update/:appName', (req, res) => {
    const {
        appName
    } = req.params;
    const updatedData = req.body;
    const index = jsonData.findIndex((item) => item.appName === appName);
    if (index !== -1) {
        jsonData[index].appData.appOwner = updatedData.owner; 
        if(updatedData.isValid === "true"){
            jsonData[index].appData.isValid = true; 
        } else if(updatedData.isValid === "false"){
            jsonData[index].appData.isValid = false; 
        }
        fs.writeFile(DATABASE_PATH, JSON.stringify(jsonData), (err) => {})
        res.json({
            message: 'Record updated successfully'
        });
    } else {
        res.status(404).json({
            error: 'Record not found'
        });
    }
});


app.listen(PORT, () => {
    console.log(`Node.js web app listening at http://${HOST_NAME}:${PORT}`);
});