import { getMostFrequent, getUniqueCount, start, readLinesFromFile } from "./code";
import * as fs from 'fs';


jest.mock('fs');


describe('code', () => {

    describe('getUniqueCount', () => {

        const testCases = [
            { data: ['a', 'b', 'c', 'd', 'a', 'b', 'c'], answer: { a: 2, b: 2, c: 2, d: 1 } },
            { data: ['a', 'b'], answer: { a: 1, b: 1 } },
            { data: ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'], answer: { a: 2, b: 2, c: 2, d: 2 } }
        ];

        test.each(testCases)("test that with input $data it returns $answer",
            ({ data, answer }) => {
                const result = getUniqueCount(data as any);
                expect(answer).toEqual(result);
            });
    });

    describe('getMostFrequent', () => {
        const testCases = [
            { data: { 'a': 4, 'b': 3, 'c': 2, 'd': 1 }, answer: ['a', 'b', 'c'] },
            { data: { 'a': 4, 'b': 4, 'c': 4, 'd': 1 }, answer: ['a', 'b', 'c'] },
            { data: { 'a': 4, 'b': 4 }, answer: ['a', 'b'] },
            { data: { 'a': 4, 'b': 4, 'c': 4, 'd': 5 }, answer: ['d', 'a', 'b'] },

        ];
        test.each(testCases)("test that with input $data it returns $answer",
            ({ data, answer }) => {
                const result = getMostFrequent(data as any);
                expect(answer).toEqual(result);
            });

        test('that we can change how many values are returned', () => {
            const result = getMostFrequent({ 'a': 4, 'b': 3, 'c': 2, 'd': 1 }, 4);
            expect(['a', 'b', 'c', 'd']).toEqual(result);
        });
    });

    describe('readLinesFromFile', () => {
        beforeAll(() => {
            // @ts-ignore
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                if (path === 'data.txt') {
                    callback(null, 'line1\nline2\n\nline3\n');
                } else {
                    callback(new Error('File not found'), null);
                }
            });
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });

        it('should read lines from a file and return them as an array', async () => {
            const result = await readLinesFromFile('data.txt');
            expect(result).toEqual(['line1', 'line2', 'line3']);
        });

        it('should reject the promise if there is an error reading the file', async () => {
            await expect(readLinesFromFile('nonexistent.txt')).rejects.toThrow('File not found');
        });
    });

    describe('start', () => {

        beforeAll(() => {
            // Mock reading data from file
            // @ts-ignore
            jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
                callback(null, testData);
            });
        });

        afterAll(() => {
            jest.restoreAllMocks(); // Restore the original implementation
        });

        test('that start works', async () => {
            const result = await start();
            expect({
                uniqueIPs: 11,
                topVisitiedURLS: [
                    '/docs/manage-websites/',
                    '/intranet-analytics/',
                    'http://example.net/faq/'
                ],
                mostActiveIPS: ['168.41.191.40', '177.71.128.21', '50.112.00.11']
            }).toEqual(result);
        });

    });

});


/**
 * Copy paste of the data in text file
 */
const testData = '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"\n168.41.191.40 - - [09/Jul/2018:10:11:30 +0200] "GET http://example.net/faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"\n168.41.191.41 - - [11/Jul/2018:17:41:30 +0200] "GET /this/page/does/not/exist/ HTTP/1.1" 404 3574 "-" "Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"\n168.41.191.40 - - [09/Jul/2018:10:10:38 +0200] "GET http://example.net/blog/category/meta/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"\n177.71.128.21 - - [10/Jul/2018:22:22:08 +0200] "GET /blog/2018/08/survey-your-opinion-matters/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"\n168.41.191.9 - - [09/Jul/2018:23:00:42 +0200] "GET /docs/manage-users/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/536.3 (KHTML, like Gecko) Chrome/19.0.1063.0 Safari/536.3"\n168.41.191.40 - - [09/Jul/2018:10:11:56 +0200] "GET /blog/category/community/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; ca-ad) AppleWebKit/531.2+ (KHTML, like Gecko) Safari/531.2+ Epiphany/2.30.6"\n168.41.191.34 - - [10/Jul/2018:22:01:17 +0200] "GET /faq/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"\n177.71.128.21 - - [10/Jul/2018:22:21:03 +0200] "GET /docs/manage-websites/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"\n50.112.00.28 - - [11/Jul/2018:15:49:46 +0200] "GET /faq/how-to-install/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; ca-ad) AppleWebKit/531.2+ (KHTML, like Gecko) Safari/531.2+ Epiphany/2.30.6"\n50.112.00.11 - admin [11/Jul/2018:17:31:56 +0200] "GET /asset.js HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"\n72.44.32.11 - - [11/Jul/2018:17:42:07 +0200] "GET /to-an-error HTTP/1.1" 500 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"\n72.44.32.10 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0" junk extra\n168.41.191.9 - - [09/Jul/2018:22:56:45 +0200] "GET /docs/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0" 456 789\n168.41.191.43 - - [11/Jul/2018:17:43:40 +0200] "GET /moved-permanently HTTP/1.1" 301 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"\n168.41.191.43 - - [11/Jul/2018:17:44:40 +0200] "GET /temp-redirect HTTP/1.1" 307 3574 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) RockMelt/0.9.58.494 Chrome/11.0.696.71 Safari/534.24"\n168.41.191.40 - - [09/Jul/2018:10:12:03 +0200] "GET /docs/manage-websites/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0"\n168.41.191.34 - - [10/Jul/2018:21:59:50 +0200] "GET /faq/how-to/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)"\n72.44.32.10 - - [09/Jul/2018:15:49:48 +0200] "GET /translations/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.9 Safari/536.5"\n79.125.00.21 - - [10/Jul/2018:20:03:40 +0200] "GET /newsletter/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)"\n50.112.00.11 - admin [11/Jul/2018:17:31:05 +0200] "GET /hosting/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"\n72.44.32.10 - - [09/Jul/2018:15:48:20 +0200] "GET /download/counter/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"\n50.112.00.11 - admin [11/Jul/2018:17:33:01 +0200] "GET /asset.css HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"\n';