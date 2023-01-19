import * as React from 'react'
import { router } from '../../router'
import './styles.css'

export const TopMenu = () => {
    console.log('Menu')

    const handleClick = (route) => {
        router.navigate(`/${route}`)
    }

    return (
        <div className="top-menu">
            <ul className="list-links">
                <li className="link-menu" onClick={() => handleClick('home')}>Inicio</li>
                <li className="link-menu" onClick={() => handleClick('live-tv')}>Música</li>
                <li className="link-menu" onClick={() => handleClick('vod')}>Video</li>
                <li className="link-menu" onClick={() => handleClick('radio')}>Eventos</li>
            </ul>
        </div>
    )
}

export default TopMenu