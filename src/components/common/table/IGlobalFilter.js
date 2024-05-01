/* eslint-disable */

import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
import { CFormInput, CFormLabel } from '@coreui/react'

function IGlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter)
  // const handleFilter = useAsyncDebounce((value) => {
  //   setFilter(value || undefined)
  // }, 400)

  // Create a debounced version of setSearchTerm
  const debouncedSearch = useAsyncDebounce(setValue, 300)

  const handleSearchChange = (e) => {
    const value = e.target.value
    // Use the debounced version of setSearchTerm
    debouncedSearch(value)
  }

  return (
    <div className="">
      <CFormLabel htmlFor="search">بحث :</CFormLabel>
      <CFormInput
        type="text"
        id="search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          handleSearchChange
        }}
        autoComplete="off"
      />
    </div>
  )
}

export default IGlobalFilter
