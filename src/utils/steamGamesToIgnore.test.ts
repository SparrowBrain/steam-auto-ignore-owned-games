import { game } from "../types/game";
import { testGame } from '../../test_utils/testData';
import { steamGamesToIgnore } from "./steamGamesToIgnore";

describe('steamGamesToIgnore', () => {
    it('skips games owned on steam', () => {
        const games: game[] = [{ ...testGame, title: 'Steam Game', ownedReleases: ['steam_123'], allReleases: ['steam_123'] }];

        const gamesToIgnore = steamGamesToIgnore(games);

        expect(gamesToIgnore.length).toBe(0);
    })

    it('skips games that do not have steam releases', () => {
        const games: game[] = [{ ...testGame, title: 'GOG Game', ownedReleases: ['gog_123'], allReleases: ['gog_123'] }];

        const gamesToIgnore = steamGamesToIgnore(games);

        expect(gamesToIgnore.length).toBe(0);
    })

    it('sets correct title', () => {
        const games: game[] = [{ ...testGame, title: 'Super Game', ownedReleases: ['gog_123'], allReleases: ['gog_123', 'steam_456'] }];

        const gamesToIgnore = steamGamesToIgnore(games);

        expect(gamesToIgnore.length).toBe(1);
        expect(gamesToIgnore[0].title).toBe('Super Game');
    })

    it('sets correct steam url', () => {
        const games: game[] = [{ ...testGame, title: 'Super Game', ownedReleases: ['gog_123'], allReleases: ['gog_123', 'steam_456'] }];

        const gamesToIgnore = steamGamesToIgnore(games);

        expect(gamesToIgnore.length).toBe(1);
        expect(gamesToIgnore[0].steamUrl).toBe('https://store.steampowered.com/app/456/');
    })
})