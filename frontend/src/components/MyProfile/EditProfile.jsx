import { useState } from "react";

const EditProfile = ({user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({...user });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default EditProfile