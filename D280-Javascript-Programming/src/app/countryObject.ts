export interface CountryObject {
    id: string;
    iso2code: string;
    name: string;
    region: { id: string, iso2code: string, value: string };
    incomeLevel: { id: string, iso2code: string, value: string };
    capitalCity: string;
    longitude: string;
    latitude: string;
}