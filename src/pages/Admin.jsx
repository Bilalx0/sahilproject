import React, {useState} from 'react'
import AdminSidebar from '../components/AdminSidebar'
import Dashboard from '../components/Dashboard'

function Admin() {
     const [viewType, setViewType] = useState("mansions"); // Default to Mansions
  return (
        <div className="flex flex-col sm:flex-row">
      <AdminSidebar setViewType={setViewType} />
      <Dashboard viewType={viewType} />
    </div>
  )
}

export default Admin
