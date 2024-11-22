import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import {useState, useEffect, useContext, createContext} from 'react'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}
export function AuthProvider(props) {
    const {children} = props
    const [globalUser, setGlobalUser] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
   

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logOut() {
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }
    function resentPassword(email){
        return sendPasswordResetEmail(auth, email)
    }
   

    const value = { globalUser, globalData, setGlobalData, isLoading, signup, login, logOut, resentPassword}
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user ) => {
            console.log('Current USer', user)
            setGlobalUser(user)
            // if there is no user, empty the user state and return from this listener
            if(!user) {
                console.log('No user!')
                return
            }

            //if there is a user, check if user has data in the database, and if they do , then fetch said data and update the global state

            try {
                setIsLoading(true)
                //creating reference for the document (labeled document object), and then we get the doc and then we snapshot it to see if there is anything
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {

                }
                if(docSnap.exists) {
                    console.log('Found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)
            } catch (error) {
                console.log(error)
                
            } finally {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }, []) 
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    )
}