import { Database } from "sql.js";
import initSqlJs from "sql.js";
import readFileAsync from "./readFileAsync";

let db: Database;
initSqlJs();

const id = (type: string) => {
    return db.exec(`SELECT id FROM GamePieceTypes WHERE type="${type}"`)[0].values[0][0];
}

export const readGogGames = async (file: Blob) => {

    let arrayBuffer = await readFileAsync(file);
    var Uints = new Uint8Array(arrayBuffer as ArrayBuffer);

    const SQL = await initSqlJs();
    db = new SQL.Database(Uints);

    let statement1 = db.prepare(`
        CREATE TEMP VIEW IF NOT EXISTS MasterList AS
        SELECT GamePieces.releaseKey, GamePieces.gamePieceTypeId, GamePieces.value FROM LibraryReleases
        JOIN GamePieces ON LibraryReleases.releaseKey = GamePieces.releaseKey;
    `);

    let statement2 = db.prepare(`
        CREATE TEMP VIEW MasterDB AS
        SELECT DISTINCT(MasterList.releaseKey) AS releaseKey
                , MasterList.value AS title
                , PLATFORMS.value AS platformList
                , SUMMARY.value AS summary
                , METADATA.value AS metadata
                , GAMETIMES.minutesInGame AS time
                , IMAGES.value AS images
        FROM MasterList
            , MasterList AS PLATFORMS
            , MasterList AS SUMMARY
            , MasterList AS METADATA
            , GAMETIMES
            , MasterList AS IMAGES
            , RELEASEPROPERTIES
        WHERE ((MasterList.gamePieceTypeId=${id('originalTitle')}) OR (MasterList.gamePieceTypeId=${id('title')})) 
                AND ((PLATFORMS.releaseKey=MasterList.releaseKey) AND (PLATFORMS.gamePieceTypeId=${id('allGameReleases')}))
                AND (SUMMARY.releaseKey=MasterList.releaseKey) AND (SUMMARY.gamePieceTypeId=${id('summary')})
                AND (METADATA.releaseKey=MasterList.releaseKey) AND ((METADATA.gamePieceTypeId=${id('originalMeta')}) OR (METADATA.gamePieceTypeId=${id('meta')}))
                AND GAMETIMES.releaseKey=MasterList.releaseKey
                AND (IMAGES.releaseKey=MasterList.releaseKey) AND (IMAGES.gamePieceTypeId=${id('originalImages')})
                AND (RELEASEPROPERTIES.releaseKey=MasterList.releaseKey AND RELEASEPROPERTIES.isDlc=0 AND RELEASEPROPERTIES.isVisibleInLibrary=1)
        ORDER BY title
        ;
    `);

    statement1.step();
    statement1.free();
    statement2.step();
    statement2.free();

    let results = db.exec(`
        SELECT GROUP_CONCAT(DISTINCT MasterDB.releaseKey) AS releaseKeys
                , MasterDB.title 
                , MasterDB.summary
                , MasterDB.metadata
                , sum(MasterDB.time) AS gameMinutes
                , MasterDB.images
                , MasterDB.platformList as releases
        FROM MasterDB
        GROUP BY MasterDB.platformList 
        ORDER BY MasterDB.title
        ;
    `);

    return results[0];
};