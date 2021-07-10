import { Spinner } from 'react-bootstrap'

function Loading() {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <Spinner
        animation="grow"
        variant="dark"
        style={{ margin: '0 10px', width: 20, height: 20 }}
      />
      <Spinner
        animation="grow"
        variant="dark"
        style={{ margin: '0 10px', width: 20, height: 20 }}
      />
      <Spinner
        animation="grow"
        variant="dark"
        style={{ margin: '0 10px', width: 20, height: 20 }}
      />
    </div>
  )
}

export default Loading
