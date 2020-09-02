import Bluebird from 'bluebird';
import Recaptcha from 'recaptcha-v2';
import config from '../config.mjs';
  
export const verifyRecaptcha = (recaptchaData) => {
  
  
  return new Bluebird((resolve, reject) => {
  
    const recaptcha = new Recaptcha.Recaptcha(config.RECAPTCHA_SITE_KEY, config.RECAPTCHA_SECRET_KEY, recaptchaData);
  

  
    recaptcha.verify((success) => {
  
      if (success) {
  
        return resolve();
  
      }
      
      reject(new Error());
  
    });
  
  });
  
};