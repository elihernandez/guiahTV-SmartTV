import useRouter from '../../hooks/useRouter'

export default function LiveTv(){
	useRouter({ route: 'livetv', el: '#livetv', 'loader': '.main-loader'})

	return (
		<div className="section-wrapper" id="livetv" style={{ 'opacity': '0', 'display': 'none'}}>
			<div className="welcome-message">Live TV</div>
		</div>
	)
}