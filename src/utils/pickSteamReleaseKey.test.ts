import { pickSteamReleaseKey } from "./pickSteamReleaseKey";

describe('pickSteamReleaseKey', () => {
    it('should return first steam key from the list', () => {
        const releases = ['gog_123', 'steam_456', 'test_xyz', 'steam_000'];

        const releaseKey = pickSteamReleaseKey(releases);

        expect(releaseKey).toBe('steam_456');
    })
})