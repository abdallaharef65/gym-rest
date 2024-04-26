/* eslint-disable */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/index'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
]

export default routes
