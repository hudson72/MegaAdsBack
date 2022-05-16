import {AdRecord} from "../records/adrecord";

const defaultObj = {
    name: 'test name',
    description: 'test',
    url: 'https:/megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
};

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('test name');
    expect(ad.description).toBe('test');
});

test('Validates invalid price', () => {
        expect(() => new AdRecord({
            ...defaultObj,
            price: -3,
        })).toThrow('Cena nie może być mniejsza od zera i większa niż 9 999 999!')
});

// @TODO: Check all validations