export class CryptoHelper {

    static async hashPassword(password: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    static generateRandomString(length: number = 16): string {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    static generateUUID(): string {
        return crypto.randomUUID();
    }

    static async encrypt(text: string, key: string): Promise<string> {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        const salt = crypto.getRandomValues(new Uint8Array(16));
        const derivedKey = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            derivedKey,
            data
        );

        const result = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        result.set(salt, 0);
        result.set(iv, salt.length);
        result.set(new Uint8Array(encrypted), salt.length + iv.length);

        return btoa(String.fromCharCode(...result));
    }

    static base64Encode(text: string): string {
        return btoa(text);
    }

    static base64Decode(encoded: string): string {
        return atob(encoded);
    }
}
