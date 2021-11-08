import { steamUrlFromReleaseKey } from "./steamUrlFromReleaseKey";

describe('steamUrlFromReleaseKey', () => {
    it('returns steam store url from steam release key', () => {
        const url = steamUrlFromReleaseKey('steam_123123');

        expect(url).toBe('https://store.steampowered.com/app/123123/')
    })

    it('throws error for any non-Steam game', () => {
        expect(() => steamUrlFromReleaseKey('abc_123123')).toThrow();
    })
})