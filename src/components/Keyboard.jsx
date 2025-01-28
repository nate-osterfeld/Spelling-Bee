import './Keyboard.css'

export const Keyboard = ({ keyboardFns }) => {
    // Maybe use bubbling so you only have to apply onClick/onMouseDown to keyboard?
	return (
		<div className='keyboard' onClick={keyboardFns}>
			<div className='q'>q</div>
			<div className='w'>w</div>
			<div className='e'>e</div>
			<div className='r'>r</div>
			<div className='t'>t</div>
			<div className='y'>y</div>
			<div className='u'>u</div>
			<div className='i'>i</div>
			<div className='o'>o</div>
			<div className='p'>p</div>
			<div className='a'>a</div>
			<div className='s'>s</div>
			<div className='d'>d</div>
			<div className='f'>f</div>
			<div className='g'>g</div>
			<div className='h'>h</div>
			<div className='j'>j</div>
			<div className='k'>k</div>
			<div className='l'>l</div>
			<div className='z'>z</div>
			<div className='x'>x</div>
			<div className='c'>c</div>
			<div className='v'>v</div>
			<div className='b'>b</div>
			<div className='n'>n</div>
			<div className='m'>m</div>
			<div className='hnt'>
				<img className='lightbulb-svg' src='/assets/light-bulb.svg' alt='hint' />
			</div>
			<div className='de'>
				<div className='ent'>
					<img className='pencil-svg' src='/assets/pencil.svg' alt='enter' />
				</div>
				<div className='del'>
					<img className='backspace-svg' src='/assets/backspace.svg' alt='delete' />
				</div>
			</div>
		</div>
	)
}
