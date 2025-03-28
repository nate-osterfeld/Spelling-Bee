import './Hamburger.css'

function HamburgerMenu({ showDropdown, setShowDropdown, setShowSignup, setShowSignin }) {
	function toggleMenus() {
		setShowDropdown(!showDropdown)
		setShowSignup(false)
		setShowSignin(false)
	}

	return (
		<>
			<input type='checkbox' id='checkbox' />
			<label for='checkbox' className='toggle' onClick={() => toggleMenus()}>
				<div class='bars' id='bar1'></div>
				<div class='bars' id='bar2'></div>
				<div class='bars' id='bar3'></div>
			</label>
		</>
	)
}

export default HamburgerMenu
