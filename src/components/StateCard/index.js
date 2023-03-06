import './index.css'

const statusId = {
  confirm: 'Confirmed',
  active: 'Active',
  recovered: 'Recovered',
  deceased: 'Deceased',
}

const StateCard = props => {
  const {stateData, activeId} = props
  const totalConfirmed = stateData.confirmed ? stateData.confirmed : 0
  const totalRecovered = stateData.recovered ? stateData.recovered : 0
  const totalDeceased = stateData.deceased ? stateData.deceased : 0
  const totalActive = totalConfirmed - totalRecovered - totalDeceased

  const onSelect = (id, color) => {
    const {selectCase} = props
    selectCase(id, color)
  }

  let confirmColor = ''
  let activeColor = ''
  let recoveredColor = ''
  let deceasedColor = ''

  switch (activeId) {
    case statusId.confirm:
      confirmColor = 'confirmed-card'
      break
    case statusId.active:
      activeColor = 'active-card'
      break
    case statusId.recovered:
      recoveredColor = 'recovered-card'
      break
    case statusId.deceased:
      deceasedColor = '.deceased-card'
      break
    default:
      break
  }

  return (
    <ul className="select-container">
      <li
        key={statusId.confirm}
        onClick={() => onSelect(statusId.confirm, '#ff073a')}
        id={statusId.confirm}
        className="state-card-item confirmed"
      >
        <div
          className={`category-card ${confirmColor} confirmed-clr`}
          testid="stateSpecificConfirmedCasesContainer"
        >
          <p className="state-status">Confirmed</p>
          <img
            src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/check-mark_sowise.png"
            alt="state specific confirmed cases pic"
          />
          <p className="state-count">{totalConfirmed}</p>
        </div>
      </li>
      <li
        key={statusId.active}
        onClick={() => onSelect(statusId.active, '#007bff')}
        className="state-card-item"
      >
        <div
          className={`category-card ${activeColor} active-clr`}
          testid="stateSpecificActiveCasesContainer"
        >
          <p className="state-status">Active</p>
          <img
            src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/protection_x7c08c.png"
            alt="state specific active cases pic"
          />
          <p className="state-count">{totalActive}</p>
        </div>
      </li>
      <li
        key={statusId.recovered}
        onClick={() => onSelect(statusId.recovered, '#28a745')}
        className="state-card-item"
      >
        <div
          className={`category-card ${recoveredColor} recovered-clr`}
          testid="stateSpecificRecoveredCasesContainer"
        >
          <p className="state-status">Recovered</p>
          <img
            src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/recovered_a62w5v.png"
            alt="state specific recovered cases pic"
          />
          <p className="state-count">{totalRecovered}</p>
        </div>
      </li>
      <li
        key={statusId.deceased}
        onClick={() => onSelect(statusId.deceased, '#6c757d')}
        className="state-card-item"
      >
        <div
          className={`category-card ${deceasedColor} deceased-clr`}
          testid="stateSpecificDeceasedCasesContainer"
        >
          <p className="state-status">Deceased</p>
          <img
            src="https://res.cloudinary.com/dgulnqxe6/image/upload/v1677424366/miniproject/Covid19%20Dashboard/breathing_enzyun.png"
            alt="state specific deceased cases pic"
          />
          <p className="state-count">{totalDeceased}</p>
        </div>
      </li>
    </ul>
  )
}
export default StateCard
