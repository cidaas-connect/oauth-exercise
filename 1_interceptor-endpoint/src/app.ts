import { CidaasInterceptor, CidaasInterceptorConfig, CidaasInterceptorOptions } from 'cidaas-interceptor-nodejs';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express()
const port: number = 3000
app.use(cors({}));

/**
 * ## Exercise 1: Secure an API by adding token check
 * 
 * given is a simple GET endpoint which is reachable via `http://localhost:3000/secured-resource/*` and responses a humble JSON object
 * In this tasks we want to rebuild the endpoint so that only designated user and system can access it.
 * 
 * The API should only allow access for calls with token which includes exact scopes `profile` and `roles`. For all others, the endpoint has to answer `401 UNAUTHORIZE`.
 * 
 * ### interceptor
 * 
 * The first task is to use the official [cidaas-interceptor](https://www.npmjs.com/package/cidaas-interceptor-nodejs) for nodejs, which does most of the work for you
 * `http://localhost:3000/secured-resource/interceptor`
 * 
 * |start command|url|
 * |------|------|
 * |npm start |http://localhost:3000/secured-resource|
 * 
 */

/**
*  use interceptor for online or offline token check
*/
// configure interceptor, only needs to be done once
let interceptorConfig = new CidaasInterceptorConfig();

interceptorConfig.baseUrl = "https://connect-prod.cidaas.eu";
interceptorConfig.tenantKey = "cidaas-connect-prod";
interceptorConfig.client_id = "7d6adc4d-c43f-40e5-aa84-c7cecce94c7c";
interceptorConfig.client_secret = "8017dfc5-30b4-4ccc-b166-24ab90de6409";

// @ts-ignore
// TODO 1.1 set validation mode interceptorConfig.validation_procedure = "";

// create the cidaas interceptor with the config
let cidaas_interceptor = new CidaasInterceptor(interceptorConfig);

// set intercptor options, could be different for each API endpoint
let interceptorOptions = new CidaasInterceptorOptions();
interceptorOptions.interceptorConfig = interceptorConfig;
// TODO 1.2 extend interceptor options - The API should only allow access for calls with token which includes exact scopes `profile` and `roles`. For all others, the endpoint has to answer `401 UNAUTHORIZE`.

/**
* secured API
*/
// TODO 1.3 add interceptor to secure resource
app.get('/secured-resource/interceptor', (req: Request, res: Response) => {
    res.send({ result: 'I checked the token with the cidaas-interceptor-nodejs' });
})

app.listen(port, function () {
    console.log(`secured-resource App is listening on port ${port} !`)
})