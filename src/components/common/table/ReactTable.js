/* eslint-disable */

import React, { useEffect } from 'react'
import {
  useTable,
  useGlobalFilter,
  useExpanded,
  usePagination,
  useRowSelect,
  useSortBy,
  useResizeColumns,
} from 'react-table'
import {
  CButton,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableFoot,
} from '@coreui/react'
import { useDispatch, useSelector } from 'react-redux'
import IGlobalFilter from './IGlobalFilter'

function IReactTable({
  dataFotter,
  paginationFlag,
  footerFlag,
  columns,
  data,
  detailsCoulmns,
  renderRowSubComponent,
  skipPageReset,
  flagTable,
  tableRef,
  hideFilter,
  hiddenColumns,
  heightTable,
}) {
  const dispatch = useDispatch()
  const numberOfPages = [10, 25, 50, 100, 300, 500, 1000]
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    pageCount,
    setGlobalFilter,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      initialState: { hiddenColumns: hiddenColumns != undefined ? hiddenColumns : '' },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  )

  const { globalFilter, pageIndex, pageSize } = state
  return (
    <div className="scrollable" style={{ height: heightTable ? heightTable : '' }}>
      {/*
    <CRow className="mb-3">
        {hideFilter ? '' : <IGlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />}
      </CRow> */}
      <CTable {...getTableProps()} className="table-hover editableTable" ref={tableRef}>
        <CTableHead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, index) => (
              // Apply the header row props
              <CTableRow {...headerGroup.getHeaderGroupProps()} key={index}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, index) => (
                    // Apply the header cell props
                    <CTableHeaderCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                    >
                      {
                        // Render the header
                        column.render('Header')
                      }
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽 ' : ' 🔼 ') : ''}</span>
                    </CTableHeaderCell>
                  ))
                }
              </CTableRow>
            ))
          }
        </CTableHead>
        {/* Apply the table body props */}
        <CTableBody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row)
              return (
                // Apply the row props
                <React.Fragment key={row.id}>
                  <CTableRow {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, index) => {
                        // Apply the cell props
                        return (
                          <CTableDataCell {...cell.getCellProps()} key={index}>
                            {
                              // Render the cell contents
                              cell.render('Cell')
                            }
                          </CTableDataCell>
                        )
                      })
                    }
                  </CTableRow>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>{renderRowSubComponent({ row })}</td>
                    </tr>
                  ) : null}
                </React.Fragment>
              )
            })
          }
        </CTableBody>
        {footerFlag && (
          <CTableFoot>
            <tr>
              <td colSpan="2">
                {' '}
                التقدير : {dataFotter.result} <br />
                النتيجة : {dataFotter.status}
              </td>

              {/* Use colSpan to span multiple columns if needed */}
            </tr>
          </CTableFoot>
        )}
      </CTable>
      {!paginationFlag && (
        <div className="text-center my-5">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}{' '}
            </strong>
            <span>
              | Go to Page:{' '}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(pageNumber)
                }}
                style={{ width: '50px' }}
              />
            </span>
          </span>{' '}
          <select
            className="me-5"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {numberOfPages.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <CButton color="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </CButton>
          <CButton
            className="ms-1"
            color="dark"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Prev
          </CButton>
          <CButton className="ms-3" color="dark" onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </CButton>
          <CButton
            className="ms-1"
            color="dark"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </CButton>
        </div>
      )}
    </div>
  )
}

export default IReactTable
