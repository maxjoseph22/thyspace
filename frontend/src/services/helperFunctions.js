const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;

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

export const dealWithCloudinarySend = async (userId, imageLocation, preset) => {
  let imageUrl
  try {
      if (imageLocation) {
          const formData = new FormData();
          formData.append("file", imageLocation);
          formData.append("upload_preset", preset)
          formData.append("folder", `${preset}/${userId}`);
          const response = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
              {
                  method: 'POST',
                  body: formData
              }
          )

          if (!response.ok) {
              throw new Error("Failed to upload image to Cloudinary");
          }

          const data = await response.json();
          imageUrl = data
          return imageUrl
      }
  }
  catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
  }
}