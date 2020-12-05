import "dotenv/config";

export default {
    app: {
        env: process.env.NODE_ENV || 'development'
    },
    node: {
        PORT: process.env.NODE_PORT || "3000",
        genSalt: Number(process.env.GEN_SALT),
        swapiApiURL: process.env.SWAPI_API_URL,
        privateJWTKey: process.env.PRIVATE_JWT_KEY || "",
        jwtAlgorithm: process.env.JWT_ALGORITHM || 'RS256',
        jwtExpire: Number(process.env.JWT_EXPIRE_MS)
    },
    mongo: {
        db: process.env.MONGO_DB,
        port: process.env.MONGO_PORT
    }
}