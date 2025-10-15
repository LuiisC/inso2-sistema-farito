import BackButtonHomeJ from './BackButtonHomeJ'
import TablaInformesSolicitados from './TablaInformesSolicitados'

const Informes = () => {
  return (
    <div>
        <BackButtonHomeJ />

        <div className="row justify-content-left p-3">
            <div className="col-auto">
                <button className="btn btn-light" onClick={() => setShowModal(true)}>
                    Generar Informe
                </button>
            </div>
        </div>

        <TablaInformesSolicitados />
    </div>
  )
}

export default Informes