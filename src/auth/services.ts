import { signInWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/utils/firebase'
import { queryUserById } from '@/utils/firebase/queries'

const authenticateUser = async (email: string, password: string) => {
  if (!email || !password) return

  // First sign user with the email in firebase
  const userCredential = await signInWithEmailAndPassword(auth, email, password)

  // userInfo from database
  const userInfo: any = await queryUserById(userCredential.user.uid)

  const username: string = userInfo.length > 0 ? userInfo[0].fullname : 'N/A'

  let accessToken = ''
  try {
    const idTokenResult = await userCredential.user.getIdTokenResult()
    accessToken = idTokenResult.token
  } catch (error) {
    console.log(error)
  }
  console.log(accessToken)
  return {
    id: userCredential.user.uid,
    name: username,
    email: userCredential.user.email,
    accessToken,
  }
}

export const authService = { authenticateUser }
