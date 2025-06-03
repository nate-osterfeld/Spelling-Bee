import './AccountPage.css'
import { useEffect, useState } from 'react'
import {
	useGetCurrentUserQuery,
	useUpdateUsernameMutation,
	useUpdatePasswordMutation,
} from '../../services/authSlice'
import Loading from '../../components/Loading.jsx'

export default function AccountPage() {
	const { data, isLoading } = useGetCurrentUserQuery()
	const [updateUsername, { error: updateUsernameError }] = useUpdateUsernameMutation()
	const [updatePassword, { error: updatePasswordError }] = useUpdatePasswordMutation()
	// console.log('user', data)

	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [usernameSuccess, setUsernameSuccess] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword1, setNewPassword1] = useState('')
	const [newPassword2, setNewPassword2] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [passwordSuccess, setPasswordSuccess] = useState('')

	useEffect(() => {
		if (newPassword1 === newPassword2) {
			setPasswordError('')
		}
	}, [newPassword1, newPassword2, currentPassword])

	const handleSubmit = async (e) => {
		if (username) {
			try {
				await updateUsername({ username }).unwrap()
				setUsername('')
				setUsernameSuccess('Username updated')
				setTimeout(() => {
					setUsernameSuccess('')
				}, 3000)
			} catch (err) {
				// updateUserError handled by RTK Query hook (accessible via `updateUserError.data`)
			}
		}

		if (currentPassword && newPassword1 && newPassword2) {
			if (newPassword1 !== newPassword2) {
				setPasswordError('Passwords do not match')
				return
			}
			if (newPassword1.length <= 3) {
				setPasswordError('Password must be longer than 3 characters')
				return
			}
			if (newPassword1 === currentPassword) {
				setPasswordError('New password cannot be the same as current')
				return
			}

			try {
				await updatePassword({ currentPassword, newPassword: newPassword1 }).unwrap()
				setCurrentPassword('')
				setNewPassword1('')
				setNewPassword2('')
				setPasswordSuccess('Password changed')
				setTimeout(() => {
					setPasswordSuccess('')
				}, 3000)
			} catch (err) {
				// updatePasswordError handled by RTK Query hook (accessible via `updatePasswordError.data`)
			}
		}
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<div className='account-container'>
			<div className='account-wrapper'>
				<p className='acc-section-title'>Account</p>
				<p className='section-description'>General information</p>

				<div className='separator'></div>

				{/* Profile picture */}
				<p className='acc-section-title'>Profile picture</p>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '20px',
						marginBottom: '20px',
					}}
				>
					<img
						src='https://via.placeholder.com/72'
						alt='Profile'
						style={{ width: 72, height: 72, borderRadius: '50%' }}
					/>
					<div>
						<p className='acc-section-description'>PNG, JPEG under 15MB</p>
						<button className='acc-button button-delete' style={{ marginRight: '8px' }}>
							Upload new picture
						</button>
						<button className='acc-button button-delete'>Delete</button>
					</div>
				</div>

				<div className='separator'></div>

				{/* Email */}
				<p className='acc-section-title'>Email</p>
				<p className='acc-section-description'>Linked email</p>
				<input
					type='email'
					className='input-field'
					placeholder={data.email}
					disabled
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<div className='separator'></div>

				{/* Username */}
				<p className='acc-section-title'>Username</p>
				<p className='acc-section-description'>Change your username</p>
				<input
					type='text'
					className='input-field'
					placeholder={data.name}
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{/* Backend error */}
				{updateUsernameError && (
					<div style={{ color: 'red' }}>
						{'data' in updateUsernameError
							? updateUsernameError.data.message
							: 'Update failed'}
					</div>
				)}
				{/* Backend success */}
				{usernameSuccess && <div style={{ color: '#29e39e' }}>{usernameSuccess}</div>}

				<div className='separator'></div>

				{/* Password */}
				{!data.google_id && (
					<>
						<p className='acc-section-title'>Password</p>
						<p className='acc-section-description'>Modify your current password</p>
						<input
							type='password'
							className='input-field'
							placeholder='Current password'
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<input
							type='password'
							className='input-field'
							placeholder='New password'
							value={newPassword1}
							onChange={(e) => setNewPassword1(e.target.value)}
						/>
						<input
							type='password'
							className='input-field'
							placeholder='New password'
							value={newPassword2}
							onChange={(e) => setNewPassword2(e.target.value)}
						/>
						{/* Frontend error */}
						{passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}

						{/* Backend error */}
						{updatePasswordError && (
							<div style={{ color: 'red' }}>
								{'data' in updatePasswordError
									? updatePasswordError.data.message
									: 'Update failed'}
							</div>
						)}

						{/* Backend Success */}
						{passwordSuccess && (
							<div style={{ color: '#29e39e' }}>{passwordSuccess}</div>
						)}
					</>
				)}

				<div className='separator'></div>

				{/* Connected accounts */}
				<p className='acc-section-title'>Connected accounts</p>
				<p className='acc-section-description'>Third-party sign-in options.</p>
				<div className='integrated-account'>
					<span>Google OAuth</span>
					{data.google_id ? (
						<span className='connected'>Connected</span>
					) : (
						<button className='unconnected'>Click to connect</button>
					)}
				</div>

				{/* Save changes */}
				<div style={{ marginTop: '32px' }}>
					<button onClick={handleSubmit} className='acc-button button-save'>
						Save changes
					</button>
				</div>
			</div>
		</div>
	)
}
