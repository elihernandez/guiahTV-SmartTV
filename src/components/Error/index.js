import { createSignal, onMount } from 'solid-js'
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

function ErrorSession({ count, handleRequest }){

    onMount(() => {
        setTimeout(() => {
            document.querySelector('.error-button').focus()
        }, 1000)
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
    const listTimes = { 0: 30, 1: 45, 2: 60 }
    const time = listTimes[count()]
    const [getCount, setCount] = createSignal(time)

    const interval = setInterval(() => {
        console.log(count())
        if(getCount() !== 1) {
            setCount(prev => prev - 1)
        }else{
            handleRequest()
            clearInterval(interval)
        }
    }, 1000)

    const handleClick = () => {
        handleRequest()
        clearInterval(interval)
    }

    return (
        <div className="error-container">
            {count() < 3 ?
                <div className="message-wrapper">
                    <div className="text error-message">Hay un problema con la conexión a internet</div>
                    <div className="text error-submessage">Se intentará reestablecer la conexión en: {getCount()}</div>
                    {count() < 3 &&
                        <button className="error-button" onClick={() => handleClick()}>Volver a intentar</button>
                    }
                </div>
                :
                <div className="message-wrapper">
                    <div className="text error-message">No se pudo reestablecer la conexión a internet</div>
                    <div className="text error-submessage">Se intentará reestablecer la conexión en un</div>
                </div>
            }
        </div>
    )
}