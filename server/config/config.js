// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Enviorment
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  DataBase
// ============================

if (process.env.NODE_ENV === 'dev') {
    process.env.URL_DB = 'mongodb://localhost:27017/RaycrusCoffeDB'
} else {
    process.env.URL_DB = process.env.MONGO_URI;
}

// ============================
//  Expiration Token
// ============================

process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  Seed
// ============================

process.env.SEED = process.env.SEED || 'seed';

// ============================
//  Google
// ============================

process.env.CLIENT_ID = process.env.CLIENT_ID || '218816469376-hqtv3ll2bmlnl8vd4pce0vbu6b9eakof.apps.googleusercontent.com';