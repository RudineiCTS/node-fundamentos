import http from 'node:http';


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
      } = {
        id: '',
        title: '',
        description: '',
        completed_at: null,
        update_at: '',
        created_at: ''
      };

    res.setHeader('Content-Type', 'application/json');

    if (method === 'POST' && url === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
           
        }) 

      

        
        // novaTarefa.title = body.title;
        // novaTarefa.description = body.description;
        novaTarefa.created_at = new Date().toISOString();
        novaTarefa.update_at = new Date().toISOString();
        novaTarefa.id = `id-${idUnique}`; 
        res.end(JSON.stringify({body}));
        
        req.on('end', () => {
            console.log(body);
        })
    }
    idUnique++;

    
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});