import { Link } from "react-router-dom"
import "./ButtonLevel.css"

function ButtonLevel({ level }) {
    
    return (
		<div className={`button ${level}`}>
			<div className={`circle-left ${level}`}>
				<div className='dot'></div>
            </div>
            
            <Link to={`play/${level}`}>{level}</Link>
            
			<div className={`circle-right ${level}`}>
				<div className='dot'></div>
			</div>
		</div>
	)
}

export default ButtonLevel
