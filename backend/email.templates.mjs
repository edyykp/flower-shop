import config from './config.mjs';

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
export default {

  confirm: id => ({
    subject: 'Email de confirmare florariamedeea.ro',
    html: `
    <h2>Apăsați pe acest link pentru a vă confirma adresa de email.</h2>
      <a href='${config.CLIENT_URL}/confirmemail/${id}'>
        ${config.CLIENT_URL}/confirmemail/${id}
      </a>
    `,      
    text: `Copy and paste this link: ${config.CLIENT_URL}/confirmemail/${id}`
  }),
  
  forgotpassword: token => ({
    subject: 'Email pentru resetarea parolei florariamedeea.ro',
    html: `
      <h2>Apăsați pe acest link pentru a îți reseta parola</h2>
      <a href='${config.CLIENT_URL}/reset/${token}'>
      ${config.CLIENT_URL}/reset/${token}</a>
    `
  }),

  contactus: (name, email, phone, subject, message) => ({
    subject: subject,
    html: `<h1>De la ${name}:</h1>
    <br/><p style="font-size:20px;">${message}</p><hr/><p style="font-size:20px;">Contactați-l printr-un mail către ${email} sau cu un apel la numărul de telefon ${phone}</p>`
  })
}