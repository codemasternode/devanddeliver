import "dotenv/config";

export default {
    app: {
        env: process.env.NODE_ENV || 'development'
    },
    node: {
        PORT: process.env.NODE_PORT || "3000",
        genSalt: Number(process.env.GEN_SALT)
    },
    mongo: {
        db: process.env.MONGO_DB,
        port: process.env.MONGO_PORT
    }
}