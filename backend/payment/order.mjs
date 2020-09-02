'use strict';

import crypto from 'crypto';
import rc4 from './encrypt.mjs';
import fs from 'fs';
import xml2js from 'xml2js';
import config from '../config.mjs';



const privateKey = fs.readFileSync( config.PRIVATEKEYPATH ).toString();
const publicKey = fs.readFileSync( config.PUBLICKEYPATH ).toString();
var builder = new xml2js.Builder( {
    cdata: true
} );
var parser = new xml2js.Parser({
  explicitArray:false
});

function getPayment( orderId, amount, currency, facturare, firstName, lastName, address, email, phone, destinationName, destinationAddress, destinationPhone ) {
  let date=new Date();
    return {
        order: {
            $: {
                id: orderId,
                timestamp: date.getTime(),
                type: 'card'
            },
            signature: 'DL7E-PMH3-8GAY-Q7PH-GHXR',
            url: {
                return: 'https://www.florariamedeea.ro/finishedorder/' + orderId,
                confirm: 'https://www.florariamedeea.ro/api/orders/confirmURL/' + orderId
            },
            invoice: {
                $: {
                    currency: currency,
                    amount: amount,
                },
                details: 'Comanda la ' + destinationAddress,
                contact_info: {
                    billing: {
                        $: {
                            type: `${facturare === 'persoanafizica' ? "person" : "company"}`
                        },
                        first_name: firstName,
                        last_name: lastName,
                        address: address,
                        email: email,
                        mobile_phone: phone
                    },
                    shipping: {
                        $: {
                            type: 'person'
                        },
                        first_name: destinationName,
                        address: destinationAddress,
                        mobile_phone: destinationPhone
                    }
                }
            }
        }
    };
}

function getRequest(orderId, totalPrice, facturare, firstName, lastName, address, email, phone, destinationName, destinationAddress, destinationPhone){
  let xml = builder.buildObject(getPayment(orderId, totalPrice,'RON', facturare, firstName, lastName, address, email, phone, destinationName, destinationAddress, destinationPhone));
  return rc4.encrypt(publicKey,xml);
}

function decodeResponse(data){
    return new Promise(function(resolve,reject){
      parser.parseString(rc4.decrypt(privateKey,data.env_key,data.data),function(err,result){
        if(err){
          reject(err);
        }
        resolve(result);
      });
    });
}


export{
  getRequest,
  decodeResponse
};