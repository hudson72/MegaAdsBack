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