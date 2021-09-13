import './styles.css'

export const MainLoader = () => {
	return <div className="loader main-loader" style={{ 'opacity': '0', 'display': 'none' }}>
		<div className="spinner"></div>
	</div>
}