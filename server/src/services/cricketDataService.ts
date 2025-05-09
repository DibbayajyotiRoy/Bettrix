// Description: This file contains the logic to fetch and save cricket match data.
import axios from 'axios';
import { sql } from '../config/database';

// Explicitly export the interface
export interface CricketMatch {
  id: string;
  teams: [string, string];
  scorecard: {
    batsmen: Array<{
      name: string;
      runs: number;
      balls: number;
      isOut: boolean;
    }>;
    bowlers: Array<{
      name: string;
      wickets: number;
      economy: number;
    }>;
  };
}

export async function fetchMatchData(matchId: string): Promise<CricketMatch> {
  const { data } = await axios.get(`https://api.cricket.com/matches/${matchId}`);
  return data;
}

export async function saveMatchData(match: CricketMatch) {
  await sql`
    INSERT INTO trading.matches (id, team1, team2, data)
    VALUES (${match.id}, ${match.teams[0]}, ${match.teams[1]}, ${match.scorecard})
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data
  `;
}