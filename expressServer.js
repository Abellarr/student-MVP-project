// const dotenv = require('dotenv');
// dotenv.config();
// console.log(process.env);
const express = require('express');
const app = express();
const fs = require('fs');
const { Pool } = require('pg');
const cors = require('cors');
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const pool = require('./connectDB.js');


// GET request: Returns info to client for all characters
app.get('/api/chars', (req,res, next)=>{
    console.log(req.method);
    console.log('Request for all chars')
    pool.query('SELECT * FROM character;', (err, result)=>{
        if (err){
            return next(err);
        }
        let rows = result.rows;
        res.status(200).send(rows);
    })
})


// GET request: Returns info to client for a specific character (/chars/:id/)
app.get('/api/chars/:id/', (req,res, next)=>{
    console.log(req.method);
    const charId = parseInt(req.params.id);
    // Checks to see if (/:id) is a valid number
    if (Number.isNaN(charId)){
        console.log('Error Invalid Path Name')
        return res.status(404).send('Error Invalid Path Name')
    } else {
        console.log(`Request for char with id: ${charId}`)
        pool.query('SELECT * FROM character WHERE id = $1;', [charId], (err, result)=>{
            if (err){
                return next(err);
            }
            let char = result.rows;
            // Checks if any chars are returned before responding
            if (char[0]) {
                res.status(200).send(char);
            } else {
                res.status(404).send('Error Not found')
            }
        })
    }
})

// POST request: Takes in request body and creates an entry into npc_char table with associated key from npc_type table (/:id/)
app.post('/api/chars', (req, res, next)=>{
    console.log(req.method);
    const { name, race, job, background, npcType } = req.body;
    const hp = parseInt(req.body.hp)
    // checks for missing information in request and if the hitPoints block is a number
    if (!name || !race || !job || !hp || !background || !npcType || Number.isNaN(hp)) {
        console.log('Error: Input incorrect or missing information');
        return res.status(400).send('Error: Input missing or corrected information');
    } else {
        pool.query('INSERT INTO character (name, race, job, hp, background, npc_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
        [name, race, job, hp, background, npcType], (err, result)=>{
            if (err){
                return next(err);
            }
            let charInfo = result.rows[0];
            console.log('Added: ' + name);
            res.status(200).send(charInfo);
        })
    } 
})

// PATCH request: Takes in request body and modifies an entry in the npc_char table (/chars/:charid/)
app.patch('/api/chars/:id/', (req,res, next)=>{
    console.log(req.method);
    const charId = parseInt(req.params.id);
    // Checks to see if (/:id) and (/:charid) are valid numbers
    if (Number.isNaN(charId)){
        console.log('Error Invalid Path Name')
        return res.status(404).send('Error Invalid Path Name')
    }
    const { name, race, job, hp, background, npcType } = req.body;
    // Checks if the character exists in the table
    pool.query('SELECT * FROM character WHERE id = $1;', [charId], (err, result)=>{
        let info = result.rows[0];

        if (err){
            next(err);
        }
        // Checks if hit points is a valid number
        if (hp !== undefined && Number.isNaN(parseInt(hp))){
            console.log('Error Invalid Input1');
            return res.status(400).send('Error Invalid Input');
        } else if (info){
            // Returns notification if character is successfully updated
            // let hp = parseInt(hitPoints);
            if (name){
                pool.query('UPDATE character SET name = $1 WHERE id = $2;', [name, charId], (err, result)=>{
                    console.log(`Character name updated: ${charName}`);
                });
            }
            if (race){
                pool.query('UPDATE character SET race = $1 WHERE id = $2;', [race, charId], (err, result)=>{
                    console.log(`Character race updated: ${race}`);
                });
            }
            if (job){
                pool.query('UPDATE character SET job = $1 WHERE id = $2;', [job, charId], (err, result)=>{
                    console.log(`Character class updated: ${classType}`);
                });
            }
            if (background){
                pool.query('UPDATE character SET background = $1 WHERE id = $2;', [background, charId], (err, result)=>{
                    console.log(`Character background updated: ${background}`);
                });
            }
            if (hp){
                pool.query('UPDATE character SET hp = $1 WHERE id = $2;', [hp, charId], (err, result)=>{
                    console.log(`Character hit points updated: ${hp}`);
                });
            }
            if (npcType){
                pool.query('UPDATE character SET npc_type = $1 WHERE id = $2;', [npcType, charId], (err, result)=>{
                    console.log(`Character npc type updated: ${type}`);
                });
            }
            return res.status(200).send('Character Updated');
        } else {
            // Returns not found if (/:id/) doesn't match up
            console.log('Error Not Found');
            return res.status(404).send('Error Not Found');
        }
    });  
})

// DELETE request: Deletes a character (/:charid/) from the database and responds to client with deleted info
app.delete('/api/chars/:id/', (req,res, next)=>{
    console.log(req.method);
    const charId = parseInt(req.params.id);
    // Checks to see if (/:id) and (/:charid) are valid numbers
    if (Number.isNaN(charId)) {
        console.log('Error Invalid Path Name');
        return res.status(404).send('Error Invalid Path Name');
    } else {
        pool.query('DELETE FROM character WHERE id = $1 RETURNING *;', [charId], (err, result)=>{
            if (err){
                return next(err);
            }
            let delChar = result.rows[0];
            // Checks if character was in the database and responds
            if (delChar){
                console.log(delChar);
                res.status(200).send(delChar);
            } else {
                console.log('Character not found');
                res.status(404).send('Error Not Found');
            }
        })
    }
})

// Generic error handling for any internal next() errors encountered.
app.use((err,req,res,next)=>{
    console.log('Error sent to middleware')
    res.status(500).send('Internal Error');
})

// Sets my server to listen to the port variable, which is currently 3000
app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
})