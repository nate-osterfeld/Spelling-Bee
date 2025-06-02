import './AccountPage.css'
import React, { useState } from 'react';
import { useGetCurrentUserQuery } from '../../services/authSlice';

export default function AccountPage() {
    const { data, isLoading, error } = useGetCurrentUserQuery()
    console.log('user', data)
    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className="account-container">
            <div className="account-wrapper">
                <p className="acc-section-title">Account</p>
                <p className="section-description">General information</p>

                <div className="separator"></div>

                {/* Profile picture */}
                <p className="acc-section-title">Profile picture</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <img
                        src="https://via.placeholder.com/72"
                        alt="Profile"
                        style={{ width: 72, height: 72, borderRadius: '50%' }}
                    />
                    <div>
                        <p className="acc-section-description">PNG, JPEG under 15MB</p>
                        <button className="acc-button button-delete" style={{ marginRight: '8px' }}>
                            Upload new picture
                        </button>
                        <button className="acc-button button-delete">Delete</button>
                    </div>
                </div>

                <div className="separator"></div>

                {/* Email */}
                <p className="acc-section-title">Email</p>
                <p className="acc-section-description">Linked email</p>
                <input
                    type="email"
                    className="input-field"
                    placeholder={data.email}
                    disabled
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="separator"></div>

                {/* Username */}
                <p className="acc-section-title">Username</p>
                <p className="acc-section-description">Change your username</p>
                <input
                    type="text"
                    className="input-field"
                    placeholder={data.name}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className="separator"></div>

                {/* Password */}
                <p className="acc-section-title">Password</p>
                <p className="acc-section-description">Modify your current password</p>
                <input
                    type="password"
                    className="input-field"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    className="input-field"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="separator"></div>

                {/* Connected accounts */}
                <p className="acc-section-title">Connected accounts</p>
                <p className="acc-section-description">Third-party sign-in options.</p>
                <div className="integrated-account">
                    <span>Google OAuth</span>
                    {data.google_id
                        ? <span className="connected">Connected</span>
                        : <button className="unconnected">Click to connect</button>
                    }
                </div>

                {/* Save changes */}
                <div style={{ marginTop: '32px' }}>
                    <button className="acc-button button-save">Save changes</button>
                </div>
            </div>
        </div>
    );
}
