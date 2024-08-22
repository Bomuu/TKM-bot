const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pJMFBSYk8xZUFWVGt1VFk0U01WRHpCSi9QTVJhT1lReVVwM2hwSHNuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzlKRWxFNmpzNS9IRWNURWx6QWtuc3lQRUdncjlQeVlJMTQvZG8rUU0xRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTkVuMkRvcDVsUUJOU25Mbm5iMXVxVm9ZSjA4cGI4ZHhKQzBaS0Z4T2trPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlVm1VMWRsVFcydlpGUzE4QklsOCs0aVZXQjR1eDJoZXZ0VTl6S2xvekZVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMcEhnUCtKOVlCQm5tVnhoVWRNZEtIZnFxUzNjbzBVVFRiNjhoRWR6V0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFvcjZRcTZvV20xVUp3eVpLZkJKK2EwMU95Uko3RklSWnAwTENsTVB3M2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUl2WERvbVVHYlpoRGZHRU4xZWNLNTVIOGlvQSs1TGlUZ3AyWnNjMkZGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGtPY2ZpMHdvc3p0ZmNRME9rcWE4Unlyc1ZuOEZMaVB0UVVJUlpZeDhUYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxMQ3BpNVhZRXlmZEQwUDVzSnR0V1gzTzVSWmhyMVdKaCtsTStEZ3BnMFNkZlcwSjBPbkErd3ZvR1VLQnNuWUIwVjJ1RXp0UFpSZ2V0SG5GS3dJRkJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJlWjJBSjNRSFAvcnVvbXBCYVhwMURGZTl4dHR2bG9iZU85aVVMUmViWldFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2blNaZjZ2VVNFV3RQNFBFcGZmUkFnIiwicGhvbmVJZCI6IjU3NzZmMzg0LTI0MGMtNDlhZS1iYjM3LWU0YzUyODRmMzUyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2ZHZSbi9UMlZBdUxFY05DRDdnZjZCY2w1RUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1FKNjVzeUJ2UVEvbFRWZVdNNWYvY2dCYWlvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjI3WkxaMTRWIiwibWUiOnsiaWQiOiIyMzc2NTQ3NjUxMTU6NjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiU3RhcmsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0llUHlKTUhFUERMbTdZR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkFzSXVXclpNdUdhMlQrU282YWxMYmtzUEdTYUNzZkRCazVKd2EyRWlPaTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhvSXN6blV3czJMZFlWMmlBZHdGUkYwTmt6eWhOQTJteDJYcjZDODZTWjFmK2F4dDA0WkxrZm9CN0hJUmhoNGtHejZjK2dBWWlrYkhpbDB3OGtFa0NRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyMGRRWElrcVRZQmN1elFxeGZ5R1ZWT3Ftbk9xT0pDa2FrSVg3UnIrOFlrSm1qaDAyS1JJdEoxZDYzTDFaV3dKUWFPRlN1RXBjOEhQVHhISGpqVHpEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY1NDc2NTExNTo2OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRTENMbHEyVExobXRrL2txT21wUzI1TER4a21nckh3d1pPU2NHdGhJam90In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI0MzExMDM4fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Stark👾⚡",
    NUMERO_OWNER : process.env.OWNER_NUM || "237654765115",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Ultron👾',
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
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
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
