import './Hamburger.css'

function toggleMenus(setShowDropdown, showDropdown, setShowSignup, showSignup) {
	setShowDropdown(!showDropdown)
	setShowSignup(false)
}

function HamburgerMenu({ setShowDropdown, showDropdown, setShowSignup, showSignup }) {
    return (
        <>
            <input type='checkbox' id='checkbox' />
            <label for='checkbox' className='toggle' onClick={() => toggleMenus(setShowDropdown, showDropdown, setShowSignup, showSignup)}>
                <div class='bars' id='bar1'></div>
                <div class='bars' id='bar2'></div>
                <div class='bars' id='bar3'></div>
            </label>
        </>
    )
}

export default HamburgerMenu
