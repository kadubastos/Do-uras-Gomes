export interface Product {
  id: string;
  name: string;
  category: 'potes' | 'travessas' | 'tacas' | 'tortas' | 'cookies';
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  servings?: string;
  description: string;
  ingredients: string[];
  highlight?: string;
  imageStory?: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  itemOrdered: string;
}

export const BRAND = {
  name: "Doçuras da Gomes",
  tagline: "Confeitaria Artesanal",
  slogan: "Aqui cada doce é feito com muito amor!",
  secondarySlogan: "Doce é sempre uma boa ideia!",
  phone: "(62) 9 8138-0524",
  phoneRaw: "5562981380524",
  instagram: "@docuras_gomes",
  instagramUrl: "https://instagram.com/docuras_gomes",
  whatsappUrl: "https://wa.me/5562981380524",
  location: "Goiânia - GO e Região",
  deliveryType: "Retirada agendada & Encomendas antecipadas",
  logoUrl: "/assets/aistudio/817985696_18142197463518121_5895345191046165777_n_8d369594.jpg",
  banners: {
    menuGeneral: "/assets/aistudio/image_5506cf69.png",
    travessas: "/assets/aistudio/image_081ce2d2.png",
    tacasSupreme1: "/assets/aistudio/image_d420759b.png",
    tacasSupreme2: "/assets/aistudio/image_46d712ef.png",
    cheesecakes: "/assets/aistudio/image_5ad2eddb.png",
    encomendasInfo: "/assets/aistudio/image_7279b779.png"
  }
};

export const CATEGORIES = [
  { id: 'all', label: 'Todos os Doces' },
  { id: 'potes', label: 'Bolos no Pote & Vulcão' },
  { id: 'tacas', label: 'Taças Supreme (2L)' },
  { id: 'travessas', label: 'Travessas Gourmet' },
  { id: 'tortas', label: 'Cheesecakes & Tortas' },
  { id: 'cookies', label: 'Cookies & Pudim' },
] as const;

export const PRODUCTS: Product[] = [
  // Taças Supreme (2L)
  {
    id: 'taca-brownie',
    name: 'Taça Supreme de Brownie',
    category: 'tacas',
    categoryLabel: 'Taça Supreme 2L',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve aprox. 8 a 10 porções',
    description: 'Camadas generosas de brownie macio de chocolate nobre, brigadeiro cremoso de ninho, morangos frescos selecionados e brigadeiro intenso de chocolate.',
    ingredients: ['Brownie macio artesanal', 'Brigadeiro cremoso de Ninho', 'Morangos frescos', 'Brigadeiro de chocolate'],
    highlight: 'Mais pedida para almoços em família e celebrações',
    imageStory: '/assets/aistudio/image_d420759b.png',
    badge: 'Destaque'
  },
  {
    id: 'taca-bombom-uva',
    name: 'Taça Supreme Bombom de Uva',
    category: 'tacas',
    categoryLabel: 'Taça Supreme 2L',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve aprox. 8 a 10 porções',
    description: 'Brigadeiro cremoso de ninho aveludado, uvas verdes frescas sem sementes, brigadeiro de chocolate e finalização especial com ganache meio amargo nobre.',
    ingredients: ['Brigadeiro cremoso de ninho', 'Uvas verdes frescas', 'Brigadeiro de chocolate', 'Ganache meio amargo'],
    imageStory: '/assets/aistudio/image_d420759b.png',
  },
  {
    id: 'taca-sensacao',
    name: 'Taça Supreme Sensação',
    category: 'tacas',
    categoryLabel: 'Taça Supreme 2L',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve aprox. 8 a 10 porções',
    description: 'O clássico irresistível: brigadeiro de chocolate, brigadeiro de ninho cremoso, morangos frescos inteiros e fatiados, e bolinhas crocantes de chocolate.',
    ingredients: ['Brigadeiro de chocolate', 'Brigadeiro de ninho', 'Morangos frescos', 'Bolinhas crocantes de chocolate'],
    imageStory: '/assets/aistudio/image_d420759b.png',
  },
  {
    id: 'taca-bombom-morango',
    name: 'Taça Supreme Bombom de Morango',
    category: 'tacas',
    categoryLabel: 'Taça Supreme 2L',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve aprox. 8 a 10 porções',
    description: 'Brigadeiro cremoso de ninho, abundância de morangos frescos fatiados, brigadeiro de chocolate e acabamento sofisticado em chocolate meio amargo.',
    ingredients: ['Brigadeiro cremoso de ninho', 'Morangos frescos', 'Brigadeiro de chocolate', 'Chocolate meio amargo'],
    imageStory: '/assets/aistudio/image_46d712ef.png',
    badge: 'Favorito'
  },
  {
    id: 'taca-kinder-bueno',
    name: 'Taça Supreme Kinder Bueno',
    category: 'tacas',
    categoryLabel: 'Taça Supreme 2L',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve aprox. 8 a 10 porções',
    description: 'Explosão de sabor com brigadeiro de ninho, brigadeiro de chocolate belga, pedaços generosos de Kinder Bueno crocante e morangos frescos.',
    ingredients: ['Brigadeiro de ninho', 'Brigadeiro de chocolate', 'Pedaços de Kinder Bueno', 'Morangos frescos'],
    imageStory: '/assets/aistudio/image_46d712ef.png',
  },

  // Travessas Gourmet (R$ 100,00)
  {
    id: 'travessa-brownie',
    name: 'Travessa Especial de Brownie',
    category: 'travessas',
    categoryLabel: 'Travessa Especial',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve 6 a 8 pessoas',
    description: 'Equilíbrio perfeito de acidez e doçura: brigadeiro suave de maracujá, pedaços úmidos de brownie e brigadeiro belga, finalizado com cubos dourados de brownie.',
    ingredients: ['Brigadeiro de maracujá', 'Pedaços de brownie úmido', 'Brigadeiro belga', 'Quadrados de brownie na finalização'],
    imageStory: '/assets/aistudio/image_081ce2d2.png',
  },
  {
    id: 'travessa-morangofe',
    name: 'Travessa Morangofe Artesanal',
    category: 'travessas',
    categoryLabel: 'Travessa Especial',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve 6 a 8 pessoas',
    description: 'Uma releitura requintada com brigadeiro de ninho super aveludado, geleia caseira artesanal de morangos selecionados, suspiros crocantes e morangos frescos.',
    ingredients: ['Brigadeiro de ninho', 'Geleia artesanal de morango', 'Suspiros crocantes', 'Morangos frescos'],
    imageStory: '/assets/aistudio/image_081ce2d2.png',
    badge: 'Sucesso'
  },
  {
    id: 'travessa-torta-limao',
    name: 'Travessa Torta de Limão',
    category: 'travessas',
    categoryLabel: 'Travessa Especial',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve 6 a 8 pessoas',
    description: 'Farofa crocante amanteigada de biscoito Maizena, mousse de limão fresca e aveludada, finalizada com generoso chantininho e raspas cítricas de limão.',
    ingredients: ['Farofa de biscoito Maizena crocante', 'Mousse de limão suave', 'Chantininho artesanal', 'Raspas de limão siciliano e taiti'],
    imageStory: '/assets/aistudio/image_081ce2d2.png',
  },
  {
    id: 'travessa-surpresa-uva',
    name: 'Travessa Surpresa de Uva',
    category: 'travessas',
    categoryLabel: 'Travessa Especial',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve 6 a 8 pessoas',
    description: 'Brigadeiro de ninho cremoso, uvas verdes doces sem sementes picadas e brigadeiro belga aveludado, decorado com uvas verdes inteiras e granulado meio amargo.',
    ingredients: ['Brigadeiro de ninho', 'Uvas verdes selecionadas', 'Brigadeiro belga', 'Granulado nobre meio amargo'],
    imageStory: '/assets/aistudio/image_081ce2d2.png',
  },
  {
    id: 'travessa-surpresa-morango',
    name: 'Travessa Surpresa de Morango',
    category: 'travessas',
    categoryLabel: 'Travessa Especial',
    price: 100.00,
    formattedPrice: 'R$ 100,00',
    servings: 'Serve 6 a 8 pessoas',
    description: 'Brigadeiro de ninho nobre, morangos frescos picados na hora e brigadeiro belga cremoso, finalizado com morangos frescos e raspas de chocolate branco nobre.',
    ingredients: ['Brigadeiro de ninho', 'Morangos frescos picados', 'Brigadeiro belga', 'Granulado branco nobre'],
    imageStory: '/assets/aistudio/image_081ce2d2.png',
  },

  // Tortas & Cheesecakes
  {
    id: 'torta-cookie',
    name: 'Torta Cookie Recheada',
    category: 'tortas',
    categoryLabel: 'Torta Especial',
    price: 80.00,
    formattedPrice: 'R$ 80,00',
    servings: 'Serve aprox. 8 a 10 fatias',
    description: 'Torta macia e crocante com gotas de chocolate, massa amanteigada farta recheada com Nutella pura ou Doce de Leite cremoso artesanal.',
    ingredients: ['Massa artesanal de cookie com baunilha', 'Gotas de chocolate meio amargo', 'Recheio de Nutella ou Doce de Leite'],
    imageStory: '/assets/aistudio/image_46d712ef.png',
    badge: 'Exclusividade'
  },
  {
    id: 'cheesecake-morango',
    name: 'Cheesecake de Morango',
    category: 'tortas',
    categoryLabel: 'Cheesecake Especial',
    price: 95.00,
    formattedPrice: 'R$ 95,00',
    servings: 'Serve aprox. 8 porções',
    description: 'Base crocante com biscoitos finos, creme aveludado e suave de cream cheese e uma generosa cobertura artesanal com morangos frescos e brilhantes.',
    ingredients: ['Base crocante amanteigada', 'Creme suave de cream cheese', 'Geleia e morangos frescos selecionados'],
    imageStory: '/assets/aistudio/image_5ad2eddb.png',
  },
  {
    id: 'cheesecake-frutas-vermelhas',
    name: 'Cheesecake de Frutas Vermelhas',
    category: 'tortas',
    categoryLabel: 'Cheesecake Especial',
    price: 95.00,
    formattedPrice: 'R$ 95,00',
    servings: 'Serve aprox. 8 porções',
    description: 'Base crocante de biscoitos, creme suave na consistência perfeita e uma cobertura irresistível com calda brilhante de amoras, mirtilos e morangos.',
    ingredients: ['Base crocante amanteigada', 'Creme suave especial', 'Calda aveludada de frutas vermelhas silvestres'],
    imageStory: '/assets/aistudio/image_5ad2eddb.png',
  },

  // Bolos no Pote & Vulcão
  {
    id: 'bolo-pote-chocolate',
    name: 'Bolo no Pote de Chocolate',
    category: 'potes',
    categoryLabel: 'Bolo no Pote',
    price: 15.00,
    formattedPrice: 'R$ 15,00',
    servings: 'Pote individual 250g',
    description: 'Massa fofinha de cacau nobre intercalada com brigadeiro belga cremoso feito na panela e finalizado com raspas de chocolate.',
    ingredients: ['Massa de cacau 50%', 'Brigadeiro artesanal belga', 'Calda suave de chocolate'],
    imageStory: '/assets/aistudio/image_5506cf69.png',
  },
  {
    id: 'bolo-pote-ninho-morango',
    name: 'Bolo no Pote Ninho com Morango',
    category: 'potes',
    categoryLabel: 'Bolo no Pote',
    price: 15.00,
    formattedPrice: 'R$ 15,00',
    servings: 'Pote individual 250g',
    description: 'Pão de ló leve e molhadinho, brigadeiro de ninho cremoso e pedaços frescos de morango natural entre cada camada.',
    ingredients: ['Pão de ló suave', 'Brigadeiro de Ninho cremoso', 'Morangos frescos picados'],
    imageStory: '/assets/aistudio/image_5506cf69.png',
    badge: 'Mais Vendido'
  },
  {
    id: 'bolo-pote-cenoura-chocolate',
    name: 'Bolo no Pote Cenoura com Chocolate',
    category: 'potes',
    categoryLabel: 'Bolo no Pote',
    price: 15.00,
    formattedPrice: 'R$ 15,00',
    servings: 'Pote individual 250g',
    description: 'A clássica receita de família com bolo de cenoura super macio e úmido, coberto com brigadeiro de chocolate quente que encorpa.',
    ingredients: ['Bolo artesanal de cenoura fresca', 'Brigadeiro cremoso de chocolate'],
    imageStory: '/assets/aistudio/image_5506cf69.png',
  },
  {
    id: 'bolo-vulcao',
    name: 'Bolo Vulcão de Chocolate',
    category: 'potes',
    categoryLabel: 'Bolo Vulcão',
    price: 17.00,
    formattedPrice: 'A partir de R$ 17,00',
    servings: 'Individual (R$ 17) ou Grande (sob consulta)',
    description: 'Bolo artesanal com centro recheado até a borda que transborda uma cascata aveludada de brigadeiro gourmet ao cortar.',
    ingredients: ['Massa caseira macia', 'Brigadeiro gourmet aveludado em ponto de cascata'],
    imageStory: '/assets/aistudio/image_5506cf69.png',
  },

  // Cookies & Pudim
  {
    id: 'pudim-tradicional',
    name: 'Pudim Tradicional Lisinho',
    category: 'cookies',
    categoryLabel: 'Sobremesa Tradicional',
    price: 10.00,
    formattedPrice: 'R$ 10,00 (pote) / R$ 60,00 (grande)',
    servings: 'Pote individual ou Forma inteira',
    description: 'Pudim clássico de leite condensado, super cremoso, sem furinhos, na medida certa da doçura e com calda de caramelo dourada brilhante.',
    ingredients: ['Leite condensado nobre', 'Ovos frescos selecionados', 'Calda de caramelo caseira'],
    imageStory: '/assets/aistudio/image_5ad2eddb.png',
    badge: 'Receita Secreta'
  },
  {
    id: 'cookies-artesanais',
    name: 'Cookies Tradicionais e Recheados',
    category: 'cookies',
    categoryLabel: 'Cookies Artesanais',
    price: 7.00,
    formattedPrice: 'R$ 7,00 unid.',
    servings: 'Unidade individual 90g',
    description: 'Massa com manteiga de verdade, crocante por fora e macia por dentro, generosamente coberta de gotas de chocolate nobre.',
    ingredients: ['Massa amanteigada clássica americana', 'Gotas nobres de chocolate ao leite e meio amargo'],
    imageStory: '/assets/aistudio/image_5506cf69.png',
  }
];

export const TESTIMONIALS: Review[] = [
  {
    id: 'rev-1',
    name: 'Mariana Silveira',
    city: 'Goiânia - GO',
    rating: 5,
    comment: 'A Taça Supreme de Brownie foi o ponto alto do aniversário da minha mãe! Todo mundo elogiou a qualidade dos brigadeiros e o frescor dos morangos.',
    date: 'Há 2 semanas',
    itemOrdered: 'Taça Supreme de Brownie'
  },
  {
    id: 'rev-2',
    name: 'Carlos Henrique',
    city: 'Aparecida de Goiânia - GO',
    rating: 5,
    comment: 'Os bolos no pote e a torta cookie são surreais de gostosos. Dá para sentir o cuidado e o amor em cada camada. Atendimento impecável no WhatsApp!',
    date: 'Há 3 semanas',
    itemOrdered: 'Torta Cookie com Nutella & Potes'
  },
  {
    id: 'rev-3',
    name: 'Fernanda Rocha',
    city: 'Goiânia - GO',
    rating: 5,
    comment: 'Pudim lisinho e cremoso de verdade, no ponto exato! Já é a terceira vez que encomendo para os almoços de domingo da família.',
    date: 'Há 1 mês',
    itemOrdered: 'Pudim Tradicional Gourmet'
  }
];

export const ORDER_POLICY = {
  anticipation: 'Encomendas com no mínimo 48h de antecedência',
  deposit: 'Confirmação mediante 50% de entrada no ato do pedido',
  remaining: 'Os outros 50% são pagos no dia da retirada do produto',
  delivery: 'Retirada com horário agendado com pontualidade',
  paymentMethods: ['Pix', 'Cartão de Débito', 'Cartão de Crédito', 'Dinheiro']
};
