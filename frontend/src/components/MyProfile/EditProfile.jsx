import { useState, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import { dealWithCloudinarySend, getPayloadFromToken } from "../../services/helperFunctions";
import './EditProfile.css'

const EditProfile = ({user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({...user });
    const [ imageFile, setImageFile ] = useState(null)
    const [ previewImage, setPreviewImage ] = useState('')
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const sendImagePic = async () => {
        const token = localStorage.getItem('token')
        const decodedPayload = await getPayloadFromToken(token)
        const imageUrl = await dealWithCloudinarySend(decodedPayload.user_id, imageFile, 'profile_pictures')
        return imageUrl ? imageUrl.secure_url: ''

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrlCheck = await sendImagePic()
        
        const updatedFormData = {
            ...formData,
            profilePicture: imageUrlCheck ? imageUrlCheck: formData.profilePicture
        }
        setFormData(updatedFormData)
        onSave(updatedFormData);
        setImageFile(null)
        fileInputRef.current.value = ''
    };

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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {previewImage ?<img src={previewImage}
                style={{width: '5rem', height:'5rem'}}
                />: null}
            </div>
            <input
                className="update-profile"
                type="text"
                name="username"
                placeholder="username"
                value={(formData.username)}
                onChange={handleChange}
                />
            <input
                className="update-profile"
                type="text"
                name="firstname"
                placeholder="firstname"
                value={(formData.firstname)}
                onChange={handleChange}
                />
            <input
                className="update-profile"
                type="text"
                name="lastname"
                placeholder="lastname"
                value={(formData.lastname)}
                onChange={handleChange}
                />
            <input
                className="update-profile"
                type="text"
                name="location"
                placeholder="location"
                value={(formData.location)}
                onChange={handleChange}
                />

            <label
                htmlFor="file-upload" className="custom-file-upload-EP"
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
            <button 
            className="edit-profile-buttons"
            type="submit">Save</button>
            <button 
            className="edit-profile-buttons"
            type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProfile