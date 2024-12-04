import { useState, useRef } from "react";
import { FaRegImage } from "react-icons/fa";
import { dealWithCloudinarySend, getPayloadFromToken } from "../../services/helperFunctions";


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
                type="text"
                name="username"
                value={(formData.username)}
                onChange={handleChange}
                />
            <input
                type="text"
                name="firstname"
                value={(formData.firstname)}
                onChange={handleChange}
                />
            <input
                type="text"
                name="lastname"
                value={(formData.lastname)}
                onChange={handleChange}
                />

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
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProfile