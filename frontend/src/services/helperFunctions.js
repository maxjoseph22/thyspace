export function getPayloadFromToken(token) {
    if (!token) {
      return false
    }
    const encryptedPayload = token.split('.')
    return JSON.parse(window.atob(encryptedPayload[1]))
  }