import * as fs from 'fs';
import * as path from 'path';
import type { IPVists, UniqueCount, URLVists } from "./types";

/**
 * Function to read file input.
 * 
 * Will remove empty lines
 */
export const readLinesFromFile = (filePath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return reject(err);
            }
            // Split the file content into lines and filter out any empty lines
            const lines = data.split('\n').filter(line => line.trim() !== '');
            resolve(lines);
        });
    });
};


export const getUniqueCount = <T extends string>(array: string[]) => array.reduce<Record<string, number>>((acc, item) => {
    return { ...acc, [item]: (acc[item] || 0) + 1 };
}, {} as Record<T, number>);


/**
 * returns X (default 3) most common instances. Returns in desc order.
 */
export const getMostFrequent = (data: UniqueCount, mostCommon = 3) =>
    Object.entries(data).sort(([_, countA], [__, countB]) => countB - countA)
        .slice(0, mostCommon)
        .map(([key, _]) => key);



export const start = async () => {
    const fileName = 'data.txt';
    const filePath = path.join(__dirname, fileName);
    const data = await readLinesFromFile(filePath);

    const getVisitedUrls = (urls: string[]): URLVists => <URLVists>getUniqueCount(urls);
    const getIPsVistited = (ips: string[]): IPVists => <IPVists>getUniqueCount(ips);

    if (!data.length) {
        throw (`data file ${fileName} is empty`);
    }
    const rawIPs = data.map(log => log.split(' - ')[0]);
    const rawURLs = data.map(log => log.split('"')[1].split(' ')[1]);

    const urls = getVisitedUrls(rawURLs);
    const ips = getIPsVistited(rawIPs);
    const uniqueIPs = Object.keys(ips).length;
    const topVisitiedURLS = getMostFrequent(urls);
    const mostActiveIPS = getMostFrequent(ips);

    const result = {
        uniqueIPs,
        topVisitiedURLS,
        mostActiveIPS,
    };

    console.log(result);
    return result;
};


//error boundary
try {
    start();
} catch (e) {
    console.error(e);
}

