import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/utils/firebase'
import { getUserById } from '@/utils/firebase/queries'
import { capitalize } from '@/utils/helpers'

const authenticateUser = async (email: string, password: string) => {
  if (!email || !password) return

  // First sign user with the email in firebase
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  // userInfo from database
  const userInfo: any = await getUserById(userCredential.user.uid)

  const username: string = userInfo.length > 0 ? userInfo[0].fullname : 'N/A'

  let accessToken = ''
  try {
    const idTokenResult = await userCredential.user.getIdTokenResult()
    accessToken = idTokenResult.token
  } catch (error) {
    console.log(error)
  }

  return {
    id: userCredential.user.uid,
    name: capitalize(username),
    email: userCredential.user.email,
    accessToken,
  }
}

export const authService = { authenticateUser }
