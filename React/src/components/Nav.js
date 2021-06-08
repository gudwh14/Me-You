    import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <NavLink className='navbar' activeClassName='navbar-active' to='/home/meeting'>미팅</NavLink>
            <NavLink className='navbar' activeClassName='navbar-active' to='/home/blind'>소개팅</NavLink>
        </nav>
    )
}

export default Nav;