import dotenv from 'dotenv'
dotenv.config()
const { 
    PORT,
    POSTGRESS_DB,
    POSTGRESS_DB_TEST,
    POSTGRESS_USER,
    POSTGRESS_PORT,
    POSTGRESS_HOST,
    POSTGRESS_PASSWORD,
    NODE_ENVIRONMENT,
    BYCRPTE_PASS,
    SALT_ROUNDS,
    TOKEN_SECRET
}=process.env 


const config ={
    port:PORT,
    db:NODE_ENVIRONMENT === 'dev' ? POSTGRESS_DB : POSTGRESS_DB_TEST,
    db_port:parseInt(POSTGRESS_PORT as string),
    db_user:POSTGRESS_USER,
    db_password:POSTGRESS_PASSWORD,
    db_host:POSTGRESS_HOST,
    pepper:BYCRPTE_PASS,
    salt:SALT_ROUNDS,
    token_secret:TOKEN_SECRET
}
export default config;