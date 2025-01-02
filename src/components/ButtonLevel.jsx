import { Link } from "react-router-dom"

function ButtonLevel({ level }) {
    return (
        <div>
            <Link to={`play/${level}`}>
                {level}
            </Link>
        </div>
    )
}

export default ButtonLevel
