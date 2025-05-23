
interface UserAttributes{
  id: string
  email: string
  password: string
  isVerified: boolean
  verificationCode?: string | null
}


export default UserAttributes;