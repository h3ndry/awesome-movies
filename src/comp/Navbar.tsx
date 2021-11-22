import { Link } from "react-router-dom";
import { useState } from "react"

function Navbar() {
    
    const [showMenu, setShowMenu] = useState(false)

    return (
        <nav>
            <div className="logo">
                <Link to="/">
                    Awesome <br /> Movies
                </Link>
            </div>

            <ul className="nav-list">
                <li>
                    <Link to="/"> Home </Link>
                </li>
                <li>
                    <Link to="/movies">
                        Popular <br /> Movies
                    </Link>
                </li>
                <li>
                    <Link to="/about">
                        About the <br /> developer
                    </Link>
                </li>
            </ul>

            <aside>

                <div className="menu" onClick={() => { setShowMenu((prev) => (!prev)) }} >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={ showMenu ? "side-list active" : "side-list" }>
                    <li onClick={() => { setShowMenu((prev) => (!prev)) }}>
                        <Link to="/"> Home </Link>
                    </li>
                    <li onClick={() => { setShowMenu((prev) => (!prev)) }}>
                        <Link to="/movies">
                            Popular Movies
                        </Link>
                    </li>
                    <li onClick={() => { setShowMenu((prev) => (!prev)) }}>
                        <Link to="/about">
                            About the developer
                        </Link>
                    </li>
                </ul>
            </aside>
        </nav>
    );
}

export default Navbar;
