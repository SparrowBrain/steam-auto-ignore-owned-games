export const createGameData = ({
    id = 1,
    releaseKey = 'test_1',
    title,
    summary = "This is the game summary.",
    gameMinutes = 60,
    criticsScore = 50,
    releaseDate = new Date('2010-01-01'),
    genres = ["Indie", "Sport", "Racing"],
    themes = ["Action", "Science fiction"],
    developers = ["Game Company"],
    publishers = ["Leeches"]
}: fakeGameData) => {
    return [`
    INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    ${id},123123123,'${releaseKey}');
    
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',30,NULL,'{"releases":["${releaseKey}"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',33,123123123,'{"background":null,"squareIcon":null,"verticalCover":null}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',34,123123123,'{"criticsScore":${criticsScore},"developers":[${getCommaSeparatedStrings(developers)}],"genres":[${getCommaSeparatedStrings(genres)}],"publishers":[${getCommaSeparatedStrings(publishers)}],"releaseDate":${releaseDate === null ? 'null' : Date.parse(releaseDate?.toDateString()) / 1000},"themes":[${getCommaSeparatedStrings(themes)}]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',35,123123123,'{"title":"${title}"}'); 
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',101,123123123,'{"criticsScore":${criticsScore},"developers":[${getCommaSeparatedStrings(developers)}],"genres":[${getCommaSeparatedStrings(genres)}],"publishers":[${getCommaSeparatedStrings(publishers)}],"releaseDate":${releaseDate === null ? 'null' : Date.parse(releaseDate?.toDateString()) / 1000},"themes":[${getCommaSeparatedStrings(themes)}]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',102,123123123,'{"summary":"${summary}"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    '${releaseKey}',103,123123123,'{"title":"${title}"}');

    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'${releaseKey}',${gameMinutes});

    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    '${releaseKey}',0,1,'${id}');
`];
};

export const createMultipleGameData = (data: fakeGameData[]) => {
    let sqlStatements: string[] = [];
    for (let i = 0; i < data.length; i++) {
        sqlStatements = sqlStatements.concat(createGameData({ ...data[i], id: i + 1, releaseKey: `test_${i + 1}` }));
    }
    return sqlStatements;
}

export interface fakeGameData {
    id?: number;
    releaseKey?: string;
    title: string;
    summary?: string;
    gameMinutes?: number;
    criticsScore?: number | null;
    releaseDate?: Date | null;
    genres?: string[] | null;
    themes?: string[] | null;
    developers?: string[] | null;
    publishers?: string[] | null;
}

export const prisonArchitect = [`
    INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    14,123123123,'gog_1441974651');
    `, `INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    4424346,123123123,'steam_233450');

    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',30,NULL,'{"releases":["steam_233450","gog_1441974651","origin_Origin.OFR.50.0002578","humble_prisonarchitect","humble_prisonarchitect_bundle_steam","humble_storefront_prisonarchitect_steam","humble_introversion_weekly_prisonarchitect","humble_storefront_prisonarchitect","humble_prisonarchitect_bundle_row_steam","humble_prisonarchitect_bundle_rucis_latam_cn_kr_steam","nswitch_010029200AB1C000","totalwar_storefront_prisonarchitect_steam","d2d_storefront_prisonarchitect_steam","humble_introversion_weekly_prisonarchitect_steam","humble_prisonarchitect_paradox_row_steam","itch_cf871ec6c3bfd6180386393a3c5f5e17bba57cd1bb18c567ddf2a7c6","itch_XFxSYWlkc2VydmVyXGdcTXkgRHJpdmVcRml0R2lybCBHYW1lc1xQcmlzb24gQXJjaGl0ZWN0IFtGaXRHaXJsIFJlcGFja10=","origin_08e8230c4cf2cd0751707eac3ae0e3b8946940da","origin_8e6e2338d4e524a6bd00f10e9e83d5b13fc9a1e4c3ab3f4469bc01754488930f","paradox_prison_architect_standard","test_233450","test_\/prison-architect-free-download\/","test_prison-architect","xboxone_2102601227","generic_51153517180596753"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',33,123123123,'{"background":"https:\/\/images.gog.com\/ab679758906a2b48a4e3cfda684cf78288aef89a4fbc39331a6e6d89787eb7e9_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',34,123123123,'{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',35,123123123,'{"title":"Prison Architect"}'); 
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',101,123123123,'{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',102,123123123,'{"summary":"The game is a top-down 2D construction and management simulation where the player takes control of building and running a prison. The player is responsible for managing various aspects of their prison including building cells and facilities, planning and connecting utilities, hiring and assigning staff, including a warden, guards, workers, and more. The player needs to recruit staff to unlock more aspects of the game. The player is also responsible for the finance, and keeping their inmates content."}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1441974651',103,123123123,'{"title":"Prison Architect"}');

    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',30,NULL,'{"releases":["steam_233450","gog_1441974651","origin_Origin.OFR.50.0002578","humble_prisonarchitect","humble_prisonarchitect_bundle_steam","humble_storefront_prisonarchitect_steam","humble_introversion_weekly_prisonarchitect","humble_storefront_prisonarchitect","humble_prisonarchitect_bundle_row_steam","humble_prisonarchitect_bundle_rucis_latam_cn_kr_steam","nswitch_010029200AB1C000","totalwar_storefront_prisonarchitect_steam","d2d_storefront_prisonarchitect_steam","humble_introversion_weekly_prisonarchitect_steam","humble_prisonarchitect_paradox_row_steam","itch_cf871ec6c3bfd6180386393a3c5f5e17bba57cd1bb18c567ddf2a7c6","itch_XFxSYWlkc2VydmVyXGdcTXkgRHJpdmVcRml0R2lybCBHYW1lc1xQcmlzb24gQXJjaGl0ZWN0IFtGaXRHaXJsIFJlcGFja10=","origin_08e8230c4cf2cd0751707eac3ae0e3b8946940da","origin_8e6e2338d4e524a6bd00f10e9e83d5b13fc9a1e4c3ab3f4469bc01754488930f","paradox_prison_architect_standard","test_233450","test_\/prison-architect-free-download\/","test_prison-architect","xboxone_2102601227","generic_51153517180596753"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',33,123123123,'{"background":"https:\/\/images.gog.com\/ab679758906a2b48a4e3cfda684cf78288aef89a4fbc39331a6e6d89787eb7e9_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/824738dd3534fba4838d9d4920cc0a780c9dea998a5d45f28a93fbb3bacdcaff_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',34,123123123,'{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',35,123123123,'{"title":"Prison Architect"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',101,123123123,'{"criticsScore":81.0769,"developers":["Introversion Software","Double Eleven"],"genres":["Strategy","Indie","Simulator"],"publishers":["Introversion Software"],"releaseDate":1444089600,"themes":["Non-fiction","Sandbox","Business"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',102,123123123,'{"summary":"The game is a top-down 2D construction and management simulation where the player takes control of building and running a prison. The player is responsible for managing various aspects of their prison including building cells and facilities, planning and connecting utilities, hiring and assigning staff, including a warden, guards, workers, and more. The player needs to recruit staff to unlock more aspects of the game. The player is also responsible for the finance, and keeping their inmates content."}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_233450',103,123123123,'{"title":"Prison Architect"}');
    `, `
    INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'gog_1441974651',417);
    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'steam_233450',699);
    `, `
    INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'gog_1441974651',0,1,'51153517180596753');
    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'steam_233450',0,1,'51153517180596753');
    `
];

export const rocketLeague = [`
    INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    4425575,123123123,'steam_252950');
    
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',30,NULL,'{"releases":["steam_252950","xboxone_558797228","psn_CUSA01433_00","psn_CUSA01163_00","psn_CUSA01759_00","humble_rocketleague_steam","humble_rocketleague_bundle_steam","psvita_CUSA01163_00","test_CUSA01163_00","nswitch_01005EE0036EC000","itch_901b40fc25ce85c4723173eacf2403637f0225217f6fc8eee3bda670","itch_XFxSYWlkc2VydmVyXGdcTXkgRHJpdmVcRml0R2lybCBHYW1lc1xSb2NrZXQgTGVhZ3VlIFtGaXRHaXJsIFJlcGFja10=","origin_d6b1e23c1d37a714ac7d56a9d5ea27412793f6fa","origin_39fbad2f531cfa1c5bd23760a4a26d590ce0eb74c30d25af8564584430163608","psx_Rocket League","psn_CUSA01653_00","psx_CUSA01433_00","epic_Sugar","nswitch_c313e82ce64e18054a1e3800df42af79bc9b89e8","test_CUSA01433_00","humble_rocketleague_us_switch","test_252950","nswitch_2fe8a2314ebde5c98bbd6ef630e71ddf030f0c30","test_\/rocket-league-free-download\/","test_rocket-league","generic_51154132383216479"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',33,123123123,'{"background":"https:\/\/images.gog.com\/ca8df85fb30e736ecb20f757e33255f6b5eaae65fa1fbf24237e6297decf2c97_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/6c3492f74e8098466f1fcf23365c50dc40262b2cfc7ebb4e8e22e11c031963af_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/7ad1cb3af7570eed2418ad80276a1b3294f18c6837f657accb2bdf3683e52bbd_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',34,123123123,'{"criticsScore":88.7059,"developers":["Psyonix"],"genres":["Indie","Sport","Racing"],"publishers":["Psyonix"],"releaseDate":1436227200,"themes":["Action","Science fiction"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',35,123123123,'{"title":"Rocket League"}'); 
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',101,123123123,'{"criticsScore":88.7059,"developers":["Psyonix"],"genres":["Indie","Sport","Racing"],"publishers":["Psyonix"],"releaseDate":1436227200,"themes":["Action","Science fiction"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',102,123123123,'{"summary":"Soccer meets racing once again in our long-awaited, MP-focused sequel to Supersonic Acrobatic Rocket-Powered Battle-Cars! \\r\\n \\r\\nA futuristic Sports-Action game, Rocket League, equips players with booster-rigged vehicles that can be crashed into balls for incredible goals or epic saves across multiple, highly-detailed arenas. Using an advanced physics system to simulate realistic interactions, Rocket League relies on mass and momentum to give players a complete sense of intuitive control in this unbelievable, high-octane re-imagining of association football."}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'steam_252950',103,123123123,'{"title":"Rocket League"}');

    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'steam_252950',71527);

    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'steam_252950',0,1,'51154132383216479');
`];

export const galaxyBeta_notVisibleInLibrary = [`
    INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',30,NULL,'{"releases":["gog_1207667173","generic_51724209887568068"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',101,123123123,'{"criticsScore":null,"developers":[],"genres":[],"publishers":[],"releaseDate":null,"themes":[]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',33,123123123,'{"background":null,"squareIcon":"https:\/\/images.gog.com\/648b6038a468885166d889f64fec397a57ce5f490234d600e73097bb85192e30_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/648b6038a468885166d889f64fec397a57ce5f490234d600e73097bb85192e30_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',34,123123123,'{"criticsScore":null,"developers":[],"genres":[],"publishers":[],"releaseDate":null,"themes":[]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',35,123123123,'{"title":"Galaxy Beta"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',102,123123123,'{"summary":""}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1207667173',103,123123123,'{"title":"Galaxy Beta"}');

    `, `INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    41,123123123,'gog_1207667173');

    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'gog_1207667173',0);

    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'gog_1207667173',0,0,'51724209887568068');
`];

export const cyberpunkGoodies_dlc = [`
    INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',30,NULL,'{"releases":["generic_53448971734326669"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',101,123123123,'{"criticsScore":null,"developers":[],"genres":["Role-playing (RPG)"],"publishers":[],"releaseDate":1607558400,"themes":["Open world","Science fiction","Sandbox"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',33,123123123,'{"background":"https:\/\/images.gog.com\/066b628ee36ee7fb7968e3ddfae45b05d8d366b3c1b4dde1ce12f6b9762bbf62_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/cf7b600ce3c03b17a20dd4b4eebc60bcf14eff154a7cad590d39f7493453ac06_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/cf7b600ce3c03b17a20dd4b4eebc60bcf14eff154a7cad590d39f7493453ac06_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',34,123123123,'{"criticsScore":null,"developers":[],"genres":["Role-playing (RPG)"],"publishers":[],"releaseDate":1607558400,"themes":["Open world","Science fiction","Sandbox"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',35,123123123,'{"title":"Cyberpunk 2077 Goodies Collection"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',102,123123123,'{"summary":"The upcoming RPG from CD Projekt RED based on the Cyberpunk 2020 tabletop RPG created by Mike Pondsmith. \\r\\n \\r\\nIn Cyberpunk 2077 you play as V — a hired gun on the rise — and you just got your first serious contract. In a world of cyberenhanced street warriors, tech-savvy netrunners and corporate lifehackers, today you take your first step towards becoming an urban legend."}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'gog_1486144755',103,123123123,'{"title":"Cyberpunk 2077 Goodies Collection"}');

    `, `INSERT INTO [LibraryReleases] ([id],[userId],[releaseKey]) VALUES (
    2594773,123123123,'gog_1486144755');

    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'gog_1486144755',0);

    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'gog_1486144755',1,1,'53448971734326669');
`];

export const greyGooDefinitiveEdition_notInLibraryReleases = [`
    INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',30,NULL,'{"releases":["humble_greygoo_definitiveedition_steam","humble_greygoo_definitiveedition_bundle_steam","itch_80881419deb2d55b07a79036b82e6e1dec46374ef8172bbe3ab194cd","origin_7c691847e2f37603da5f7544c82f5cb0c2d907ef","origin_83cc891838de7c49854cf743b5c441b39f695c1a764e099a4bf9dcd719a9caf6","generic_51152934844753453"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',31,NULL,'{"dlcs":[]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',32,123123123,'{"artworks":[],"screenshots":[],"videos":[]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',33,123123123,'{"background":null,"squareIcon":"https:\/\/images.gog.com\/056b06122157930f5a16f5be2946a9a8823802b6f7ee2555a8575bfcbbfa86e3_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/056b06122157930f5a16f5be2946a9a8823802b6f7ee2555a8575bfcbbfa86e3_glx_vertical_cover.webp?namespace=gamesdb"}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',34,123123123,'{"criticsScore":null,"developers":["Petroglyph Games"],"genres":["Strategy","Real Time Strategy (RTS)"],"publishers":[],"releaseDate":1421971200,"themes":["Warfare","Science fiction"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',35,123123123,'{"title":"Grey Goo Definitive Edition"}');

    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',101,123123123,'{"criticsScore":null,"developers":["Petroglyph Games"],"genres":["Strategy","Real Time Strategy (RTS)"],"publishers":[],"releaseDate":1421971200,"themes":["Warfare","Science fiction"]}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',102,123123123,'{"summary":""}');
    `, `INSERT INTO [GamePieces] ([releaseKey],[gamePieceTypeId],[userId],[value]) VALUES (
    'humble_greygoo_definitiveedition_steam',103,123123123,'{"title":"Grey Goo Definitive Edition"}');

    `, `INSERT INTO [GameTimes] ([userId],[releaseKey],[minutesInGame]) VALUES (
    123123123,'humble_greygoo_definitiveedition_steam',0);

    `, `INSERT INTO [ReleaseProperties] ([releaseKey],[isDlc],[isVisibleInLibrary],[gameId]) VALUES (
    'humble_greygoo_definitiveedition_steam',0,1,'51152934844753453');
`];

const getCommaSeparatedStrings = (items: string[] | null): string | undefined => {
    return items?.map(x => '"' + x + '"').join(",");
}