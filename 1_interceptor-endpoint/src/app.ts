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
 * The API should only allow access for calls with token which includes role `Trainee` or scope `profile`. For all others the endpoint has to answer `401 UNAUTHORIZE`.
 * 
 * Task interceptor
 * The first task is to use the official cidaas-interceptor for nodejs, which does most of the work for you
 * `http://localhost:3000/secured-resource/interceptor`
 * 
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
    fetch("https://connect-prod.cidaas.eu/.well-known/jwks.json", { method: "Get" }).then(res => res.json()).then(jwk => {
        jwks = jwk.keys;
    });
})