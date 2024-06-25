import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes as CoreRoutes } from 'react-router-dom'

import TasksScreen from 'src/pages/tasks'
import RegisterTask from 'src/pages/register-task'

const Routes: React.FC = () => {
    return (
        <Router>
            <CoreRoutes>
                <Route path="/" element={<TasksScreen />} />
                <Route path="/tasks/register" element={<RegisterTask />} />
            </CoreRoutes>
        </Router>
    )
}

export default Routes
