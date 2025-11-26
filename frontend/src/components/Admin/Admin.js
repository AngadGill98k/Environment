import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  let token = useSelector((state) => state.token);
  let naviagte = useNavigate()


  let [toggle, settoggle] = useState("verify")
  let [paper, setpaper] = useState([]);
  let [bookmarks, setbookmark] = useState([]);
  let [admins, setadmins] = useState([]);
  useEffect(() => {
    console.log(token);
    if (!token) return;
    fetch('http://localhost:3001/get_papers_to_verify', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg) {
          setpaper(data.papers)
        }
      })
      .catch(err => console.error(err));


    fetch('http://localhost:3001/get_bookmarks', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg) {
          setbookmark(data.bookmarks)
        }
      })
      .catch(err => console.error(err));


    fetch('http://localhost:3001/get_moderators', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.msg) {
          setadmins(data.admins)
        }
      })
      .catch(err => console.error(err));
  }, [])


  let nameref = useRef()
  let passref = useRef()
  let mailref = useRef()
  let handleMod = () => {
    fetch('http://localhost:3001/add_moderator', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameref.current.value,
        pass: passref.current.value,
        mail: mailref.current.value
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
  }
  return (
    <>
      <div className="nav_con"><Navbar /></div>



      <div style={{ display: "flex", flexDirection: "row", height: "95vh" }}>
        <div style={{ display: "flex", flexDirection: "column", borderRight: "2px solid black", width: "20%" }}>
          <button
            onClick={() => settoggle("verify")}
            style={{

              padding: "10px",
              border: "none",

              backgroundColor: "#367c4dff",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
          // onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#357ABD"}
          // onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#4a90e2"}
          >
            Verify Papers
          </button>

          <button
            onClick={() => settoggle("moderators")}
            style={{

              padding: "10px",
              border: "none",

              backgroundColor: "#367c4dff",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
          // onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#3da562"}
          // onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#50c878"}
          >
            Manage Moderators
          </button>

          <button
            onClick={() => settoggle("bookmark")}
            style={{

              padding: "10px",
              border: "none",

              backgroundColor: "#367c4dff",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
          // onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#d48806"}
          // onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f5a623"}
          >
            Manage Bookmarks
          </button>
        </div>


        <div style={{ overflowY: "scroll", width: "80%", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {/* Verify Papers Section */}
          {toggle === "verify" && (
            <ul style={{ margin: "10px", padding: "0px" }}>
              <h3>All Papers</h3>
              {paper &&
                paper.map((p, index) => (
                  <li
                    style={{
                      listStyle: "none",
                      border: "2px solid #ddd",
                      borderRadius: "10px",
                      padding: "15px",
                      marginBottom: "12px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    key={index}
                    onClick={() => {
                      console.log(p);
                      naviagte(`/verify`, { state: { paper: p } });
                    }}
                  >
                    <h3 style={{margin:"0px",padding:"0px"}}>{p.name}</h3>
                    <p>{p.description}</p>
                    <span>{p.verified ? "✅ Verified" : "❌ Not Verified"}</span>
                  </li>
                ))}
            </ul>
          )}

          {/* Moderators Section */}
          {toggle === "moderators" && (
            <>
            <h3>Add Moderators</h3>
            <div style={{ display: "flex", flexDirection: "row",  width: "100%", margin: "20px auto", justifyContent: "space-around" }}>
  <input
    ref={nameref}
    type="text"
    placeholder="Username"
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "23%",
      boxSizing: "border-box"
    }}
  />
  <input
    ref={mailref}
    type="text"
    placeholder="Email"
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "23%",
      boxSizing: "border-box"
    }}
  />
  <input
    ref={passref}
    type="password"
    placeholder="Password"
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "23%",
      boxSizing: "border-box"
    }}
  />
  <button
    onClick={handleMod}
    style={{
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #aaa",
      cursor: "pointer",
      width: "23%",
    }}
  >
    Add Mod
  </button>
</div>



            <ul style={{ margin: "10px", padding: "0px" }}>
  <h3>All Moderators</h3>
  {admins &&
    admins.map((a, index) => (
      <li
        key={index}
        style={{
          listStyle: "none",
          border: "2px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
        }}
        onClick={() => {
          console.log(a);
          // navigate(`/admin/${a._id}`)  // optional navigation
        }}
      >
        <h3 style={{ margin: "0px", padding: "0px" }}>{a.name}</h3>
        <p style={{ margin: "5px 0" }}>📧 {a.mail}</p>
        <span style={{ fontWeight: "bold", color: "#007bff" }}>
          Role: {a.role}
        </span>
      </li>
    ))}
</ul>

            </>
          )}

          {/* Bookmarks Section */}
          {toggle === "bookmark" && (
            <ul style={{ margin: "10px", padding: "0px" }}>
              <h3>All Bookmarks</h3>
              {bookmarks &&
                bookmarks.map((bookmark, index) => (
                  <li
                    style={{
                      listStyle: "none",
                      border: "2px solid #ddd",
                      borderRadius: "10px",
                      padding: "15px",
                      marginBottom: "12px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
                    }}
                    onClick={() => {
                      naviagte(`/verify`, { state: { paper: bookmark } });
                    }} key={index}>
                    <h3 style={{margin:"0px",padding:"0px"}}>{bookmark.title}</h3>
                    <p>{bookmark.description}</p>
                    <span>{bookmark.verified ? "✅ Verified" : "❌ Not Verified"}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

      </div>


    </>
  )
}

export default Admin