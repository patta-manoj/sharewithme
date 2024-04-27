import React, { useState , useRef } from "react";
import { NavLink , useNavigate } from "react-router-dom";
import "./Navbar.css";
import 'primeicons/primeicons.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from 'primereact/sidebar';
import { useMediaQuery , Button } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Menu } from 'primereact/menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "primereact/resources/primereact.min.css";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpIcon from '@mui/icons-material/Help';


function NavBar() {
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);
  const useMobile = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const menuLeft = useRef(null);



    const items = [
      {
          label: 'Options',
          items: [
              {
                label: 'Dashboard',
                icon: <DashboardIcon fontSize="small"/>,
                command:()=>{navigate('/dashboard');setVisible(false);setClick(false);},
              },
              {
                  label: 'Instructions',
                  icon: <HelpIcon />,
                  command:()=>{navigate('/instructions');setVisible(false);setClick(false)},
              },
              {
                  label: 'Contact',
                  command:()=>{navigate('/contact');setVisible(false);setClick(false)},
                  icon: <ConnectWithoutContactIcon />,
              }
          ]
      },
  ];

  const handleClick = () => setClick(!click);
  return (
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <span>ShareWithMe</span>
          </NavLink>

          <div className={click ? "nav-menu active" : "nav-menu"}>
            <span className="nav-item">
              <NavLink
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </span>

            <span className="nav-item">
              <NavLink
                to="/sharefile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Share File
              </NavLink>
            </span>

            <span className="nav-item">
              <NavLink
                to="/getfile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Get File
              </NavLink>
            </span>

            <span className="nav-item">
              <li className="navbar__list-drop">

                <span activeclassname="active" className="nav-links">
                  <span>Other</span>
                  <div>
                    <svg className="arrow" width="10" height="6" xmlns="http://www.w3.org/2000/svg">
                      <path stroke="#686868" strokeWidth="1.5" fill="none" d="m1 1 4 4 4-4" />
                    </svg>
                  </div>
                </span>

                <ul className="navbar__list-drop-menu features relative">
                  <li><span onClick={()=>navigate('/myfiles')} className="service-items">My Files</span></li>
                  <li><span onClick={()=>navigate('/dashboard')} className="service-items">Dashboard</span></li>
                  <li><span className="service-items" onClick={()=>navigate('/instructions')}>Instructions</span></li>
                  <li><span className="service-items" onClick={()=>navigate('/contact')}>Contact</span></li>
                </ul>
              </li>
            </span>

          </div>

          <div className="card flex justify-content-center" style={{display:useMobile?'':'none'}}>
            <Sidebar className="sidebar-prime" visible={visible} onHide={() => setVisible(false)}>
                <span className="sidebar-logo">ShareWithMe</span>
                <div className="sidebar-menu-item-container">

                  <span className="sidebar-nav-item">
                    <NavLink
                      to="/"
                      className='sidebar-link-items'
                      onClick={() => setVisible(false)}
                    >
                      <span>Home</span>
                    </NavLink>
                  </span>

                  <span className="sidebar-nav-item">
                    <NavLink
                      className='sidebar-link-items'
                      to="/sharefile"
                      onClick={() => setVisible(false)}
                    >
                      <span>Share file</span>
                    </NavLink>
                  </span>

                  <span className="sidebar-nav-item">
                    <NavLink
                      to="/getfile"
                      className='sidebar-link-items'
                      onClick={() => setVisible(false)}
                    >
                      <span>Get File</span>
                    </NavLink>
                  </span>

                  <span className="sidebar-nav-item">
                    <NavLink
                      to="/myfiles"
                      className='sidebar-link-items'
                      onClick={() => setVisible(false)}
                    >
                      <span>My Files</span>
                    </NavLink>
                  </span>

                  <span className="sidebar-nav-item">
                    <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
                    <Button variant="text" endIcon={<KeyboardArrowDownIcon />} className="sidebar-link-items" onClick={(event) => menuLeft.current.toggle(event)} ><span style={{fontWeight:'500'}}>Other</span></Button>
                  </span>

                </div>
            </Sidebar>
            <MenuIcon style={{cursor:'pointer'}} sx={{fontSize:40}} onClick={() => setVisible(true)}/>
            {/* <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} /> */}
        </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;