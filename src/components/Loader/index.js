import './styles.css'
import logo from '../../assets/images/logos/guiahtv/guiahtvlogo.png'
import video from '../../assets/videos/video-logo.mp4'

export const LogoLoader = () => {
	return <div className="loader logo-loader" style={{ 'opacity': '0', 'display': 'none' }}>
		<img src={logo} alt="Logo guiah tv" />
	</div>
}

export const VideoLoader = () => {
	return <div className="loader video-loader" style={{ 'opacity': '0', 'display': 'none' }}>
		<video muted id="video-logo" src={video} />
	</div>
}

export const MainLoader = () => {
	return <div className="loader main-loader" style={{ 'opacity': '0', 'display': 'none' }}>
		<div className="spinner"></div>
	</div>
}