import { createSignal, onMount } from 'solid-js'
import SpatialNavigation from '../../utils/spatialNavigation'
import './styles.css'

export default function Error({ code, count, handleRequest }){
    return (
        <Switch fallback={<ErrorNetwork handleRequest={handleRequest} count={count} />}>
            <Match when={code() === 1}>
                <ErrorSession handleRequest={handleRequest} count={count} />
            </Match>
        </Switch>
    )
}

function ErrorSession({ handleRequest }){

    onMount(() => {
        focusInErrorButton()
	})

    const handleClick = () => {
        handleRequest()
    }

    return (
        <div className="error-container">
            <div className="message-wrapper">
                <div className="text error-message">Error de sesión, inicia sesión nuevamente.</div>
                <button className="error-button" onClick={handleClick}>Iniciar sesión</button>
            </div>
        </div>
    )
}

function ErrorNetwork({ count, handleRequest }){
    let interval
    const listTimes = { 0: 30, 1: 45, 2: 60 }
    const [getCount, setCount] = createSignal(listTimes[count()])

    onMount(() => {
        focusInErrorButton()

        interval = setInterval(() => {
            getCount() !== 1
                ? setCount(prev => prev - 1)
                : handleClick()
        }, 1000)
	})

    const handleClick = () => {
        handleRequest()
        clearInterval(interval)
    }

    return (
        <div className="error-container">
            {count() < 3 ?
                <div className="message-wrapper">
                    <div className="text error-message">Se detectó un problema con la conexión a internet</div>
                    <div className="text error-submessage">Intentando reestablecer en {getCount()} segundos.</div>
                    {count() < 3 &&
                        <button className="error-button" onClick={() => handleClick()}>Volver a intentar</button>
                    }
                </div>
                :
                <div className="message-wrapper">
                    <div className="text error-message">Lo sentimos, no se pudo reestablecer la conexión a internet</div>
                    <div className="text error-submessage">Se intentará reestablecer en un momento o intentalo más tarde.</div>
                </div>
            }
        </div>
    )
}

function focusInErrorButton(){
    setTimeout(() => {
        SpatialNavigation.add({ selector: '.error-button', rememberSource: true, enterTo: 'last-focused' })
        SpatialNavigation.makeFocusable()
        SpatialNavigation.focus('.error-button')
    }, 1000)
}