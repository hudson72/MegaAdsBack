import {AdRecord} from "../records/adrecord";

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
    const ad = await AdRecord.listAll();

    expect(ad).toBeDefined();
});

test('Inserted AdRecord should have an id', async () => {

    const newAd = new AdRecord({
        name: 'test3',
        description: 'aaaaaaaa',
        price: 3,
        url: 'http://megak.pl',
        lat: 50.4736473,
        lon: 20.8765745
    });

    await newAd.insert();

    expect(newAd.id).toBeDefined();
    /*Poniżej sprawdzamy czy nasze id jest poprawnym uuid*/
    expect(newAd.id).toMatch(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
});