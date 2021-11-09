
export const pickSteamReleaseKey = (releases: string[]) => {
    return releases.find(release => release.startsWith('steam_'))
}