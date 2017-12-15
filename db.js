import { SQLite } from 'expo';

//simply open and export database from anime.db file
export const DB = SQLite.openDatabase('anime.db');

