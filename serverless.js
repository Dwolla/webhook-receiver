const { serverless } = require('skripts/config')

module.exports = {
  ...serverless,
  provider: {
    ...serverless.provider,
    environment: {
      ...serverless.provider.environment,
      WEBHOOK_SECRET: '${env:WEBHOOK_SECRET}'
    }
  },
  functions: {
    func: {
      handler: 'src/handler.handle',
      events: [{ http: 'POST /' }]
    }
  },
  timeout: 15
}
