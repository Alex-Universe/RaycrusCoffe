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
    process.env.URL_DB = '//mongodb+srv://admin:4ujTPCQsxB5pV9y4@cluster0.lhkhu.mongodb.net/test?authSource=admin&replicaSet=atlas-lm72hr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'
}