import './Hamburger.css'

function HamburgerMenu({ setShowDropdown, showDropdown }) {
    return (
        <>
            <input type='checkbox' id='checkbox' />
            <label for='checkbox' className='toggle' onClick={() => setShowDropdown(!showDropdown)}>
                <div class='bars' id='bar1'></div>
                <div class='bars' id='bar2'></div>
                <div class='bars' id='bar3'></div>
            </label>
        </>
    )
}

export default HamburgerMenu
