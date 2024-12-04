import { useState, useRef } from "react"
import './PostForm.css'
import { IoMdClose } from "react-icons/io";
import { FaRegImage } from "react-icons/fa";
import { dealWithCloudinarySend } from "../services/helperFunctions";

const PostForm = ({submitPost, setSeePostForm}) => {
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

    const sendImagePic = async (userId) => {
        const imageUrl = dealWithCloudinarySend(userId, imageFile, 'post_images')
        setImageFile(null)
        fileInputRef.current.value = ''
        return imageUrl
    }

    return (
        <div className="overlay">
        <div className="popup-form">
            <form 
                className="post-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    submitPost(postContent, sendImagePic)
                    setPreviewImage('')
                    setPostContent('')
            }}>
                <div className="post-form-header">
                    <div className="post-side-heading"></div>
                    <label className="post-form-heading">Create Post</label><IoMdClose
                    className="post-side-heading post-form-close" 
                    onClick={(e) => {
                        e.preventDefault()
                        setSeePostForm(prev => !prev)
                    }}
                    />
                    
                </div>
                <div className="post-image-container">
                    {previewImage ?<img src={previewImage}
                    style={{width: '5rem', height:'5rem'}}
                    />: null}
                </div>
                <div className="post-text-container">
                    <textarea
                    className="post-text"
                    value={postContent} 
                    onChange={handleInputChanges}
                    placeholder="Start typing ..."
                    required
                    />
                </div>
                <div className="post-form-footer">
                    <button
                    type='submit'
                    className="post-btn"
                    >Post</button>
                    <label
                    htmlFor="file-upload" className="custom-file-upload"
                    >
                        <FaRegImage className="upload-icon"/>
                    </label>
                    <input
                    id='file-upload'
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChanges}
                    type='file'
                    style={{ display: 'none' }}
                    />
                </div>
            </ form>
        </div>
        </div>
    )
}

export default PostForm