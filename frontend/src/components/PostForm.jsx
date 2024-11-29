import { useState, useRef } from "react"
const CLOUDINARY_NAME = import.meta.env.CLOUDINARY_NAME;

const PostForm = ({submitPost}) => {
    const [ postContent, setPostContent ] = useState('')
    const [ imageFile, setImageFile ] = useState(null)
    const [ previewImage, setPreviewImage ] = useState('')
    const fileInputRef = useRef(null)

    const handleInputChanges = (event) => {
        setPostContent(event.target.value)
    }
    const handleImageChanges = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile){
            setImageFile(selectedFile)
        }

        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewImage(fileReader.result)
        }
        fileReader.readAsDataURL(selectedFile)
    }

    const dealWithCloudinarySend = async (userId) => {
        let imageUrl
        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append("upload_preset", "post_images")
                formData.append("folder", `post_images/${userId}`);
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${'dnixfhx1v'}/image/upload`,
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
            }
        }
        catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
        setImageFile(null)
        fileInputRef.current.value = ''
        return imageUrl
    }

    return (
        <form 
            className="post-form"
            onSubmit={(e) => {
                e.preventDefault()
                submitPost(postContent, dealWithCloudinarySend)
                setPreviewImage('')
                setPostContent('')
        }}>
            <label>Create Post</label>
            <img src={previewImage}/>
            <textarea
            value={postContent} 
            onChange={handleInputChanges}
            placeholder="Start typing ..."
            required
            />
            <input
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChanges}
            type='file'
            />
            <button
            type='submit'
            >Post</button>
        </ form>
    )
}

export default PostForm