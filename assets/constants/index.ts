export const sampleJson = {
  "0": {
    message: "Invalid input",
    type: "ValidationError",
    reason: "Missing required field",
    code: "400",
    "@type": "InvalidRequest",
    metadata: {
      field: "name",
      expectedType: "string",
    },
    locale: "en-US",
  },
  "1": {
    message: "Authentication failed",
    type: "AuthenticationError",
    reason: "Invalid credentials",
    code: "401",
    "@type": "Authentication",
    metadata: {
      attemptedUser: "testuser",
    },
    locale: "en-GB",
  },
  "2": {
    message: "Resource not found",
    type: "NotFoundError",
    reason: "Resource does not exist",
    code: "404",
    "@type": "Resource",
    metadata: {
      resourceId: "123",
    },
    locale: "fr-FR",
  },
  "3": {
    message: "Internal server error",
    type: "ServerError",
    reason: "Unexpected exception",
    code: "500",
    "@type": "Server",
    metadata: {
      component: "Database",
    },
    locale: "de-DE",
  },
  "4": {
    message: "Service unavailable",
    type: "ServiceError",
    reason: "Service is temporarily unavailable",
    code: "503",
    "@type": "ExternalService",
    metadata: {
      serviceName: "PaymentGateway",
    },
    locale: "es-ES",
  },
};
