import { SqlJs } from "sql.js/module";
import initSqlJs from "sql.js";

export const runSql = (db: SqlJs.Database, sql: string) => {
  let statement = db.prepare(sql);
  statement.step();
  statement.free();
}

const createLibraryReleases = (db: SqlJs.Database) => {
  let createTable = `
      -- Script Date: 2021-03-07 22:25  - ErikEJ.SqlCeScripting version 3.5.2.86
      CREATE TABLE [LibraryReleases] (
        [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
      , [userId] int64 NOT NULL
      , [releaseKey] text NOT NULL
      );
      CREATE UNIQUE INDEX [LibraryReleases_sqlite_autoindex_LibraryReleases_1] ON [LibraryReleases] ([userId] ASC,[releaseKey] ASC);  
    `;
  runSql(db, createTable);
}

const createGamePieceTypes = (db: SqlJs.Database) => {
  let createTable = `
      -- Script Date: 2021-03-03 23:27  - ErikEJ.SqlCeScripting version 3.5.2.86
      CREATE TABLE [GamePieceTypes] (
        [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL
      , [type] text NOT NULL
      );
      CREATE UNIQUE INDEX [GamePieceTypes_sqlite_autoindex_GamePieceTypes_1] ON [GamePieceTypes] ([type] ASC);
    `;
  runSql(db, createTable);

  let addData = [`
      -- Script Date: 2021-03-04 17:46  - ErikEJ.SqlCeScripting version 3.5.2.86
      INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      1,'myRating');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      30,'allGameReleases');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      31,'dlcs');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      32,'media');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      33,'originalImages');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      34,'originalMeta');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      35,'originalTitle');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      36,'osCompatibility');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      72,'myAchievementsCount');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      101,'meta');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      102,'summary');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      103,'title');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      475,'changelog');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      476,'goodies');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      477,'isPreorder');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      478,'productLinks');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      8631,'friendsOwning');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      8632,'myFriendsActivity');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      14676,'originalSortingTitle');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      14687,'sortingTitle');
      `, `INSERT INTO [GamePieceTypes] ([id],[type]) VALUES (
      22367,'parent');
    `];
  addData.forEach(x => runSql(db, x));
}

const createGamePieces = (db: SqlJs.Database) => {
  let createTable = `
      -- Script Date: 2021-03-03 23:24  - ErikEJ.SqlCeScripting version 3.5.2.86
      CREATE TABLE [GamePieces] (
        [releaseKey] text NOT NULL
      , [gamePieceTypeId] bigint NOT NULL
      , [userId] int64 NULL
      , [value] text NOT NULL
      );
      CREATE UNIQUE INDEX [GamePieces_sqlite_autoindex_GamePieces_1] ON [GamePieces] ([releaseKey] ASC,[gamePieceTypeId] ASC,[userId] ASC);
    `;
  runSql(db, createTable);
}

const createGameTimes = (db: SqlJs.Database) => {
  let createTable = `
      -- Script Date: 2021-03-03 23:25  - ErikEJ.SqlCeScripting version 3.5.2.86
      CREATE TABLE [GameTimes] (
        [userId] int64 NOT NULL
      , [releaseKey] text NOT NULL
      , [minutesInGame] bigint NOT NULL
      );
      CREATE UNIQUE INDEX [GameTimes_sqlite_autoindex_GameTimes_1] ON [GameTimes] ([userId] ASC,[releaseKey] ASC);
    `;
  runSql(db, createTable);
}

const createReleaseProperties = (db: SqlJs.Database) => {
  let createTable = `
      -- Script Date: 2021-03-03 23:26  - ErikEJ.SqlCeScripting version 3.5.2.86
      CREATE TABLE [ReleaseProperties] (
        [releaseKey] text NOT NULL
      , [isDlc] bigint DEFAULT (NULL) NULL
      , [isVisibleInLibrary] bigint DEFAULT (NULL) NULL
      , [gameId] text DEFAULT (NULL) NULL
      );
      CREATE UNIQUE INDEX [ReleaseProperties_sqlite_autoindex_ReleaseProperties_1] ON [ReleaseProperties] ([releaseKey] ASC);
    `;
  runSql(db, createTable);
}

const createTestDb = async () => {
  const SQL = await initSqlJs({
    locateFile: (path, prefix) => {
      // A bit hacky, but for now the only way I made it work for cypress
      // Probably would be better to do it with webpack
      if (path.endsWith("sql-wasm.wasm")) return 'http://localhost:3000/GOG-Galaxy-Suggester/static/js/sql-wasm.wasm';
      return prefix + path;
    }
  });
  let db = new SQL.Database();

  createLibraryReleases(db);
  createGamePieceTypes(db);
  createGamePieces(db);
  createGameTimes(db);
  createReleaseProperties(db);
  return db;
}

export default createTestDb;