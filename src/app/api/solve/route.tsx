import { NextRequest, NextResponse } from 'next/server';

interface MatchSchedule {
  id: number;
  location: string;
  players: string[];
  isIncomplete: boolean;
  availableDrivers: string[] | 'No car available' | 'Home match';
}

interface PlayerMatchCount {
  name: string;
  matchesPlayed: number;
}

interface Schedule {
  matches: MatchSchedule[];
  playerMatchCounts: PlayerMatchCount[];
}

export async function POST(req: NextRequest) {
    const availability: { [key: string]: { [key: string]: number } } = {
        'Alice': {
          'Amsterdam - Home': 1, 'Den Haag - Away': 1, 'Groningen - Home': 1, 'Den Bosch - Away': 1,
          'Rotterdam - Home': 1, 'Utrecht - Away': 1, 'Eindhoven - Home': 1, 'Tilburg - Away': 0,
          'Almere - Home': 1, 'Breda - Away': 1, 'Den Haag - Home': 0, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 0, 'Groningen - Away': 1, 'Utrecht - Home': 1, 'Rotterdam - Away': 0,
          'Tilburg - Home': 1, 'Eindhoven - Away': 1
        },
        'Bob': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 1, 'Groningen - Home': 0, 'Den Bosch - Away': 0,
          'Rotterdam - Home': 1, 'Utrecht - Away': 1, 'Eindhoven - Home': 0, 'Tilburg - Away': 1,
          'Almere - Home': 1, 'Breda - Away': 0, 'Den Haag - Home': 1, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 0, 'Groningen - Away': 0, 'Utrecht - Home': 1, 'Rotterdam - Away': 1,
          'Tilburg - Home': 0, 'Eindhoven - Away': 1
        },
        'Charlie': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 1, 'Groningen - Home': 1, 'Den Bosch - Away': 0,
          'Rotterdam - Home': 1, 'Utrecht - Away': 0, 'Eindhoven - Home': 1, 'Tilburg - Away': 1,
          'Almere - Home': 0, 'Breda - Away': 1, 'Den Haag - Home': 1, 'Amsterdam - Away': 0,
          'Den Bosch - Home': 1, 'Groningen - Away': 1, 'Utrecht - Home': 0, 'Rotterdam - Away': 1,
          'Tilburg - Home': 1, 'Eindhoven - Away': 0
        },
        'David': {
          'Amsterdam - Home': 1, 'Den Haag - Away': 0, 'Groningen - Home': 1, 'Den Bosch - Away': 1,
          'Rotterdam - Home': 1, 'Utrecht - Away': 0, 'Eindhoven - Home': 1, 'Tilburg - Away': 1,
          'Almere - Home': 1, 'Breda - Away': 0, 'Den Haag - Home': 1, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 1, 'Groningen - Away': 0, 'Utrecht - Home': 1, 'Rotterdam - Away': 1,
          'Tilburg - Home': 1, 'Eindhoven - Away': 0
        },
        'Eve': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 1, 'Groningen - Home': 0, 'Den Bosch - Away': 1,
          'Rotterdam - Home': 1, 'Utrecht - Away': 1, 'Eindhoven - Home': 0, 'Tilburg - Away': 1,
          'Almere - Home': 0, 'Breda - Away': 1, 'Den Haag - Home': 1, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 0, 'Groningen - Away': 1, 'Utrecht - Home': 0, 'Rotterdam - Away': 1,
          'Tilburg - Home': 1, 'Eindhoven - Away': 1
        },
        'Frank': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 1, 'Groningen - Home': 1, 'Den Bosch - Away': 0,
          'Rotterdam - Home': 0, 'Utrecht - Away': 1, 'Eindhoven - Home': 1, 'Tilburg - Away': 1,
          'Almere - Home': 0, 'Breda - Away': 0, 'Den Haag - Home': 1, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 1, 'Groningen - Away': 0, 'Utrecht - Home': 0, 'Rotterdam - Away': 1,
          'Tilburg - Home': 1, 'Eindhoven - Away': 1
        },
        'Grace': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 1, 'Groningen - Home': 0, 'Den Bosch - Away': 1,
          'Rotterdam - Home': 1, 'Utrecht - Away': 0, 'Eindhoven - Home': 1, 'Tilburg - Away': 0,
          'Almere - Home': 1, 'Breda - Away': 1, 'Den Haag - Home': 0, 'Amsterdam - Away': 1,
          'Den Bosch - Home': 0, 'Groningen - Away': 1, 'Utrecht - Home': 1, 'Rotterdam - Away': 0,
          'Tilburg - Home': 1, 'Eindhoven - Away': 0
        },
        'Henry': {
          'Amsterdam - Home': 0, 'Den Haag - Away': 0, 'Groningen - Home': 1, 'Den Bosch - Away': 1,
          'Rotterdam - Home': 0, 'Utrecht - Away': 1, 'Eindhoven - Home': 0, 'Tilburg - Away': 1,
          'Almere - Home': 1, 'Breda - Away': 0, 'Den Haag - Home': 1, 'Amsterdam - Away': 0,
          'Den Bosch - Home': 1, 'Groningen - Away': 1, 'Utrecht - Home': 0, 'Rotterdam - Away': 1,
          'Tilburg - Home': 0, 'Eindhoven - Away': 1
        }
      };
    
      const carAvailability: { [key: string]: { [key: string]: number } } = {
        'Alice': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 0,
          'Utrecht - Away': 1,
          'Tilburg - Away': 0,
          'Breda - Away': 1,
          'Amsterdam - Away': 1,
          'Groningen - Away': 1,
          'Rotterdam - Away': 0,
          'Eindhoven - Away': 1
        },
        'Bob': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 0,
          'Utrecht - Away': 1,
          'Tilburg - Away': 1,
          'Breda - Away': 0,
          'Amsterdam - Away': 1,
          'Groningen - Away': 0,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 1
        },
        'Charlie': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 0,
          'Utrecht - Away': 0,
          'Tilburg - Away': 1,
          'Breda - Away': 1,
          'Amsterdam - Away': 0,
          'Groningen - Away': 1,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 0
        },
        'David': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 1,
          'Utrecht - Away': 0,
          'Tilburg - Away': 1,
          'Breda - Away': 0,
          'Amsterdam - Away': 1,
          'Groningen - Away': 0,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 0
        },
        'Eve': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 0,
          'Utrecht - Away': 1,
          'Tilburg - Away': 1,
          'Breda - Away': 1,
          'Amsterdam - Away': 1,
          'Groningen - Away': 1,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 1
        },
        'Frank': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 0,
          'Utrecht - Away': 1,
          'Tilburg - Away': 1,
          'Breda - Away': 0,
          'Amsterdam - Away': 1,
          'Groningen - Away': 0,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 1
        },
        'Grace': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 1,
          'Utrecht - Away': 0,
          'Tilburg - Away': 0,
          'Breda - Away': 1,
          'Amsterdam - Away': 1,
          'Groningen - Away': 1,
          'Rotterdam - Away': 0,
          'Eindhoven - Away': 0
        },
        'Henry': {
          'Den Haag - Away': 0,
          'Den Bosch - Away': 1,
          'Utrecht - Away': 1,
          'Tilburg - Away': 1,
          'Breda - Away': 0,
          'Amsterdam - Away': 0,
          'Groningen - Away': 1,
          'Rotterdam - Away': 1,
          'Eindhoven - Away': 1
        }
      };

      const playersPerMatch = 4;
      const players = Object.keys(availability);
  
      function weightedRandom(choices: { player: string; weight: number }[]): string {
          const totalWeight = choices.reduce((sum, { weight }) => sum + weight, 0);
          let random = Math.random() * totalWeight;
  
          for (let i = 0; i < choices.length; i++) {
              if (random < choices[i].weight) {
                  return choices[i].player;
              }
              random -= choices[i].weight;
          }
          return choices[choices.length - 1].player; // Fallback to the last player if something goes wrong
      }
  
      function createSchedule(): Schedule {
          const matches: MatchSchedule[] = [];
          const playerMatchCounts: { [key: string]: number } = Object.fromEntries(players.map(p => [p, 0]));
          const locations = Object.keys(availability[players[0]]);
  
          for (let matchId = 0; matchId < locations.length; matchId++) {
              const location = locations[matchId];
              const isAwayMatch = location.includes('Away');
  
              const availablePlayers = players.filter(p => availability[p][location] === 1);
  
              let weightedPlayers = availablePlayers.map(p => ({
                  player: p,
                  weight: 1 / (playerMatchCounts[p] + 1)
              }));
  
              let selectedPlayers: string[] = [];
              while (selectedPlayers.length < playersPerMatch && weightedPlayers.length > 0) {
                  const selectedPlayer = weightedRandom(weightedPlayers);
                  selectedPlayers.push(selectedPlayer);
                  weightedPlayers = weightedPlayers.filter(wp => wp.player !== selectedPlayer);
              }
  
              const isIncomplete = selectedPlayers.length < playersPerMatch;
  
              let availableDrivers: string[] | 'No car available' | 'Home match';
              if (isAwayMatch) {
                  const availableCars = selectedPlayers
                      .filter(player => carAvailability[player][location] === 1)
                      .map(player => player);
                  availableDrivers = availableCars.length > 0 ? availableCars : 'No car available';
              } else {
                  availableDrivers = 'Home match';
              }
  
              matches.push({ id: matchId + 1, location, players: selectedPlayers, isIncomplete, availableDrivers });
              selectedPlayers.forEach(p => playerMatchCounts[p]++);
          }
  
          return {
              matches,
              playerMatchCounts: Object.entries(playerMatchCounts).map(([name, matchesPlayed]) => ({ name, matchesPlayed }))
          };
      }
  
      // Try to create a schedule multiple times and choose the best one
      let bestSchedule: Schedule | null = null;
      let minMaxMatches = Infinity;
      let minIncompleteMatches = Infinity;
      let maxCarAvailableMatches = -Infinity;
  
      for (let i = 0; i < 100000; i++) {
          const schedule = createSchedule();
          const maxMatches = Math.max(...schedule.playerMatchCounts.map(p => p.matchesPlayed));
          const incompleteMatches = schedule.matches.filter(m => m.isIncomplete).length;
          const carAvailableMatches = schedule.matches.filter(m => m.location.includes('Away') && m.availableDrivers !== 'No car available').length;
  
          if (maxMatches < minMaxMatches ||
              (maxMatches === minMaxMatches && incompleteMatches < minIncompleteMatches) ||
              (maxMatches === minMaxMatches && incompleteMatches === minIncompleteMatches && carAvailableMatches > maxCarAvailableMatches)) {
              minMaxMatches = maxMatches;
              minIncompleteMatches = incompleteMatches;
              maxCarAvailableMatches = carAvailableMatches;
              bestSchedule = schedule;
          }
      }
  
      if (!bestSchedule) {
          return NextResponse.json({ error: "Failed to create a valid schedule" }, { status: 500 });
      }
  
      return NextResponse.json({ result: bestSchedule }, { status: 200 });
  }