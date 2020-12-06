interface IPeopleResponse {
    name: string,
    height: string,
    mass: string,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: object,
    films: object[],
    species: object[],
    vehicles: object[],
    starships: object[],
    created: string,
    edited: string,
    url: string
}

export { IPeopleResponse }