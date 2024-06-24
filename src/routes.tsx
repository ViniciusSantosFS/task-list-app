import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes as CoreRoutes } from 'react-router-dom'

import TasksScreen from 'src/pages/tasks'
import RegisterUsers from 'src/pages/register-user'

const Routes: React.FC = () => {
    return (
        <Router>
            <CoreRoutes>
                <Route path="/" element={<TasksScreen />} />
                <Route path="/users" element={<RegisterUsers />} />
            </CoreRoutes>
        </Router>
    )
}

export default Routes
