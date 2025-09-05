import { useSelector } from "react-redux"
import { useLogOut } from "../hook/LogOut"
import { useCollection } from "../hook/useCollection"

export default function Home() {
  const { ispending, logout } = useLogOut()
  const { user } = useSelector((store) => store.user)
  const { data } = useCollection("users")
  console.log(data);

  return (
    <>
      <div className="container">
        <div className="flex">
          <nav className="navbar">
            <div className="navbar-logo">
              <h2>Home - {user.displayName}</h2>
            </div>
            <ul className="navbar-links">
              <li>
                {!ispending && <button className="oauthButton" onClick={logout}>LogOut</button>}
                {ispending && <button className="oauthButton" disabled >Loading...</button>}
              </li>
            </ul>
          </nav>



          <div className="wrapper">
            <div className="title">
              <h2>Users List</h2>
            </div>

            {data && data.map((user) => {


              return (
                <div key={user.uid} className="card">
                  <div className="img">
                    <img src={user.photoUrl} alt="" />
                  </div>
                  <div className="content">
                    <div>
                      <h3>{user.displayName}</h3>
                      <p>{user.email}</p>
                      <p> {user.online ? 'online' : 'offline'} </p>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </div>

    </>
  )
}
