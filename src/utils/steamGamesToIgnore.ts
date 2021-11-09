import { game } from "../types/game";
import { gameToIgnore } from "../types/gameToIgnore";

export const steamGamesToIgnore = (games: game[]): gameToIgnore[] => {
    return games.map(x => ({ ...x, steamLink: '' }));
}