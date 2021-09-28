import './styles.css'

export function ErrorSession({ handleRequest }){
    return <div className="error-container">
        <div className="message-wrapper">
            <div className="error-message">Error de sesión, inicia sesión nuevamente.</div>
            <button onClick={() => handleRequest()}></button>
        </div>
    </div>
}