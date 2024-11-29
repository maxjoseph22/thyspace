export function getPayloadFromToken(token) {
    if (!token) {
      return false
    }
    const encryptedPayload = token.split('.')
    return JSON.parse(window.atob(encryptedPayload[1]))
  }

export const convertDate = (toConvert) => {
    const date = new Date(toConvert.createdAt)
    date.toISOString().substring(0, 10);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`
}