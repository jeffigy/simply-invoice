import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: Number(process.env.PG_PORT),
});

pool.connect((error, client, release) => {
  if (error) {
    console.log("error acquiring client", error.stack);
  } else {
    console.log("connected to db");
  }
  release();
});

export const query = async (text: string, params?: any[]) => {
  const result = await pool.query(text, params);
  return result.rows;
};
