/**
 * Pure, side-effect-free helpers for working with job postings.
 *
 * These operate on plain `Job[]` arrays (already loaded from the content
 * collection by the calling page) so they can be unit tested without the Astro
 * content runtime or a database.
 */
import type { Job } from '../types/job';

/**
 * Filter roles by the selected department and location without mutating the input.
 *
 * @param jobs - Roles to filter.
 * @param department - Department to match, or an empty string for all departments.
 * @param location - Location to match, or an empty string for all locations.
 * @returns Roles matching both selected filters.
 */
export function filterJobs(
    jobs: Job[],
    department: string = '',
    location: string = '',
): Job[] {
    return jobs.filter(
        (job) =>
            (!department || job.department === department) &&
            (!location || job.location === location),
    );
}

/** Return jobs sorted by posted date, newest first (does not mutate input). */
export function sortByNewest(jobs: Job[]): Job[] {
    return [...jobs].sort(
        (a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime(),
    );
}

/**
 * Format an ISO-8601 date as a human-readable posted date,
 * e.g. "January 5, 2027". Falls back to the raw value if unparseable.
 */
export function formatPostedDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) {
        return iso;
    }
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
}
