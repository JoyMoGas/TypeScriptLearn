/* Funciones como Tipo de dato*/

let testFunction: Function = () => {
    console.log('soy una funcion de prueba');
}

//testFunction = 10;

let anotherFunction = () => {
    console.log('soy otra funcion de prueba');
}


// Valores retornados por Funciones
let voidFunction = () => {
    console.log('soy una funcion que devuelve void');
}

//let a: number = voidFunction();

let twoPlusTwo = () => {
    return 2 + 2;
}

let b = twoPlusTwo();


// Pasando valores como parametros

let double = (num: number) => {
    return num * 2;
}

let c = double(2);
let d = double(6);
//let e = double('yp');

//console.log(c, d)

let concat = (a: string, b:string, reverse: boolean = false) => {
    if (reverse) {
        return b + a;
    }
    return a + b;
};

let result = concat('webtoriales', 'conmigo');

/* Alias de tipo */
type ID = string | number;
type Year = string | number;
/*
type Channel = {
    id: ID,
    name: string,
    suscribers: number,
    year: Year
}
*/

const getChannelName = (id: ID) => {
    console.log(`El canal con id ${id} se llama Webtoriales`)
}

const getChannelInfo = (channel: Channel) => {
    console.log(`${channel.name} tiene ${channel.suscribers} suscriptores y fue creado en ${channel.year}`);
}

const suscribeToChannel = (channel: Channel) => {
    console.log(`Te has suscrito a ${channel.name}`);
}

const webtoriales: Channel = {
    id: 123,
    name: 'webtoriales',
    suscribers: 1800,
    year: 2019
};

suscribeToChannel(webtoriales);

/* Interface VS Alias de tipo */
/*
type Channel = {
    id: ID,
    name: string,
    suscribers: number,
    year: Year
}
*/
interface Channel {
    id: ID,
    name: string,
    suscribers: number,
    year: Year
}

type PersonType = {
    name: string
};

interface PersonInterface {
    name: string
};

const person1: PersonType = { name: 'Natasha'};
const person2: PersonInterface = { name: 'Tony'};

type SuperHumanType = { powers: string[]} & PersonType;

const superHuman: SuperHumanType = {
    name: 'Peter Parker',
    powers: ['fuerza', 'sentido aracnido']
};

interface Alien extends PersonInterface {
    planet?: string
}

const alien: Alien = {
    name: 'Marciano',
    planet: 'marte'
};

interface Pet {
    name: string
}

interface Pet {
    isCute?: boolean
}

const myPet: Pet = {
    name: 'Garfield',
    isCute: true
}

type PetType = {
    name: string
}

//type PetType = {
//    isCute: boolean
//}