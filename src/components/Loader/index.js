import './styles.css'
import logo from '../../assets/images/logos/guiahtv/guiahtvlogo.png'

export const LogoLoader = () => {
	return <div className="loader logo-loader" style={{ 'opacity': '1', 'display': '' }}>
		<img src={logo} alt="Logo guiah tv" />
	</div>
}

export const MainLoader = () => {
	return <div className="loader main-loader" style={{ 'opacity': '0', 'display': 'none' }}>
		<div className="spinner"></div>
	</div>
}