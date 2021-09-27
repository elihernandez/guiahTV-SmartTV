import { router } from '../../router'
import './styles.css'

export default function TopMenu(){

    const handleClick = (route) => {
		router.navigate(`/${route}`)
	}

    return (
        <div className="top-menu">
            <ul className="list-links">
                <li className="link-menu" onClick={() => handleClick('home')}>Home</li>
                <li className="link-menu" onClick={() => handleClick('livetv')}>Live tv</li>
                <li className="link-menu" onClick={() => handleClick('vod')}>Vod</li>
                <li className="link-menu" onClick={() => handleClick('radio')}>Radio</li>
                <li className="link-menu" onClick={() => handleClick('music')}>Music</li>
                <li className="link-menu" onClick={() => handleClick('zonakids')}>Zona kids</li>
            </ul>
        </div>
    )
}