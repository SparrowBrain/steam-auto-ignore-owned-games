export interface game {
    title: string;
    summary: string;
    ownedReleases: string[];
    criticsScore: number | null;
    developers: string[];
    publishers: string[];
    genres: string[];
    themes: string[];
    releaseDate: Date | null;
    gameMinutes: number;
    backgroundImage: string;
    squareIcon: string;
    verticalCover: string;
    allReleases: string[];
}