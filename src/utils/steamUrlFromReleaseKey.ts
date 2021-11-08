const STEAM_RELEASE_KEY_PREFIX = 'steam_';

export const steamUrlFromReleaseKey = (releaseKey: string) => {
    if (releaseKey.startsWith(STEAM_RELEASE_KEY_PREFIX)) {
        const steamId = releaseKey.substring(STEAM_RELEASE_KEY_PREFIX.length);
        return `https://store.steampowered.com/app/${steamId}/`;
    }

    throw new Error('Cannot get Steam url from non-Steam release key.')
}