// This file is responsible for generating questions for the cricket trading market.
import type { fetchMatchData, CricketMatch } from '../../../services/cricketDataService';

type MarketQuestion = {
  text: string;
  type: 'batsman' | 'bowler' | 'match';
  odds: number;
};

export function generateCricketQuestions(match: CricketMatch): MarketQuestion[] {
  const questions: MarketQuestion[] = [];

  // Batsman questions
  match.scorecard.batsmen.forEach(player => {
    if (!player.isOut) {
      questions.push({
        text: `Will ${player.name} score 50+ runs?`,
        type: 'batsman',
        odds: calculateBatsmanOdds(player.runs, player.balls)
      });
    }
  });

  // Bowler questions
  match.scorecard.bowlers.forEach(player => {
    questions.push({
      text: `Will ${player.name} take 3+ wickets?`,
      type: 'bowler',
      odds: calculateBowlerOdds(player.wickets, player.economy)
    });
  });

  return questions;
}

function calculateBatsmanOdds(runs: number, balls: number): number {
  const strikeRate = runs / balls * 100;
  return Math.min(0.95, Math.max(0.05, strikeRate / 100));
}

function calculateBowlerOdds(wickets: number, economy: number): number {
  return Math.min(0.95, Math.max(0.05, wickets * 0.2 + (6 - economy) * 0.1));
}