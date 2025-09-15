export interface TimeEntry {
    id: string;
    user: string;
    project: string;
    activity: string;
    date: string; // ISO date
    duration: number;
}

export interface ReportRequest {
    date: { start: string; end: string };
    fileType?: string;
    user?: string | null;
}

export interface ReportResponse {
    entries: TimeEntry[];
}

export interface Activity {
    id: string;
    name: string;
    color: string;
    folderId: string;
}

export interface Duration {
    startedAt: string; // ISO date
    stoppedAt: string; // ISO date
}

export interface Folder {
    id: string;
    name: string;
}

export interface Note {
    tags: string[];
    mentions: string[];
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface ReportItem {
    id: string;
    activity: Activity;
    duration: Duration;
    folder: Folder;
    note: Note;
    timezone: string;
    user: User;
}

export interface StatBoxType {
    percentage: number;
    name: string;
    duration: number;
    color: string;
}
