![cidaas academy logo](https://digital-identity.io/wp-content/uploads/2022/05/cidaas-academy-1.png)

# oAuth & OIDC training

In this training you will get in touch with the main important oauth/oidc flows.

> the solutions shown here follow neither clean code specifications nor angular best practice. they are just focus on the oidc flows

**issuer_url:**
`https://connect-prod.cidaas.eu/`

**Sample Apps:**
|exercise|client_id|client_secret|
|------|------|------|
|1 secured resource |7d6adc4d-c43f-40e5-aa84-c7cecce94c7c|8017dfc5-30b4-4ccc-b166-24ab90de6409|
|2 client credential |7d6adc4d-c43f-40e5-aa84-c7cecce94c7c|8017dfc5-30b4-4ccc-b166-24ab90de6409|
|3 PKCE |2c21b993-bc51-4ffd-8a31-a2b31701f5c6|------|
|4 device code |ef58f89d-7e74-48ce-93c9-dce07b553378|------|

## Exercise 1: Secure an API by adding token check
  
given is a simple GET endpoint which is reachable via `http://localhost:3000/secured-resource/*` and responses a humble JSON object
In this tasks we want to rebuild the endpoint so that only designated user and system can access it.

The API should only allow access for calls with token which includes role `Trainee` or scope `trainee_read`. For all others, the endpoint has to answer `401 UNAUTHORIZE`.

### interceptor

The first task is to use the official cidaas-interceptor for nodejs, which does most of the work for you
`http://localhost:3000/secured-resource/interceptor`

|start command|url|
|------|------|
|npm start |http://localhost:3000/secured-resource|
  
## Exercise 2: Create a token by using client credentials flow to call a secured API

given is a simple GET endpoint which is reachable via `http://localhost:3001/webhook-stuff`.  
this service should create a client credentials token to call the endpoint from exercise 1.
the response should be forwarded.

|start command|url|
|------|------|
|npm start |http://localhost:3001/webhook-stuff|

## Exercise 3: create a token by using PKCE flow to call a secured API

given is a simple angular webapp with two different pages.

`/home` shows a Login-Button. After clicking the Login-Button you should start the PKCE flow, after successful login, you should redirect to /inside
`/inside` should get a code, exchange it to an access-token and display them

A button on `/inside` should call our API endpoint from exercise 1 `/secured-resource`

Another button will handle a logout by using the endsession call

> To get a clear understanding of each step of the flow it is forbidden to use any OIDC SDK.

|start command|url|
|------|------|
|npm start |http://localhost:4200/home|

## OPTIONAL Exercise 4: create a token by using device code flow to call a secured API

given is a simple angular webapp with two different pages.

`/home` shows a Login-Button. After clicking the Login-Button you should start the device code flow and display a QR-code to open a Login Page on another device. After successful login, you should redirect to /inside
`/inside` should get an access-token and display them

> To get a clear understanding of each step of the flow it is forbidden to use any OIDC SDK.

|start command|url|
|------|------|
|npm start |http://localhost:4201/home|

{+ Using the flow in an Angular app is not the intended solution approach and is only used here for training purposes +}
