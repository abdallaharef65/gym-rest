/* eslint-disable */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/index'))
const Users = React.lazy(() => import('./views/pages/Users/Users'))
const Calendar = React.lazy(() => import('./views/pages/calendar/calendar'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/users', name: 'Users', element: Users, exact: true },
  { path: '/calendar', name: 'Users', element: Calendar, exact: true },
]

export default routes
