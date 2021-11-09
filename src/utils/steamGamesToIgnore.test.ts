import { game } from "../types/game";
import { testGame } from '../../test_utils/testData';
import { steamGamesToIgnore } from "./steamGamesToIgnore";

describe('steamGamesToIgnore', () => {
    it('skips games owned on steam', () => {
        const games: game[] = [{ ...testGame, title: 'Steam Game', releaseKeys: ['steam_123'], releases: ['steam_123'] }];

        const gamesToIgnore = steamGamesToIgnore(games);

        expect(gamesToIgnore.length).toBe(0);
    })
})