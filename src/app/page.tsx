"use client";
import { useState } from "react";
import axios from "axios";

// Define the types for the schedule data
interface Match {
  id: string;
  location: string;
  players: string[];
  isIncomplete: boolean;
  availableDrivers: string[] | string;
}

interface PlayerMatchCount {
  name: string;
  matchesPlayed: number;
}

interface Schedule {
  matches: Match[];
  playerMatchCounts: PlayerMatchCount[];
}

export async function solveProblem(): Promise<Schedule> {
  console.log("posted");
  const { data } = await axios.post('/api/solve');
  console.log(data);
  return data.result as Schedule;
}

export default function Home() {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = async () => {
    setIsLoading(true);
    const result = await solveProblem();
    setSchedule(result);
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={handleSolve}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Solve Problem
      </button>
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {schedule && isLoading === false && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Match Schedule</h2>
          <table className="w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Match Location</th>
                <th className="border border-gray-300 p-2">Players</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Available Drivers / Car Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.matches.map((match) => (
                <tr key={match.id}>
                  <td className="border border-gray-300 p-2">{match.location}</td>
                  <td className="border border-gray-300 p-2">{match.players.join(', ')}</td>
                  <td className="border border-gray-300 p-2">
                    {match.isIncomplete ? 'Incomplete' : 'Complete'}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {Array.isArray(match.availableDrivers)
                      ? match.availableDrivers.join(', ')
                      : match.availableDrivers}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="text-2xl font-bold mb-4">Player Match Counts</h2>
          <ul className="grid grid-cols-2 gap-4">
            {schedule.playerMatchCounts.map((player) => (
              <li key={player.name} className="border border-gray-300 p-2 rounded">
                <span className="font-semibold">{player.name}:</span> {player.matchesPlayed} matches
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
