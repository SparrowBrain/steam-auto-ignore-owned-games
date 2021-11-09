import { game } from "../types/game";
import { gameToIgnore } from "../types/gameToIgnore";
import { pickSteamReleaseKey } from "./pickSteamReleaseKey";
import { steamUrlFromReleaseKey } from "./steamUrlFromReleaseKey";

export const steamGamesToIgnore = (games: game[]): gameToIgnore[] => {
    const gamesToIgnore: gameToIgnore[] = games
        .filter(game => onlyGamesNotOwnedOnSteam(game))
        .filter(game => onlyGamesWithSteamReleases(game))
        .map(game => ({ title: game.title, steamUrl: formSteamUrl(game) }));
    return gamesToIgnore;
}

const onlyGamesNotOwnedOnSteam = (game: game) => {
    return !game.ownedReleases.some(release => release.startsWith('steam_'));
}

const onlyGamesWithSteamReleases = (game: game) => {
    return game.allReleases.some(release => release.startsWith('steam_'));
}

const formSteamUrl = (game: game) => {
    const releaseKey = pickSteamReleaseKey(game.allReleases);
    if (releaseKey === undefined) throw new Error("Trying to create steam url for an item without steam release");
    return steamUrlFromReleaseKey(releaseKey);
}