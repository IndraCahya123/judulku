import { useParams, useHistory } from 'react-router-dom'
import { Document, Page } from 'react-pdf'
import axios from 'axios'
import { useState, useEffect } from 'react'

import Loading from '../components/Loading'

function DocumentView() {
  const { judulTitle } = useParams()

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="main-program-wrapper">
      <Document
        file={`http://localhost:5000/files/${judulTitle}`}
        options={{ workerSrc: '../../public/pdf.worker.js' }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}

export default DocumentView
