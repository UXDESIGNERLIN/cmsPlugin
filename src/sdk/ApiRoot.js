import fetch from 'node-fetch'
import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { PROJECT_KEY, CLIENT_SECRET, CLIENT_ID } from '../../config'
console.log('test', PROJECT_KEY);
export const projectKey = PROJECT_KEY
const authMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
}

const httpMiddlewareOptions = {
  host: `https://api.europe-west1.gcp.commercetools.com`,
  fetch,
}

const client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build()

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client)
}
