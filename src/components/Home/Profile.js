import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get URL parameters

const ProfilePage = () => {
    const { userId } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        location: '',
        pincode: '',
    });

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || '',
                    location: data.location || '',
                    pincode: data.pincode || '',
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        fetch(`http://localhost:5000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...user, ...formData }),
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating user data:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="text-center">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                            alt="Avatar"
                            className="img-fluid rounded-circle"
                            width="150"
                        />
                    </div>
                </div>
                <div className="col-md-8">
                    <h2>Profile</h2>
                    {isEditing ? (
                        <div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    className="form-control"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    className="form-control"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>First Name:</strong> {user.firstName}</p>
                            <p><strong>Last Name:</strong> {user.lastName}</p>
                            <p><strong>Address:</strong> {user.address}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                            <p><strong>Location:</strong> {user.location}</p>
                            <p><strong>Pincode:</strong> {user.pincode}</p>
                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
