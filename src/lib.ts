import { useEffect, useRef, useState } from 'react';
import CONFIG from '../portfolio.config';

export const githubAvatar = `https://github.com/${CONFIG.profile.githubUsername}.png?size=800`;
export const photo = CONFIG.profile.photo || githubAvatar;
export const backgroundImage = CONFIG.profile.backgroundImage || photo;

export const devicon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}.svg`;

/** Preview image for a project: explicit image, GitHub social card, or a live screenshot. */
export function projectImage(link: string, image?: string) {
  if (image) return image;
  const gh = link.match(/github\.com\/([^/]+\/[^/#?]+)/);
  if (gh) return `https://opengraph.githubassets.com/1/${gh[1]}`;
  return `https://image.thum.io/get/width/1280/crop/800/noanimate/${link}`;
}

/** Adds `is-visible` to `.reveal` elements as they scroll into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    const targets = el.classList.contains('reveal')
      ? [el]
      : Array.from(el.querySelectorAll('.reveal'));
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  });
  return ref;
}

export interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  homepage: string | null;
  topics?: string[];
}

const cache: { stats?: Promise<GitHubStats>; repos?: Promise<GitHubRepo[]> } =
  {};

function fetchRepos() {
  cache.repos ??= fetch(
    `https://api.github.com/users/${CONFIG.profile.githubUsername}/repos?per_page=100&sort=updated`,
  )
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  return cache.repos;
}

function fetchStats() {
  cache.stats ??= Promise.all([
    fetch(`https://api.github.com/users/${CONFIG.profile.githubUsername}`)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({})) as Promise<{
      public_repos?: number;
      followers?: number;
    }>,
    fetchRepos(),
  ]).then(([user, repos]) => ({
    repos: user.public_repos ?? repos.length,
    followers: user.followers ?? 0,
    stars: repos.reduce((n, r) => n + r.stargazers_count, 0),
  }));
  return cache.stats;
}

export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  useEffect(() => {
    fetchStats().then(setStats);
  }, []);
  return stats;
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);
  useEffect(() => {
    fetchRepos().then(setRepos);
  }, []);
  return repos;
}

/** Whole years elapsed since a 'YYYY-MM' date, at least 1. */
export function yearsSince(yyyyMm: string) {
  const [y, m] = yyyyMm.split('-').map(Number);
  const now = new Date();
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.max(1, Math.floor(months / 12));
}
