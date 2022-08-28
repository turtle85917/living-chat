import { open } from "sqlite";
import sqlite3 from "sqlite3";

/**
 * Database connect.
 */
export default async () => await open({
  filename: `${process.cwd()}/public/data.db`,
  driver: sqlite3.Database
});