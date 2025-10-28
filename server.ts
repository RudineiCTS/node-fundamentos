import http from 'node:http';
import assert from "node:assert";
import fs from 'fs';
import {parse} from 'csv-parse';
import { createObjectCsvWriter } from 'csv-writer';

const server = http.createServer((req, res) => {
    const { method, url } = req;
    let idUnique = 1;
    const novaTarefa: {
        id: string;
        title: string;
        description: string;
        completed_at: string | null;
        update_at: string;
        created_at: string;
      } = null;
    
    const csvWriter = createObjectCsvWriter({
        path:'teste.csv',   
        header:[
            { id: 'id', title: 'id' },
            { id: 'title', title: 'title' },
            { id: 'description', title: 'description' },
            { id: 'created_at', title: 'created_at' },
            { id: 'updated_at', title: 'updated_at' }
        ],
        append: true
    })
    res.setHeader('Content-Type', 'application/json');

    if (method === 'POST' && url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
           
        }) 
        req.on('end', async()=>{
            try{
                const data = JSON.parse(body);

                const novaTarefa = {
                    id:`id-${idUnique}`,
                    title:data.title,
                    description: data.description,
                    create_at: new Date().toISOString(),
                    update_at: new Date().toISOString()
                };

                await csvWriter.writeRecords([novaTarefa])
                res.writeHead(200, {'content-Type':'application/json'});
                res.end(JSON.stringify(novaTarefa));

            }catch(error){
                res.writeHead(400, {'content-Type':'application/json'});
                res.end(JSON.stringify({error:'json invalido'}));
            }
        })
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});


