import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid))
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role)
        }
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
        setUserRole(null)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser, userRole }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}