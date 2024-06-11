'use strict'

const AmazonCognitoIdentity = require('amazon-cognito-identity-js')

// paste your credentials or use environment variables
const USER_POOL_ID = ""
const APP_CLIENT_ID = ""

const USERNAME = ""
const PASSWORD = ""

// https://stackoverflow.com/a/61376674
function asyncAuthenticateUser(cognitoUser, cognitoAuthenticationDetails) {
  return new Promise(function (resolve, reject) {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    })
  })
}

function initializer() {
  console.log(`Generating tokens for user ${USERNAME}\n`)

  const authenticationData = {
    Username: USERNAME,
    Password: PASSWORD,
  }
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  )
  const poolData = {
    UserPoolId: USER_POOL_ID, // Your user pool id here
    ClientId: APP_CLIENT_ID, // Your client id here
  }
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
  const userData = {
    Username: USERNAME,
    Pool: userPool,
  }
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

  return { cognitoUser, authenticationDetails }
}

async function generateAccessToken() {
  const { cognitoUser, authenticationDetails } = initializer()
  try {
    let result = await asyncAuthenticateUser(cognitoUser, authenticationDetails)

    console.log(`Access Token: ${JSON.stringify(result.getAccessToken())}\n`)
    console.log(`JWT: ${JSON.stringify(result.getAccessToken().getJwtToken())}\n`)

    console.log('Sync check 1')
  } catch (error) {
    console.log(error.message)
  } finally {
    console.log('Done!')
  }
}

generateAccessToken()