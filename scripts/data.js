const WHATSAPP_NUMBER = "5532984985335";
const NOME = "Clara Lanche";
const URL = "claralanches";
const ADDONS = [
  { id: "add-bacon", label: "Bacon", price: 4.0 },
  { id: "add-cheddar", label: "Cheddar", price: 3.5 },
  { id: "add-ovo", label: "Ovo extra", price: 2.5 },
  { id: "add-maionese", label: "Maionese extra", price: 1.5 },
];

const CATALOG = [
  {
    category: "Lanches",
    items: [
      // Itens antigos
      {
        id: "x-tudo",
        name: "X-Tudo",
        desc: "Padrão da casa com tudo incluso.",
        variants: [
          { id: "boi", label: "Boi", price: 26.9 },
          { id: "frango", label: "Frango", price: 24.9 },
          { id: "lombo", label: "Lombo", price: 28.9 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-salada",
        name: "X-Salada",
        desc: "Clássico com alface, tomate e queijo.",
        variants: [
          { id: "boi", label: "Boi", price: 22.9 },
          { id: "frango", label: "Frango", price: 20.9 },
          { id: "lombo", label: "Lombo", price: 24.9 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-egg",
        name: "X-Egg",
        desc: "Com ovo e queijo da casa.",
        variants: [
          { id: "boi", label: "Boi", price: 23.9 },
          { id: "frango", label: "Frango", price: 21.9 },
          { id: "lombo", label: "Lombo", price: 25.9 },
        ],
        addons: ADDONS,
      },

      // Novos itens "Lanches de chapa"
      {
        id: "hamburguer",
        name: "HAMBURGUER",
        desc: "PÃO, BIFE, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 11.0 },
          { id: "frango", label: "Frango", price: 14.0 },
          { id: "lombo", label: "Lombo", price: 13.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-burguer",
        name: "X-BURGUER",
        desc: "PÃO, BIFE, QUEIJO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 13.0 },
          { id: "frango", label: "Frango", price: 16.0 },
          { id: "lombo", label: "Lombo", price: 15.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "presunto-burguer",
        name: "PRESUNTO BURGUER",
        desc: "PÃO, BIFE, PRESUNTO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 13.0 },
          { id: "frango", label: "Frango", price: 16.0 },
          { id: "lombo", label: "Lombo", price: 15.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "eggs-burguer",
        name: "EGG’S BURGUER",
        desc: "PÃO, BIFE, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 13.0 },
          { id: "frango", label: "Frango", price: 16.0 },
          { id: "lombo", label: "Lombo", price: 15.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "eggs-bacon",
        name: "EGG’S BACON",
        desc: "PÃO, BIFE, OVO, BACON, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 15.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-bacon",
        name: "X-BACON",
        desc: "PÃO, BIFE, QUEIJO, BACON, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 15.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-salada-completa",
        name: "X-SALADA",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 14.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-eggs",
        name: "X-EGG’S",
        desc: "PÃO, BIFE, QUEIJO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 15.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "presunto-eggs",
        name: "PRESUNTO EGG’S",
        desc: "PÃO, BIFE, PRESUNTO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 16.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-salada-eggs",
        name: "X-SALADA EGG’S",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 16.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-tudo-completo",
        name: "X-TUDO",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, BACON, OVO, MILHO, ERVILHA, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 17.0 },
          { id: "frango", label: "Frango", price: 19.0 },
          { id: "lombo", label: "Lombo", price: 18.0 },
        ],
        addons: ADDONS,
      },
    ],
  },
  {
    category: "Cachorrão",
    items: [
      {
        id: "cachorrao-salsicha",
        name: "CACHORRÃO DE SALSICHA",
        desc: "PÃO, SALSICHA, MILHO, ERVILHA, TOMATE, CEBOLA, PIMENTÃO, BATATA , MOLHO",
        price: 13.0,
        addons: ADDONS,
      },
      {
        id: "cachorrao-frango",
        name: "CACHORRÃO DE FRANGO",
        desc: "PÃO, FRANGO, MILHO, ERVILHA, TOMATE, CEBOLA, PIMENTÃO, BATATA , MOLHO",
        price: 15.0,
        addons: ADDONS,
      },
      {
        id: "cachorrao-lombo",
        name: "CACHORRÃO DE LOMBO",
        desc: "PÃO, LOMBO, MILHO, ERVILHA, TOMATE, CEBOLA, PIMENTÃO, BATATA , MOLHO",
        price: 14.0,
        addons: ADDONS,
      },
    ],
  },
  {
    category: "Misto-Quente",
    items: [
      {
        id: "misto-quente",
        name: "MISTO-QUENTE",
        desc: "PÃO, PRESUNTO, QUEIJO",
        price: 10.0,
      },
    ],
  },
  {
    category: "Mexido",
    items: [
      {
        id: "mexido",
        name: "MEXIDO",
        desc: "ARROZ, ERVILHA, MILHO, LOMBO, LINGUIÇA DE PORCO, TORRESMO, CEBOLA BRANCA, POMAROLA, AZEITE E OVO.",
        price: 38.0,
      },
    ],
  },
  {
    category: "Bebidas",
    items: [
      {
        id: "refri-lata",
        name: "Refrigerante Lata",
        desc: "350 ml",
        price: 8.0,
      },
      {
        id: "refri-600",
        name: "Refrigerante 600 ml",
        desc: "Garrafa 600 ml",
        price: 12.0,
      },
      { id: "agua", name: "Água Mineral", desc: "Sem gás 500 ml", price: 5.0 },
      { id: "coca-2l", name: "COCA 2L", price: 14.0 },
      { id: "paquera-2l", name: "PAQUERA 2L", price: 9.0 },
    ],
  },
  {
    category: "Complementos",
    items: [
      {
        id: "batata",
        name: "Batata Frita",
        desc: "Porção individual",
        price: 15.9,
      },
      { id: "add-bacon", name: "Bacon", price: 5.0 },
      { id: "add-mussarela", name: "Mussarela c/ Fátia", price: 5.0 },
      { id: "add-presunto", name: "Presunto c/ Fátia", price: 5.0 },
      { id: "add-ovo", name: "Ovo", price: 5.0 },
      { id: "add-bife", name: "Bife", price: 8.0 },
    ],
  },
];
