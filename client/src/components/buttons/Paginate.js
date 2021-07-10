import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

function Paginate(props) {
  const { data, dataSetter, clicked } = props

  const [page, setPage] = useState(1)
  const [disable, setDisable] = useState({
    prev: false,
    next: false,
  })
  const [pembatas, setPembatas] = useState({
    start: 0,
    limit: 5,
  })

  const dataLength = data.length

  const pageLength = Math.ceil(dataLength / 5)

  const onClickNext = () => {
    if (page === dataLength) {
      setDisable({
        ...disable,
        next: true,
      })
    } else {
      clicked(true)
      setPage(page + 1)
      setPembatas({
        start: pembatas.start - 5,
        limit: pembatas.limit - 5,
      })
      dataSetter({
        data: dataTable(data, pembatas.start, pembatas.limit, page),
      })
    }
  }

  const onClickPrev = () => {
    if (page === 1) {
      setDisable({
        ...disable,
        prev: true,
      })
    } else {
      clicked(true)
      setPage(page - 1)
      setPembatas({
        start: pembatas.start + 5,
        limit: pembatas.limit + 5,
      })
      dataSetter({
        data: dataTable(data, pembatas.start, pembatas.limit, page),
      })
    }
  }

  const dataTable = (arrayData, start, limit, page) => {
    if (arrayData.length < 5) {
      let newData = []
      for (let i = 0; i < arrayData.length; i++) {
        newData.push(arrayData[i])
      }
      return newData
    } else {
      if (page === 1) {
        let newData = []
        for (let i = 0; i < limit; i++) {
          newData.push(arrayData[i])
        }

        return newData
      } else {
        let newData = []
        for (let i = start; i < limit; i++) {
          newData.push(arrayData[i])
        }

        return newData
      }
    }
  }

  return (
    <div className="paginate-section w-100 d-flex justify-content-between">
      <button
        type="button"
        className={
          disable.prev
            ? 'previous-btn pure-btn'
            : 'previous-btn pure-btn btn btn-light disabled'
        }
        onClick={() => onClickPrev()}
      >
        <FontAwesomeIcon icon={faBackward} /> previous
      </button>
      <span>{`${page}/${pageLength}`}</span>
      <button
        type="button"
        className={
          disable.next
            ? 'next-btn pure-btn'
            : 'next-btn pure-btn btn btn-light disabled'
        }
        onClick={() => onClickNext()}
      >
        <FontAwesomeIcon icon={faForward} /> next
      </button>
    </div>
  )
}

export default Paginate
