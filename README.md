## Setting new repo

- Update repo name in `package.json`, `serverless.yml`
- Run `bash setup.sh`
- Delete unnecessary stuffs like `setup.sh` and `exampleFunction`

## Setup and run at Local

- Clone `.env.template` as a new `.env` file and update the variables
- Install serverless `npm i -g serverless`
- Login to serverless dashboard `sls login`
- Run `npm i`
- Run `sls invoke local -f {functionName}` - to run an function in local (Ref: https://www.serverless.com/framework/docs/providers/google/cli-reference/invoke-local/)

## Deploy to Dev

- Run `sls deploy --stage dev-{your-name}` - to deploy a CloudFormation stack within your name

Test your hello world

```javascript
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOltdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiIifSwiaWF0IjoxNjIxMjUwMTMwLCJleHAiOjE3MDc2NTAxMzAsImF1ZCI6InBhcGF5YS5hc2lhIiwiaXNzIjoicGFwYXlhLmFzaWEifQ.lEeM_43oziNzieAt6Lc4MxcZI6HIFOQHdd0KqCBpqoBGUEVdoiuLtwkLTfiZ71qgu0PJKiOzAlB0RKE60nXxGQUWJeJBNgjfKe2SwAun_PMfYScGTT1A1tUcjIiANvClS5zP0SFLR0i_6oiTkFvJ3g10Tt7ZZoGrbofqjOYUFEUDOJ1nM-Vlr7_wi0VE4HpCkuBkDw0glrSxCc_wwFNgRmSHHvmSKraVVF0Lph-u0CtNuIc3kKSAiIQtdiVNgJEWNOjzmLPJsDVT6ENTMcoeJJwgWLZD8t0_3g00UcdMPkjDNb9bMPQfCCTAU6i8HgMQivvh9l2ufqKfUVxFiWIH0e385MufYXLrkEK9xkjtVLd6UUmkd-94Dz864-nGNl1O3wbto2GHwPOIqZdA474otHz4LjvNbIVyWme61-LPcVEcXxF3brlstXM_oi7QobjMseKhJYVrJTiIMntOoApgM4t91WC4ITijirzXFctwO3Rg1TMFLNJOvxqILQpQo32NjIkRLKll-wyPkkcoEFYycxHgJRqmH6Ro-bpEH3d3N4zBA1L76vP1vhXcIYVU9Uh6VBbp0jINzeTBRITHuhXCNlG8HeS6nE-aoSdSFT8yCZrwuZizcaHfVxVWIyzrClsGXtUAD_bxRJPVu3_fgfL94GoPi6Lu3hYfsWoJQ2GqKoE"
);
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "Cookie",
  "session=.eJwljkGuQjEIAO_StQtogYKXMRRoNHHli6uff3efcTeLSWb-2m2_6ri36_bnUZd2e2S7ttKAxVHgmylH4hBMG0OUBGeMoTlsqi9OD93dMchLkBkJbHKB0Je7zzKqviA2CPYANSENXzqoArz6qcI-W0xiDMsnEla7tPdRr9_M2WAmU04NSQBw6olm7f8D91U0UA.XaV-8w.YS_tOwOU7JtzbtfBBz1KeP0EEsA"
);

var graphql = JSON.stringify({
  query: 'query {\n    helloWorld(message: "I\'m death") {\n        message\n        success\n    }\n}',
  variables: {},
});
var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: graphql,
  redirect: "follow",
};

fetch("http://localhost:9998/dev/graphql", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log("error", error));
```
