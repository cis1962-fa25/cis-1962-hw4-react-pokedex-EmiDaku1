import type { Pokemon, BoxEntry, InsertBoxEntry, UpdateBoxEntry } from '../types/types';

const BASE_URL = 'https://hw4.cis1962.esinx.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJwZW5ua2V5IjoiZW1pZGFrdSIsImlhdCI6MTc1OTA5ODIxOCwiaXNzIjoiZWR1OnVwZW5uOnNlYXM6Y2lzMTk2MiIsImF1ZCI6ImVkdTp1cGVubjpzZWFzOmNpczE5NjIiLCJleHAiOjE3NjQyODIyMTh9.FqanX1wayti43UWi_4Azz0gGRo5jKI3J8ccD025EAOM';

class PokemonAPI {
    private async fetch<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `HTTP error! status: ${response.status}`
            );
        }

        // Handle 204 No Content responses
        if (response.status === 204) {
            return null as T;
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }

        // if no content type or not JSON, return null
        return null as T;
    }

    // Pokemon endpoints
    async listPokemon(limit: number, offset: number): Promise<Pokemon[]> {
        return this.fetch<Pokemon[]>(
            `/pokemon/?limit=${limit}&offset=${offset}`
        );
    }

    async getPokemonByName(name: string): Promise<Pokemon> {
        return this.fetch<Pokemon>(`/pokemon/${name}`);
    }

    // Box endpoints
    private getAuthHeaders(): HeadersInit {
        return {
            'Authorization': `Bearer ${JWT_TOKEN}`,
            'Content-Type': 'application/json',
        };
    }

    async listBoxEntries(): Promise<string[]> {
        return this.fetch<string[]>('/box/', {
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        });
    }

    async createBoxEntry(entry: InsertBoxEntry): Promise<BoxEntry> {
        return this.fetch<BoxEntry>('/box/', {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(entry),
        });
    }

    async getBoxEntry(id: string): Promise<BoxEntry> {
        return this.fetch<BoxEntry>(`/box/${id}`, {
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        });
    }

    async updateBoxEntry(
        id: string,
        update: UpdateBoxEntry
    ): Promise<BoxEntry> {
        return this.fetch<BoxEntry>(`/box/${id}`, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(update),
        });
    }

    async deleteBoxEntry(id: string): Promise<void> {
        return this.fetch<void>(`/box/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        });
    }

    async clearAllBoxEntries(): Promise<void> {
        return this.fetch<void>('/box/', {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
            },
        });
    }
}

export default new PokemonAPI();