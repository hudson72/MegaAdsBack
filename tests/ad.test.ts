import {AdRecord} from "../records/adrecord";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

const defaultObj = {
    name: 'test3',
    description: 'aaaaaaaa',
    price: 3,
    url: 'http://megak.pl',
    lat: 50.4736473,
    lon: 20.8765745,
}

afterAll(async () => {
    await pool.end()
})

test('AdRecord returns data from database for one entry', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('test');
});

test('AdRecord returns null from database for nonexistent entry', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
});

test('AdRecord returns data from database for all entries', async () => {
    const ads = await AdRecord.listAll('');

    expect(ads[0].id).toBeDefined();
    expect(ads).not.toEqual([]);
});

test('AdRecord returns an array of found entries when searching for letter "e" in the name', async () => {
    const ads = await AdRecord.listAll('e');

    expect(ads).toBeDefined();
    expect(ads).not.toEqual([]);
});

test('AdRecord returns an empty array when searching for sth that does not exist', async () => {
    const ads = await AdRecord.listAll('----------------');

    expect(ads).toEqual([]);
});

test('AdRecord returns only chosen data', async () => {
    const ads = await AdRecord.listAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('Inserted AdRecord should have an id', async () => {

    const newAd = new AdRecord(defaultObj);

    await newAd.insert();

    expect(newAd.id).toBeDefined();
    /*Poniżej sprawdzamy czy nasze id jest poprawnym uuid*/
    expect(newAd.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
});

test('AdRecord.insert inserts data to database', async () => {

    const newAd = new AdRecord(defaultObj);

    await newAd.insert();

    const foundAd = await AdRecord.getOne(newAd.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(newAd.id);
});