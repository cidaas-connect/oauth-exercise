import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import fetch from 'node-fetch';
const app: Application = express()
const port: number = 3001
app.use(cors({}));

/**
 * Exercise 2: Create a token by using client credentials flow to call a secured API
 * 
 * given is a simple GET endpoint which is reachable via `http://localhost:3001/webhook-stuff`.  
 * this service should create a client credentials token to call the endpoint from exercise 1.
 * the response should be forwarded.
 * 
 * Additional info:
 * issuer_url: https://demo.cidaas.de
 * client_id: 1e6b7c39-bafa-422d-9a97-483b8c6b2384
 * client_secret: 73de0bb6-123e-4118-9675-1fe6b6ac0e56
 */
app.post('/webhook-stuff', (req: Request, res: Response) => {
  // insert code here

  fetch('http://localhost:3000/secured-resource/handmade', { method: 'GET' }).then(response => {
    res.status(response.status);
    if (response.status === 200) {
      res.json("{'called a secured':'resource'}");
    }
    res.end();
  });
})

app.listen(port, function () {
  console.log(`client credential client is working and is listening on port ${port} !`)
})
