// utils/dailyChallenge.ts
export function getTodayChallenge() {
  const challenges = ["Score 100 in Reaction Game", "Find the secret badge"];
  const day = new Date().getDay();
  return challenges[day % challenges.length];
}