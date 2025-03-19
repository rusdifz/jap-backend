import * as crypto from 'crypto';

export async function ToBase64(str: string) {
    return Buffer.from(str, 'utf8').toString('base64');
}

export async function FromBase64(str: string) {
    return Buffer.from(str, 'base64').toString('utf8');
}

export async function ToMD5(str: string) {
    return crypto.createHash('md5').update(str).digest('hex');
}

export async function ToSHA256(str: string, key: string) {
    return crypto.createHmac('sha256', key).update(str).digest('hex');
}
