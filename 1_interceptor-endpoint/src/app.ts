import { CidaasInterceptor, CidaasInterceptorConfig, CidaasInterceptorOptions } from 'cidaas-interceptor-nodejs';
import { ValidationProcedure } from 'cidaas-interceptor-nodejs/dist/Entity/CidaasInterceptorConfig_ValidationProcedure';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
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
 * Task: include cidaas interceptor
 * The first task is to use the official cidaas-interceptor for nodejs, which does most of the work for you
 * `http://localhost:3000/secured-resource/interceptor`
 * |start command|url|
 * |------|------|
 * |npm start |http://localhost:3000/secured-resource| * 
 */

/**
* TASK 2 use interceptor for offline token check
*/

// configure interceptor, only needs to be done once
let interceptorConfig = new CidaasInterceptorConfig();

interceptorConfig.baseUrl = "https://connect-prod.cidaas.eu";
interceptorConfig.tenantKey = "cidaas-connect-prod";
interceptorConfig.client_id = "7d6adc4d-c43f-40e5-aa84-c7cecce94c7c";
interceptorConfig.client_secret = "8017dfc5-30b4-4ccc-b166-24ab90de6409";

interceptorConfig.validation_procedure = ValidationProcedure.offline;

// create the cidaas interceptor with the config
let cidaas_interceptor = new CidaasInterceptor(interceptorConfig);

// set intercptor options, could be different for each API endpoint
let interceptorOptions = new CidaasInterceptorOptions();
interceptorOptions.scopes = ["profile", "roles"];
interceptorOptions.strictScopeValidation = true;
interceptorOptions.interceptorConfig = interceptorConfig;

/**
* TASK 2 use interceptor for offline token check
*/
app.get('/secured-resource/interceptor', cidaas_interceptor.checkAccess(interceptorOptions), (req: Request, res: Response) => {
    res.send({ result: 'I checked the token with the cidaas-interceptor-nodejs' });
})

app.listen(port, function () {
    console.log(`secured-resource App is listening on port ${port} !`)
})