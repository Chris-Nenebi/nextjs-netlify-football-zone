import Link from "next/link";
import Image from "next/image";
import AuthContext from "../storesContext/authContext";
import { useContext } from "react";

export default function Navbar() {
  // const contextStates = useContext(AuthContext);
  //  logout, authReady

  const { user, login, logout, authReady } = useContext(AuthContext);

  console.log(user);

  return (
    <div className="container">
      <nav>
        <Image src="/american_football.svg.png" width={50} height={48} />
        <h1>Football FansZone</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/guides">
                <a>Guides</a>
              </Link>
            </li>
            {!user && (
              <li onClick={login} className="btn">
                Login/Signup
              </li>
            )}
            {user && <li>{user.email}</li>}
            {user && (
              <li onClick={logout} className="btn">
                Logout
              </li>
            )}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/football-banner.jpg" width={966} height={276} />
      </div>
    </div>
  );
}
