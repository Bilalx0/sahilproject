import React, {useState} from 'react'
import AdminSidebar from '../components/AdminSidebar'
import AdminDashboard from '../components/AdminDashboard'

function Admin() {
     const [viewType, setViewType] = useState("mansions"); // Default to Mansions
  return (
        <div className="flex flex-col sm:flex-row">
      <AdminSidebar setViewType={setViewType} />
      <AdminDashboard viewType={viewType} />
    </div>
  )
}

export default Admin
