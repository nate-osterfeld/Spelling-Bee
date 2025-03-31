import { useGetUserProgressQuery } from '../../services/authSlice.js'

function ProgressPage() {
    const { data, error, isLoading } = useGetUserProgressQuery()
    console.log(data)
    
	return (
		<>
			<div>Progress</div>
		</>
	)
}

export default ProgressPage
