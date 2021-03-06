import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.PORT,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    CLIENT_URL: process.env.CLIENT_URL,
    API_URL: process.env.API_URL,
    RESET_PASSWORD_KEY: process.env.RESET_PASSWORD_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    PRIVATEKEYPATH: process.env.PRIVATEKEYPATH,
    PUBLICKEYPATH: process.env.PUBLICKEYPATH
}