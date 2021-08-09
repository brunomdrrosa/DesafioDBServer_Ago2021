let olympicsMedalTable = [
  { id: 1, country: "BRASIL", gold: 7, silver: 6, bronze: 6, continent: "AMERICA DO SUL" },
  { id: 2, country: "USA", gold: 46, silver: 37, bronze: 17, continent: "AMERICA DO NORTE" },
  { id: 3, country: "CHINA", gold: 26, silver: 18, bronze: 26, continent: "ASIA" },
  { id: 4, country: "RUSSIA", gold: 19, silver: 18, bronze: 19, continent: "EUROPA" },
  { id: 5, country: "REINO UNIDO", gold: 27, silver: 23, bronze: 17, continent: "EUROPA" },
  { id: 6, country: "ALEMANHA", gold: 17, silver: 10, bronze: 15, continent: "EUROPA" },
  { id: 7, country: "JAPÃO", gold: 12, silver: 8, bronze: 21, continent: "ASIA" },
  { id: 8, country: "ARGENTINA", gold: 3, silver: 1, bronze: 0, continent: "AMERICA DO SUL" },
  { id: 9, country: "ITALIA", gold: 8, silver: 12, bronze: 8, continent: "EUROPA" },
  { id: 10, country: "QUÊNIA", gold: 6, silver: 6, bronze: 1, continent: "AFRICA" },
];

Array.prototype.customFind = function (predicate) {
  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

Array.prototype.customSome = function (predicate) {
  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

Array.prototype.customFilter = function (predicate) {
  const filteredArray = [];
  for (let i = 0; i < this.length; i++) {
    if (predicate(this[i], i, this)) {
      filteredArray.push(this[i]);
    }
  }
  return filteredArray;
};

Array.prototype.customMap = function (callback) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }
  return newArray;
};

Array.prototype.customReduce = function (callback, initialValue) {
  let initialIndex = initialValue ? 0 : 1;
  let accumulator = initialValue || this[0];

  for (let i = initialIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Código modelo utilizando filter, map e reduce

const resultFilterMapReduce = olympicsMedalTable
  .filter((i) => i.continent === "ASIA") // JAPÃO e CHINA
  .map((i) => i.gold) // 26 e 12
  .reduce((total, quantity) => total + quantity); // 38

console.log(
  `Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`
);

// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo

const resultByCustomFilterMapReduce = olympicsMedalTable
  .customFilter((i) => i.continent === "ASIA")
  .customMap((i) => i.gold)
  .customReduce((total, quantity) => total + quantity);

console.log(
  `Resultado custom - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`
);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano = olympicsMedalTable.customFind(
  (medalist) => medalist.continent === "AFRICA"
).country;
console.log(
  "O único país do continente Africano no quadro de medalhas é a " +
    paisAfricano
);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable
  .customMap(
    (element) =>
      `${element.country} teve ${
        element.gold + element.silver + element.bronze
      } medalhas no total\n`
  )
  .join("");
console.log("\nQUADRO DE MEDALHAS\n" + medalhasPorPais);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable
  .customFilter((medals) => medals.gold > 10)
  .customMap((name) => name.country);
console.log(
  "Os países que conquistaram mais que 10 medalhas de ouro foram: " +
    paisesCom10MedalhasOuroNoMinimo
);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable
  .customFilter(
    (country) => country.gold + country.silver + country.bronze >= 30
  )
  .customMap((name) => name.country);
console.log(
  "Os países que conquistaram no mínimo mais que 30 medalhas foram: " +
    paisesCom30MedalhasNoMinimo
);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const americaDoSulTemPeloMenos20MedalhasDeOUro =
  olympicsMedalTable
    .customFilter((id) => id.continent === "AMERICA DO SUL")
    .customMap((id) => id.gold)
    .customReduce((total, quantity) => total + quantity) >= 20;
if (americaDoSulTemPeloMenos20MedalhasDeOUro == false) {
  const americaDoSulTemPeloMenos20MedalhasDeOUro =
    "A América do Sul não conquistou pelo menos 20 medalhas de ouro";
  console.log(americaDoSulTemPeloMenos20MedalhasDeOUro);
} else {
  const americaDoSulTemPeloMenos20MedalhasDeOUro =
    "A América do Sul conquistou pelo menos 20 medalhas de ouro";
  console.log(americaDoSulTemPeloMenos20MedalhasDeOUro);
}
