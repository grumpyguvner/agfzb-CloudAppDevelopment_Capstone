/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

function main(params) {

    const authenticator = new IamAuthenticator({ apikey: params.IAM_API_KEY })
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator
    });
    cloudant.setServiceUrl(params.COUCH_URL);

    if ('st' in params) {
        let dbResultPromise = getMatchingRecords(cloudant, "dealerships", { "st": params.st });
        return dbResultPromise;
    }

    if ('state' in params) {
        let dbResultPromise = getMatchingRecords(cloudant, "dealerships", { "state": params.state });
        return dbResultPromise;
    }
    
    let dbResultPromise = getAllRecords(cloudant, "dealerships");
    return dbResultPromise;
}

function getDbs(cloudant) {
     return new Promise((resolve, reject) => {
         cloudant.getAllDbs()
             .then(body => {
                 resolve({ dbs: body.result });
             })
             .catch(err => {
                  console.log(err);
                 reject({ err: err });
             });
     });
 }

 function getMatchingRecords(cloudant,dbname, selector) {
    return new Promise((resolve, reject) => {
        cloudant.postFind({db:dbname,selector:selector})
                .then((result)=>{
                    resolve({docs: result.result.docs});
                })
                .catch(err => {
                    console.log(err);
                    reject({ err: err });
                });
        })
}
 
function getAllRecords(cloudant,dbname) {
    return new Promise((resolve, reject) => {
        cloudant.postAllDocs({ db: dbname, includeDocs: true })            
            .then((result)=>{
                resolve({rows: result.result.rows});
            })
            .catch(err => {
                console.log(err);
                reject({ err: err });
            });
    })
}
