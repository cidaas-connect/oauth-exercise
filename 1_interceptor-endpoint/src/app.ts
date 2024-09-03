import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import * as jose from 'jose';
import fetch from 'node-fetch';
const app: Application = express()
const port: number = 3000
app.use(cors({}));

/**
 * Exercise 1: Secure an API by adding token check
 * 
 * given is a simple GET endpoint which is reachable via `http://localhost:3000/secured-resource/*` and responses a humble JSON object
 * In this tasks we want to rebuild the endpoint so that only designated user and system can access it.
 * 
 * The API should only allow access for calls with token which includes role `Trainee` or scope `trainee_read`. For all others the endpoint has to answer `401 UNAUTHORIZE`.
 * 
 * Task 1 handmade
 * At first you should parse the token by yourself. Decode the token check if role or scope are set and check the expire-time of the token
 * `http://localhost:3000/secured-resource/handmade`
 * 
 * Task 2 interceptor
 * The second task is to use the official cidaas-interceptor for nodejs, which does most of the work for you
 * `http://localhost:3000/secured-resource/interceptor`
 * 
 * Additional info:
 * issuer_url: https://demo.cidaas.de
 * client_id: 1e6b7c39-bafa-422d-9a97-483b8c6b2384
 * client_secret: 73de0bb6-123e-4118-9675-1fe6b6ac0e56
 */

/**
* existing instance jwks are queried at server start and cached in the variable. 
* The caching incl. cache update and the best handling with it, is not treated in the example. 
*/
let jwks: jose.JWK[];


/**
* TASK 1 handmade offline token check
*/
app.get('/secured-resource/handmade', (req: Request, res: Response) => {
    res.send({ result: 'I checked the token by my self' });
})

/**
* TASK 2 use interceptor for offline token check
*/
app.get('/secured-resource/interceptor', (req: Request, res: Response) => {
    res.send({ result: 'I checked the token with the cidaas-interceptor-nodejs' });
})

app.listen(port, function () {
    console.log(`secured-resource App is listening on port ${port} !`)
    /**
     * existing instance jwks are queried at server start and cached in the variable. 
     * The caching incl. cache update and the best handling with it, is not treated in the example. 
     */
    fetch("https://demo.cidaas.de/.well-known/jwks.json", { method: "Get" }).then(res => res.json()).then(jwk => {
        jwks = jwk.keys;
    });
})