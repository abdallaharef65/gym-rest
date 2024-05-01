/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CRow,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { getData } from '../../../helper'

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  password: null,
  role: null,
  role_id: null,
}
const UsersModal = ({ visible, setVisible, flagState, setFlagState, dataForEdit }) => {
  //state
  const [mainState, setMainState] = useState(initialState)
  const [loading, setLoading] = useState(true)
  console.log(mainState)
  useEffect(() => {
    if (flagState > 0) {
      ;(async () => {
        try {
          // Make a GET request to the API endpoint
          setLoading(true)
          const res = await getData('role')
          console.log(res.data)

          if (flagState == 2) {
            setMainState((current) => ({
              ...current,
              first_name: dataForEdit.first_name,
              last_name: dataForEdit.last_name,
              email: dataForEdit.email,
              phone: dataForEdit.phone,
              password: dataForEdit.password,
              role: dataForEdit.role,
              role_id: dataForEdit.role_id,
            }))
          } else {
            setMainState(initialState)
          }

          setTimeout(() => {
            setLoading(false)
          }, 1000)
        } catch (err) {
          console.log(err)
        }
      })()
    }
  }, [flagState])

  return (
    <React.Fragment>
      <CModal
        size="xl"
        visible={visible}
        onClose={() => {
          setVisible(false), setFlagState(0)
        }}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader
          onClose={() => {
            setVisible(false), setFlagState(0)
          }}
        >
          <CModalTitle id="LiveDemoExampleLabel">
            {flagState == 1 ? 'Add User' : 'Edit User'}
          </CModalTitle>
        </CModalHeader>
        {loading ? (
          <CRow className="mt-5">
            <CCol sm={5}></CCol>
            <CCol sm={2}>
              <div className="loader"></div>
            </CCol>
            <CCol sm={5}></CCol>
          </CRow>
        ) : (
          <React.Fragment>
            <CModalBody>
              <CRow>
                <CCol sm={6}>
                  <CFormInput
                    type="text"
                    id="FirstName"
                    label="First Name"
                    defaultValue={mainState.first_name}
                    onChange={(e) => {
                      setMainState((current) => ({
                        ...current,
                        first_name: e.target.value,
                      }))
                    }}
                  />
                </CCol>
                <CCol sm={6}>
                  <CFormInput
                    type="text"
                    id="FirstName"
                    label="Last Name"
                    defaultValue={mainState.last_name}
                    onChange={(e) => {
                      setMainState((current) => ({
                        ...current,
                        last_name: e.target.value,
                      }))
                    }}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6}>
                  <CFormInput
                    type="phone"
                    id="phone"
                    label="Phone"
                    defaultValue={mainState.phone}
                    onChange={(e) => {
                      setMainState((current) => ({
                        ...current,
                        phone: e.target.value,
                      }))
                    }}
                  />
                </CCol>
                <CCol sm={6}>
                  <CFormInput
                    type="email"
                    id="email"
                    label="Email"
                    defaultValue={mainState.email}
                    onChange={(e) => {
                      setMainState((current) => ({
                        ...current,
                        email: e.target.value,
                      }))
                    }}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6}>
                  <CFormSelect
                    label="Role"
                    aria-label="Default select example"
                    options={[
                      'Open this select menu',
                      { label: 'One', value: '1' },
                      { label: 'Two', value: '2' },
                      { label: 'Three', value: '3', disabled: true },
                    ]}
                  />
                </CCol>
                <CCol sm={6}>
                  {/*

                <CFormInput
                  type="email"
                  id="email"
                  label="Email"
                  defaultValue={mainState.email}
                  onChange={(e) => {
                    setMainState((current) => ({
                      ...current,
                      email: e.target.value,
                    }))
                  }}
                />
*/}
                </CCol>
              </CRow>
            </CModalBody>
          </React.Fragment>
        )}

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false), setFlagState(0)
            }}
          >
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </React.Fragment>
  )
}

export default UsersModal
