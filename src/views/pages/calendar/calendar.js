/* eslint-disable */
import React, { useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import { DocsExample } from 'src/components'
import axios from 'axios'

const Buttons = () => {
  useEffect(() => {
    ;(async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('http://localhost:3001/bills')

        console.log(response)
        // Update state with the fetched data
        // setData(response.data);
        // setLoading(false);
      } catch (error) {
        // Handle errors
        // setError(error);
        // setLoading(false);
      }
    })()
  }, [])
  
  return (
    <CRow>
      
    </CRow>
  )
}

export default Buttons
