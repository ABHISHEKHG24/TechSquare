import { config } from "@/data/config";
import { getGithubStars } from "@/lib/github-stars";
import { GitHubStarsButton } from "../ui/shadcn-io/github-stars-button";

export default async function GitHubStars({ className }: { className?: string }) {
  if (!config.githubUsername || !config.githubRepo) return null;

  let stars: number | null = null;
  try {
    stars = await getGithubStars();
  } catch {
    return null;
  }

  if (typeof stars !== "number") return null;

  return (
    <GitHubStarsButton
      username={config.githubUsername}
      repo={config.githubRepo}
      stars={stars}
      className={className}
    />
  );
}
