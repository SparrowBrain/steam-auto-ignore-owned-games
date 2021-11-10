import { useState } from "react";
import { QueryExecResult } from "sql.js";
import { FileUpload } from "./components/FileUpload"
import { game } from "./types/game";
import dbRowToGame from "./utils/dbRowToGame";
import { readGogGames } from "./utils/gogDb";

import wasm from 'sql.js/dist/sql-wasm'

const App = () => {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [allGames, setAllGames] = useState<game[]>([]);

  const handleGogRead = (queryResults: QueryExecResult) => {
    let rows = queryResults.values;

    let games = rows.map(x => dbRowToGame(x, queryResults.columns));
    setAllGames(games);

    setIsLoaded(true);
  };

  const handleGogReadError = (error: any) => {
    console.error(error);
    setError(error);
    setIsLoaded(true);
  };

  const handleFileChanged = async (blob: Blob) => {
    setIsLoaded(false);
    try {
      let results = await readGogGames(blob);
      handleGogRead(results);
    }
    catch (error) {
      handleGogReadError(error);
    }
  };

  return (
    <>
      <FileUpload onFileChanged={handleFileChanged}></FileUpload>
      {allGames.forEach(game => {
        <div>{game.title}</div>
      })}
    </>
  )
}

export default App