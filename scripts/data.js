const WHATSAPP_NUMBER = "5532984985335";
const NOME = "Clara Lanche";
const URL = "claralanches";
const ADDONS = [
  { id: "add-bacon", label: "Bacon", price: 5.0 },
  { id: "add-mussarela", label: "Mussarela c / fatia", price: 5.0 },
  { id: "add-presunto", label: "Presunto c / fatia", price: 5.0 },
  { id: "add-ovo", label: "Ovo extra", price: 5.0 },
  { id: "add-bife", label: "Bife", price: 8.0 },
];
const ADDONS_CACHORRAO = [
  { id: "add-bacon", label: "Bacon", price: 5.0 },
  { id: "add-mussarela", label: "Mussarela c / fatia", price: 5.0 },
  { id: "add-presunto", label: "Presunto c / fatia", price: 5.0 },
  { id: "add-ovo", label: "Ovo", price: 5.0 },
  { id: "add-maionese", label: "Maionese", price: 1.0 },
];

const CATALOG = [
  {
    category: "Lanches",
    items: [
      // Novos itens "Lanches de chapa"
      {
        id: "hamburguer",
        name: "HAMBURGUER",
        desc: "PÃO, BIFE, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 12.0 },
          { id: "frango", label: "Frango", price: 15.0 },
          { id: "lombo", label: "Lombo", price: 14.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-burguer",
        name: "X-BURGUER",
        desc: "PÃO, BIFE, QUEIJO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 14.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "presunto-burguer",
        name: "PRESUNTO BURGUER",
        desc: "PÃO, BIFE, PRESUNTO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 14.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "eggs-burguer",
        name: "EGG’S BURGUER",
        desc: "PÃO, BIFE, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 14.0 },
          { id: "frango", label: "Frango", price: 17.0 },
          { id: "lombo", label: "Lombo", price: 16.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "eggs-bacon",
        name: "EGG’S BACON",
        desc: "PÃO, BIFE, OVO, BACON, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 16.0 },
          { id: "frango", label: "Frango", price: 19.0 },
          { id: "lombo", label: "Lombo", price: 18.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-bacon",
        name: "X-BACON",
        desc: "PÃO, BIFE, QUEIJO, BACON, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 16.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-salada-completa",
        name: "X-SALADA",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 15.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-eggs",
        name: "X-EGG’S",
        desc: "PÃO, BIFE, QUEIJO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 16.0 },
          { id: "frango", label: "Frango", price: 18.0 },
          { id: "lombo", label: "Lombo", price: 17.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "presunto-eggs",
        name: "PRESUNTO EGG’S",
        desc: "PÃO, BIFE, PRESUNTO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 17.0 },
          { id: "frango", label: "Frango", price: 19.0 },
          { id: "lombo", label: "Lombo", price: 18.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-salada-eggs",
        name: "X-SALADA EGG’S",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, OVO, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 17.0 },
          { id: "frango", label: "Frango", price: 19.0 },
          { id: "lombo", label: "Lombo", price: 18.0 },
        ],
        addons: ADDONS,
      },
      {
        id: "x-tudo-completo",
        name: "X-TUDO",
        desc: "PÃO, BIFE, QUEIJO, PRESUNTO, BACON, OVO, MILHO, ERVILHA, ALFACE, TOMATE, BATATA",
        variants: [
          { id: "boi", label: "Boi", price: 18.0 },
          { id: "frango", label: "Frango", price: 20.0 },
          { id: "lombo", label: "Lombo", price: 19.0 },
        ],
        addons: ADDONS,
      },
    ],
  },
  {
    category: "Cachorrão",
    items: [
      {
        id: "cachorrao",
        name: "CACHORRÃO",
        desc: "PÃO, PROTEINA, MILHO, ERVILHA, TOMATE, CEBOLA, PIMENTÃO, BATATA , MOLHO",
        variants: [
          { id: "salsicha", label: "Salsicha", price: 14.0 },
          { id: "frango", label: "Frango", price: 16.0 },
          { id: "lombo", label: "Lombo", price: 15.0 },
        ],
        addons: ADDONS_CACHORRAO,
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
        price: 11.0,
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
        price: 40.0,
      },
    ],
  },
  {
    category: "Bebidas",
    items: [
      { id: "coca-2l", name: "COCA 2L", desc: "", price: 14.0 },
      { id: "paquera-2l", name: "PAQUERA 2L", desc: "", price: 9.0 },
    ],
  },
  {
    category: "Complementos",
    items: [
      {
        id: "add-maionese-caseira",
        name: "Maionese caseira",
        desc: "Maionese tempeiro da casa",
        price: 1.0,
      },
    ],
  },
];
