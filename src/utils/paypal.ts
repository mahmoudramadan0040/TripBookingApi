import axios from 'axios'
import config from '../config/config'
const generateAccessToken = async () => {
  const res = await axios.post(
    `${config.paypal_api}/v1/oauth2/token`,
    'grant_type=client_credentials',
    {
      auth: {
        username: config.paypal_client_id!,
        password: config.paypal_client_secret!,
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )
  return res.data.access_token
}

export default generateAccessToken
