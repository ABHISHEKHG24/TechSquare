import { config } from "@/data/config";

export async function getGithubStars(): Promise<number | null> {
  if (!config.githubUsername || !config.githubRepo) {
    return null;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${config.githubUsername}/${config.githubRepo}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(2000),
      },
    );
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (typeof data.stargazers_count !== "number") {
      return null;
    }
    return data.stargazers_count;
  } catch {
    return null;
  }
}
