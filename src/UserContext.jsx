import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = "expires=" + d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }

  const getCookie = (cname) => {
    let name = cname + "="
    let ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == " ") {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
  }

  const checkCookie = () => {
    let user = getCookie("username")
    if (user != "") {
      alert("Welcome again " + user)
    } else {
      user = prompt("Please enter your name:", "")
      if (user != "" && user != null) {
        setCookie("username", user, 365)
      }
    }
  }

  const config = {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  }

  useEffect(() => {
    if (!user) {
      axios.get("/profile", config).then(({ data }) => {
        setUser(data)
        setReady(true)
      })
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser, ready, setCookie, getCookie, checkCookie, config }}>
      {children}
    </UserContext.Provider>
  )
}
