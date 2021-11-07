import { SqlValue } from 'sql.js';
import { game } from '../types/game';

const columnIndexFromName = (columns: string[], name: string) => {
    return columns.indexOf(name) as number;
};

const parseGamePiece = (valueType: SqlValue[], columnIndex: number) => {
    let gamePieceJson = valueType[columnIndex];
    if (typeof gamePieceJson !== "string") {
        throw new Error('unexpected type');
    }

    return JSON.parse(gamePieceJson);
};

const dbRowToGame = (row: SqlValue[], columns: string[]) => {
    let releaseKeys = (row[columnIndexFromName(columns, 'releaseKeys')] as string)
        .split(',');

    let metadata = parseGamePiece(row, columnIndexFromName(columns, 'metadata'));
    let gameMinutes = row[columnIndexFromName(columns, 'gameMinutes')] as number;
    let images = parseGamePiece(row, columnIndexFromName(columns, 'images'));

    let game: game = {
        title: parseGamePiece(row, columnIndexFromName(columns, 'title')).title,
        summary: parseGamePiece(row, columnIndexFromName(columns, 'summary')).summary
            .split('\r\n').join('\\n')
            .split('\n').join('\\n'),
        releaseKeys: releaseKeys,
        criticsScore: metadata.criticsScore,
        developers: metadata.developers,
        publishers: metadata.publishers,
        genres: metadata.genres,
        themes: metadata.themes,
        releaseDate: metadata.releaseDate ? new Date(metadata.releaseDate * 1000) : null,
        gameMinutes: gameMinutes,
        backgroundImage: images.background,
        squareIcon: images.squareIcon,
        verticalCover: images.verticalCover,
        releases: parseGamePiece(row, columnIndexFromName(columns, 'releases')).releases
    }

    return game;
};

export default dbRowToGame;
