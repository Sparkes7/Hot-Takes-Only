import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;

//setting up the pool
export const db = new pg.Pool({
    connectionString: dbConnectionString,
});
