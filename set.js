const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUZuNDIyYmw1d1hCNXNWRVc1SEdFVGkvVXd4dFp2aGtHQkRuTi9JRlZFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRm1xS3RsaUxOb3ZtYmF3Y3l6eXRpY0VnRW1YdzhsTVhuNjFHWWNqcXRGbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTkw3RExGakluWVpQVlpMb1RFU1dWbi9SZFo3czd1V2JVUXVtUjlSZWtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTbkExOW1lM0V1U1FyTXdYVnR0WHFib0pTUWRsbmVoVkZ3K01tUGxaY3pzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndIeSt4MVRkWWdud3I3TldLbVhGTnhrVkdKQVloNzVxMitod3JDbm8wRjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9rbTFYbGh0SXdYMjhrR2NabEt4NUxoRE1FR0MyeVJHMVAxRWhQQXBIeXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0hDdXQrT3dxUzI4QjhKY2pSemVjeUUyN3dwRzJqN0pSMHhnRHpORDVFTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTAva3Bwb0JPbld2Y1Z0T0JXd05MMGNOMkF0K0dUd0k0a3BpeGdycUZpRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRqU3BWYnFKU0RLSTdhdTNNR0dQMlpiNGErZGd4eWgzVG9seUI2MS9yd1doRElPNkRkZG0vb1AxT3BJVGYrdHFLZklwQTNjbk5sS0IweE9IT0JvM0NRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MywiYWR2U2VjcmV0S2V5IjoiY09yaW9kcGRrMlZuM2FORnRRaFVOOWdxTkVtUGQwNHlFWTA2QXVuaS9yVT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiVW1oS25tZHdRbTZmY1Iza1FnSlo2dyIsInBob25lSWQiOiI1OTE0NzgyOC1lMDE1LTQ3NmYtOTBkMi03YWNhMmRjMjNmMWUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicURCc1B3b3ArK0VBTWhhaEF3Ui93ZFluTzNrPSJ9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4VkJRUk04K3k3TERBOEFJbjJMMVhKdmpxUW89In0sInJlZ2lzdHJhdGlvbiI6e30sImFjY291bnQiOnsiZGV0YWlscyI6IkNPeloxT2tHRU02RXRMUUdHQlVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJNWUZMZjh3Mm50STZQRW5mRGxIck5nbndpYUYrT0JIcjdIK3liRHMzcEZrPSIsImFjY291bnRTaWduYXR1cmUiOiIvOWp0TmFmWk1jL3FHU0hhY0haclowdTVQNW80RmNsN05rR3A1dzVncDFtQkRBbk9pZVBrOXRFcDRCSTNmQmlxUUdDcnEwRDZJK2E2bENUU1pKMjdCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWXN4QWo2a3hHUTd5ZGluKy9oek42S3luWmVPdnBsNU9hSUZ1NjREZnlVdDZDbTZCbkpGVWNYUmhycXNoY2dTSjdoZXNRQi9pYW8zZm9JWS9pdUV2QVE9PSJ9LCJtZSI6eyJpZCI6IjIzNzY1NDc2NTExNTo3MEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjEwMjE1MTU1MjUxNjIwNjo3MEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjU0NzY1MTE1OjcwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRHQlMzL01OcDdTT2p4SjN3NVI2ellKOEltaGZqZ1I2K3gvc213N042UloifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDUxNzIxMywibGFzdFByb3BIYXNoIjoiMldVam1aIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Edward Stark 🦾🦿",
    NUMERO_OWNER : process.env.OWNER_NUM || "237654765115",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
