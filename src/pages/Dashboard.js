import React,{useEffect, useRef, useState} from 'react'
import { Switch } from 'react-router-dom'
import { routes } from '../routes'
import Sidebar from '../components/Sidebar'
import {FaBars} from 'react-icons/fa'
import Home from '../components/Home'
import Sales from '../components/Sales'
import User from '../components/User'
import'../styles/main.css'
import PrivateRoute from '../PrivateRoute'
import Products from '../components/Products'


export default function Dashboard() {
    const active = useRef()
    const HandleActive=()=>{
        active.current.classList.toggle("active")
        setActiveBtn(active.current.classList.value)
    }
    const [activeBtn, setActiveBtn] = useState(
        JSON.parse(localStorage.getItem("active")) || "sidebar"
        )
    useEffect(() => {
        try{
            localStorage.setItem("active",JSON.stringify(activeBtn))
        }catch(error){
            localStorage.removeItem("active")
            console.log(error)
        }
    }, [activeBtn])
    return (
        <>
            <div ref={active} className={activeBtn}>
                <Sidebar/>
            </div>
            <div className="content">
                <div className="header">
                    <FaBars id="btn" onClick={HandleActive}/>
                    <Switch>
                        <PrivateRoute exact path={routes.home} component={()=><span className="text" >Home</span>} />
                        <PrivateRoute exact path={routes.products} component={()=><span className="text" >Products</span>} />
                        <PrivateRoute exact path={routes.sales.manageSales} component={()=><span className="text" >Sales</span>}/>
                        <PrivateRoute exact path={routes.users} component={()=><span className="text" >Users</span>}/>
                    </Switch>
                </div>
                <div className="main">
                    <Switch>
                        <PrivateRoute exact path={routes.home} component={Home} />
                        <PrivateRoute exact path={routes.products} component={Products} />
                        <PrivateRoute exact path={routes.sales.manageSales} component={Sales}/>
                        <PrivateRoute exact path={routes.users} component={User}/>
                    </Switch>
                </div>
            </div>
        </>
    )
}
