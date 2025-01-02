import ButtonLevel from "../../components/ButtonLevel"

function HomePage() {
    return (
        <div>
            <h2>Spelling Bee Challenge</h2>
            <h4>Choose a difficulty level to get started</h4>
            <div>
                <ButtonLevel level="easy" />
                <ButtonLevel level="medium" />
                <ButtonLevel level="hard" />
            </div>
        </div>
    )
}

export default HomePage
