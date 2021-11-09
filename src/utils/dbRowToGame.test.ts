import { SqlJs } from 'sql.js/module';
import dbRowToGame from './dbRowToGame';

const columns: string[] = [
  "releaseKeys",
  "title",
  "summary",
  "metadata",
  "gameMinutes",
  "images",
  "releases",
];

const valueTypes: SqlJs.ValueType[] = [
  'steam_435790,supertest_123',
  '{"title":"10 Second Ninja X"}',
  '{"summary":"10 SECOND NINJA X is a blisteringly fast, satisfyingly difficult and surprisingly methodical sidescroller which tasks you with completing each level in ten seconds or less. No lengthy checkpoint gaps. No cluttered control scheme. No hand holding. Get that three star rating, yo! You got this. \\n\\n1 star. Again. 1 star. Again. 2 stars! Again. Back to 1 star. DAMN IT. Again... \\n\\n100 levels including all 40 original 10 Second Ninja levels remastered in HD. Individual leaderboards for each level. Unlockables and collectibles."}',
  '{"criticsScore":77.3333,"developers":["Four Circle Interactive"],"genres":["Indie","Platform","Puzzle","Arcade"],"publishers":["Curve Digital"],"releaseDate":1468886400,"themes":["Action"]}',
  44,
  '{"background":"https:\/\/images.gog.com\/640c97dd51fbb5eb6240d0d7e2765e223d46e1b9f92ce4d9f5db7992f4ced293_glx_bg_top_padding_7.webp?namespace=gamesdb","squareIcon":"https:\/\/images.gog.com\/e1d3f3b75a1cf921a1493294840c1e821e5002e55943f987039f6a76cc2bd90c_glx_square_icon_v2.webp?namespace=gamesdb","verticalCover":"https:\/\/images.gog.com\/4df641c4cada7d9a9d3e76ac76581e4733d84d0a7030fd9de9322c9bf8b423d3_glx_vertical_cover.webp?namespace=gamesdb"}',
  '{"releases":["steam_233450","gog_1441974651","generic_51153517180596753"]}',
];

describe('dbRowToGame', () => {
  it('should set title', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.title).toBe('10 Second Ninja X');
  });

  it('should set summary', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.summary).toBe("10 SECOND NINJA X is a blisteringly fast, satisfyingly difficult and surprisingly methodical sidescroller which tasks you with completing each level in ten seconds or less. No lengthy checkpoint gaps. No cluttered control scheme. No hand holding. Get that three star rating, yo! You got this. \\n\\n1 star. Again. 1 star. Again. 2 stars! Again. Back to 1 star. DAMN IT. Again... \\n\\n100 levels including all 40 original 10 Second Ninja levels remastered in HD. Individual leaderboards for each level. Unlockables and collectibles.");
  });

  it('should set ownedReleases', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.ownedReleases).toEqual(['steam_435790', 'supertest_123'])
  });

  it('should set criticsScore', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.criticsScore).toBe(77.3333);
  });

  it('should set developers', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.developers).toStrictEqual(["Four Circle Interactive"]);
  });

  it('should set genres', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.genres).toStrictEqual(["Indie", "Platform", "Puzzle", "Arcade"]);
  });

  it('should set publishers', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.publishers).toStrictEqual(["Curve Digital"]);
  });

  it('should set releaseDate', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.releaseDate).toStrictEqual(new Date('2016-07-19'));
  });

  it('should set themes', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.themes).toStrictEqual(["Action"]);
  });

  it('should set gameMinutes', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.gameMinutes).toBe(44);
  });

  it('should set backgroundImage', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.backgroundImage).toBe('https://images.gog.com/640c97dd51fbb5eb6240d0d7e2765e223d46e1b9f92ce4d9f5db7992f4ced293_glx_bg_top_padding_7.webp?namespace=gamesdb');
  });

  it('should set squareIcon', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.squareIcon).toBe("https://images.gog.com/e1d3f3b75a1cf921a1493294840c1e821e5002e55943f987039f6a76cc2bd90c_glx_square_icon_v2.webp?namespace=gamesdb");
  });

  it('should set verticalCover', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.verticalCover).toBe('https://images.gog.com/4df641c4cada7d9a9d3e76ac76581e4733d84d0a7030fd9de9322c9bf8b423d3_glx_vertical_cover.webp?namespace=gamesdb');
  });

  it('should convert \\r\\n to \\n in summary', () => {
    const customSummary = valueTypes;
    customSummary[2] = '{"summary":"Soccer meets racing! \\r\\n \\r\\nA futuristic Sports-Action game, Rocket League, equips players."}';
    const game = dbRowToGame(valueTypes, columns);

    expect(game.summary).toBe("Soccer meets racing! \\n \\nA futuristic Sports-Action game, Rocket League, equips players.");
  });

  it('should set allReleases', () => {
    const game = dbRowToGame(valueTypes, columns);

    expect(game.allReleases).toEqual(["steam_233450", "gog_1441974651", "generic_51153517180596753"])
  });
});