from ibmcloudant.cloudant_v1 import CloudantV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

def main(param_dict):
    
    authenticator = IAMAuthenticator(param_dict['IAM_API_KEY'])
    service = CloudantV1(authenticator=authenticator)
    service.set_service_url(param_dict['CLOUDANT_URL'])

    try:
        response = service.post_find(
            db='reviews',
            selector={'dealership': int(param_dict['dealership_id'])}
        ).get_result()

        if response["docs"] == []:
            return {
                'statusCode': 404,
                'message': 'Unable to find document.'
            }
        return {
            'statusCode': 200,
            'headers': { 'Content-Type': 'application/json' },
            'body': { 'data': response }
        }
        
    except:
        return {
            'statusCode': 500,
            'message': 'An error occurred.'
        }