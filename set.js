const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5CZUZWMlNTNG01aHd4YXYrL0pON3BWWWg4ckgxeWFBZnRKcU0yWmtIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiczNKYVQ0NWoxTVQwai94RjdpVEYyL25ZNFFGcjkzd3o4c0tQaGN0SFpVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQnpnOFQ4VGdEcFBpamVYeFhwV2VRNENCeG9aWVRQL1plS0Z3OXJHMUhZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEWVdYdVJ1VlNYdnJKWmc0OTMwLzRCYjd3Q1VjWjhFdTd0dEQ2Nm1CWkdnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVLYWZsN1J4TXdRREx6UVlBNTR3bkNLVFZLSXphVFVWbGV3YWRxNGtzMGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Impmc24wdEtNQ3M1eXFTOUZrbjFtbmFENzloRG5UYWd5YzVHcVlRdFgvMDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkoveGt3alh5UUNlSUU2REczaWQ4dTRQU0M3VjRYeWhVZnRSc2g0WnNIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTFPT3BtQjlDZlFJWnpTb05UTHE1MG0vTjZiSFh0RW1NbERQREhrU3d4Yz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRoRDFHbkpCR0tlTDFZNG14Nms1cllFcnAvem03aVJBQ0NhMXl0QUszRzQ4VzlVMGZNT1dCbnpVODRZeWY0VG9HSEViMEFEU2IySncydVczekVuNWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODYsImFkdlNlY3JldEtleSI6InR4NWU5T2FpSVMxOVFra2xNczJEZFdjZFFwaTNFWDBRVXY1OGE4Q1ZFNTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkFaM1k3QjZ5U3B5N1pRZzVsTmxaWnciLCJwaG9uZUlkIjoiZWE1OTM2ZDktMDc4Zi00YWYxLWFjMzAtYmM0ZTNkNWIxMzA3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik44OVE4OUx4NEUrbEdlNG9Jb25scFhiWWczaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIV28yWTFXcnZCNWZoVVZJa3M3amFkUjdnK3c9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRk5LRjE4UlYiLCJtZSI6eyJpZCI6IjIzNzY1NDc2NTExNTo2OUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3paMU9rR0VOM3NzYlFHR0JRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTVlGTGY4dzJudEk2UEVuZkRsSHJOZ253aWFGK09CSHI3SCt5YkRzM3BGaz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidUFOM1FpYWRGdy94eUQvVjVQWlVuZHpnT3BkQzduS2p4S3BwdHlxMFBuMzg0VkxWWkZvbUIyMEhVK0hxdGtIcHRPZ3JXRENmWVJreExEWFB6RlVVQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6IkNnc0VxWWlwTGFncFAwUW5qTlZZOG1ZMkNlVjdIOFhxZjhaSjFPMkNaU0dveE1mM2NiTWg2azFEazJJVTZqUGpYZDREb1dNSWRxWC9RVUJLS0JUVWpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjU0NzY1MTE1OjY5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRHQlMzL01OcDdTT2p4SjN3NVI2ellKOEltaGZqZ1I2K3gvc213N042UloifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjA0ODEzODl9',
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
