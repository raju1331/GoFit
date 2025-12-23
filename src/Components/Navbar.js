import React from 'react'

export default function Navbar({setPage}) {
  
  return (
    <div className='Nav' style={{background:'#212222ff'}}>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    
    <span className='navbar-brand fw-bold' style={{cursor:'pointer'}} onClick={()=>setPage("home")}>GoFit</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
         <span className="nav-link" style={{cursor:'pointer'}} onClick={()=>setPage("home")}>Home</span>
        </li>
        <li className="nav-item">
         <span className='navbar-link d-line-block text-white' role='button' style={{cursor:'pointer'}} onClick={()=>setPage("about")}>About</span>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Me 
          </a>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li><span
                  className="dropdown-item"
                  onClick={() => setPage("nutrition")}
                >
                  Nutrition
                </span></li>
            <li><span
                  className="dropdown-item"
                  onClick={() => setPage("activity")}
                >
                  Activity
                </span></li>
            <li><hr className="dropdown-divider"/></li>
            <li><span
                  className="dropdown-item"
                  onClick={() => setPage("vitals")}
                >
                  Vitals
                </span></li>
          </ul>
        </li>
        <button type="button" className="btn btn-warning fw-bold px-4"style={{ borderRadius: '10px'}} onClick={()=>setPage("dashboard")}>Dashboard</button>
        
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
