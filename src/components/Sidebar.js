import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from '../routes'
import {FaCashRegister} from 'react-icons/fa'
import {AiOutlineHome} from 'react-icons/ai'
import {BiLogOut,BiUser} from 'react-icons/bi'
import {BsChevronDown} from 'react-icons/bs'
import {GiTwirlCenter} from 'react-icons/gi'
import useAuth from '../auth/useAuth'

export default function Sidebar() {
    const auth=useAuth()
    const showMenu = useRef()
    const homeRef=useRef()
    const userRef=useRef()
    const Menu=[
        {id:1,title:"Home",path:routes.home, icon:<AiOutlineHome className="icon"/>,DrowDown:false,ref:homeRef},
        {id:2,title:"Products",path:routes.products, icon:<AiOutlineHome className="icon"/>,DrowDown:false,ref:homeRef},
        {id:3,title:"Sales", path:routes.sales.manageSales,icon:<FaCashRegister className="icon"/>,DrowDown:true,ref:showMenu,options:[
            {id:3.1,title:"Manage Sales",path:routes.sales.manageSales},
            {id:3.2,title:"Data Sales",path:routes.sales.querySales},
            {id:3.3,title:"Sales Update",path:routes.sales.updateSales},
        ]},
        {id:4,title:"Users",path:routes.users, icon:<BiUser className="icon"/>,DrowDown:false,ref:userRef},
    ]
    const HandleDropDown=()=>{
        showMenu.current.classList.toggle("showMenu")
    }
    const Navbar =()=>{
        return(
            Menu.map(btn=>
                btn.DrowDown?
                <li ref={btn.ref} key={btn.id}>
                    <div className="iocn-link">
                        <NavLink ref={btn.refsub} to={btn.path} activeClassName="active-link">
                            {btn.icon}
                            <span className="links_name">{btn.title}</span>
                        </NavLink>
                        <BsChevronDown className="icon arrow" onClick={HandleDropDown}/>
                    </div>
                    <ul className="sub-menu">
                        <li><span className="links_name">{btn.title}</span></li>
                        {btn.options.map(el=><li key={el.id} ><NavLink exact to={el.path} activeClassName="active-sub-link">{el.title}</NavLink></li>)}
                    </ul>
                </li>
                :
                <li key={btn.id} ref={btn.ref} className="list">
                    <NavLink exact to={btn.path} activeClassName="active-link">
                        {btn.icon}
                        <span className="links_name" >{btn.title}</span>
                    </NavLink>
                    <ul className="sub-menu blank">
                        <li><NavLink to={btn.path} className="links_name" activeClassName="active-link">{btn.title}</NavLink></li>
                    </ul>
                </li>
                )
        )
    }
    return (
        <>
            <div className="logo_details">
                    <GiTwirlCenter className="icon"/>
                    <span className="logo_name">Factory Name</span>
            </div>
            <ul className="nav_list">
                <Navbar/>
                <li style={{padding:0}}>
                    <div className="profile-details">
                        <button className="profile-content" onClick={auth.logout}>
                            <BiLogOut className="icon" id="log_out"/>
                        </button>
                        <div className="name-job">
                            <div className="profile-name">Prem Shaki</div>
                        </div>
                    </div>
                </li>
            </ul>
        </>
    )
}
