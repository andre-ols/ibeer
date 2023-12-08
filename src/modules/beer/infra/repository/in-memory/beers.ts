import { ListBeerRepository } from '../../../domain/repository/beer'

export const beers: ListBeerRepository.Result['beers'] = [
	{
		id: 1,
		name: 'Berliner Weisse With Yuzu - B-Sides',
		description:
			'Mergulhe em uma jornada gustativa única com nossa Berliner Weisse com Yuzu. O alemão encontra o japonês enquanto o aroma cítrico do Yuzu dança no ar. A fermentação com levedura de lager em temperaturas ale cria uma experiência refrescante e efervescente. Feche os olhos e sinta a crocância de uma lager misturada à frutuosidade exótica de uma ale, transportando-o para um jardim de citros sob o sol japonês.',
		imageUrl: '',
		abv: 4.2,
		ibu: 8,
		ebc: 8,
		category: 'Berliner Weisse',
		foodPairing: ['Asas de frango defumadas', 'Ramen de miso', 'Cheesecake de yuzu.'],
		brewersTips:
			'A adição do fruto cítrico japonês Yuzu durante a fermentação realça a natureza ácida desta Berliner Weisse. A fermentação com uma levedura de lager em temperaturas ale cria uma fusão única de crocância e frutuosidade.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 2,
		name: 'IPA Tropical Burst',
		description:
			'Sinta a explosão tropical em cada gole! Nossa IPA Tropical Burst é uma jornada pelos trópicos, onde lúpulos tropicais se misturam em uma dança aromática. Feche os olhos e imagine-se em uma ilha paradisíaca enquanto saboreia as notas intensas de manga, maracujá e abacaxi. Uma experiência sensorial que eleva a IPA a um novo patamar de frescor e sabor.',
		imageUrl: '',
		abv: 6.5,
		ibu: 45,
		ebc: 12,
		category: 'India Pale Ale (IPA)',
		foodPairing: ['Tacos de camarão', 'Frango grelhado com abacaxi', 'Sorvete de manga.'],
		brewersTips:
			'A intensa lupulagem a seco com lúpulos tropicais durante a maturação confere a esta IPA um perfil aromático exuberante, destacando notas de frutas tropicais como manga, maracujá e abacaxi.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 3,
		name: 'Stout Café Imperial',
		description:
			'Adentre um café artesanal com nossa Stout Café Imperial. O aroma de grãos de café torrados preenche o ar, enquanto cada gole revela camadas de complexidade. A infusão de café imperial durante a maturação proporciona uma riqueza profunda de sabores de café, complementada pela suavidade da levedura. Feche os olhos e sinta-se em uma cafeteria aconchegante, explorando nuances de torrefação e cafeína.',
		imageUrl: '',
		abv: 7.8,
		ibu: 35,
		ebc: 40,
		category: 'Stout',
		foodPairing: ['Churrasco', 'Brownie de chocolate amargo', 'Queijo azul.'],
		brewersTips:
			'A infusão de café imperial durante a maturação proporciona uma experiência robusta, destacando a torrefação do malte e os aromas intensos de café, enquanto a levedura contribui para um final seco.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 4,
		name: 'Saison de Pêssego da Província',
		description:
			'Viaje para os campos de pêssegos na Provence com nossa Saison de Pêssego. Cada gole é como uma brisa fresca carregada com a doçura suculenta dos pêssegos locais. A levedura saison adiciona notas frutadas, enquanto a suavidade da cerveja evoca a sensação de um dia ensolarado. Feche os olhos e transporte-se para uma praia tropical, onde cada gole é como um mergulho revigorante no mar.',
		imageUrl: '',
		abv: 5.4,
		ibu: 20,
		ebc: 10,
		category: 'Saison',
		foodPairing: ['Salada de folhas verdes', 'Frutos do mar grelhados', 'Tarte de pêssego.'],
		brewersTips:
			'O uso de leveduras saison durante a fermentação cria uma cerveja refrescante com notas frutadas, e a adição de pêssegos da Provence oferece uma doçura suculenta que complementa as características da levedura.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 5,
		name: 'Golden Honey Ale',
		description:
			'Experimente a doçura dourada em cada gota da nossa Golden Honey Ale. O mel cru adicionado no final da fervura empresta uma doçura floral que se equilibra perfeitamente com a base maltada. Feche os olhos e imagine-se em um campo de flores silvestres, com o néctar dourado da cerveja acariciando seu paladar, criando uma experiência única e celestial.',
		imageUrl: '',
		abv: 5,
		ibu: 25,
		ebc: 12,
		category: 'Honey Ale',
		foodPairing: ['Queijo brie', 'Frango assado', 'Sorvete de baunilha.'],
		brewersTips:
			'A adição de mel cru no final da fervura preserva os aromas naturais e contribui para uma Ale dourada equilibrada, onde a doçura floral do mel se mistura harmoniosamente com a base maltada.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 6,
		name: 'Gose de Melancia Refrescante',
		description:
			'Sinta a brisa do oceano enquanto desfruta de nossa Gose de Melancia Refrescante. A melancia adicionada durante a fermentação mistura-se ao sal marinho, proporcionando uma experiência salgada e doce. Feche os olhos e imagine-se em uma praia tropical, onde cada gole é como um mergulho revigorante no mar.',
		imageUrl: '',
		abv: 4.5,
		ibu: 12,
		ebc: 6,
		category: 'Gose',
		foodPairing: ['Salada de melancia', 'Ceviche de camarão', 'Sobremesa de limão.'],
		brewersTips:
			'A adição de melancia durante a fermentação e um toque de sal marinho na fervura criam uma Gose refrescante e equilibrada, oferecendo uma interação única entre o salgado e o doce.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 7,
		name: 'Tripel Belga Dourada',
		description:
			'Entre em um mosteiro belga com nossa Tripel Belga Dourada. Cada gole é uma jornada espiritual, onde a cepa de levedura belga cria uma sinfonia de ésteres frutados e notas condimentadas. Feche os olhos e sinta-se cercado pelo aroma celestial, enquanto a complexidade maltada e a secura no final elevam a experiência a um nível divino.',
		imageUrl: '',
		abv: 8.5,
		ibu: 30,
		ebc: 15,
		category: 'Tripel',
		foodPairing: ['Mexilhões ao vapor', 'Queijo gouda envelhecido', 'Torta de maçã.'],
		brewersTips:
			'O uso de uma cepa de levedura belga durante a fermentação confere notas frutadas e condimentadas a esta Tripel. O alto teor alcoólico é equilibrado pela complexidade maltada e pela secura no final.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	{
		id: 8,
		name: 'Amber Ale de Caramelo',
		description:
			'Adentre uma confeitaria com nossa Amber Ale de Caramelo. A adição de maltes caramelizados durante a brassagem cria um espetáculo de caramelo, equilibrado pela harmonia entre maltes e lúpulos. Feche os olhos e imagine-se em um mundo de sabores aveludados, onde cada gole é uma indulgência reconfortante.',
		imageUrl: '',
		abv: 6,
		ibu: 25,
		ebc: 18,
		category: 'Amber Ale',
		foodPairing: ['Costelas de porco grelhadas', 'Chili com carne', 'Bolo de caramelo.'],
		brewersTips:
			'A adição de maltes caramelizados durante a brassagem intensifica os sabores de caramelo, criando uma Amber Ale rica e equilibrada, onde os maltes e lúpulos se complementam.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 9,
		name: 'Session IPA Citrus Splash',
		description:
			'Navegue por um pomar cítrico com nossa Session IPA Citrus Splash. O aroma cítrico fresco e o perfil de sabor leve convidam você a um passeio sob o sol. Feche os olhos e sinta o frescor de lúpulos cítricos e notas de frutas enquanto saboreia esta cerveja de baixo teor alcoólico, perfeita para momentos despreocupados.',
		imageUrl: '',
		abv: 4,
		ibu: 20,
		ebc: 10,
		category: 'Session IPA',
		foodPairing: ['Tacos de peixe', 'Salada de frutas', 'Sorvete de limão.'],
		brewersTips:
			'O uso de lúpulos de aroma cítrico e o dry hopping generoso conferem a esta Session IPA um perfil refrescante e cítrico, mantendo um baixo teor alcoólico.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 10,
		name: 'Rye Pale Ale Picante',
		description:
			'Entre em um jardim de especiarias com nossa Rye Pale Ale Picante. Cada gole é uma explosão de sabores, com o centeio adicionando um toque picante e terroso. Feche os olhos e imagine-se entre campos de grãos de centeio, explorando um mundo de complexidade e sabor.',
		imageUrl: '',
		abv: 5.8,
		ibu: 35,
		ebc: 14,
		category: 'Pale Ale',
		foodPairing: ['Hambúrguer de carne de porco', 'Queijo pepper jack', 'Torta de maçã.'],
		brewersTips:
			'A adição de centeio maltado proporciona à Pale Ale um toque picante e terroso, enquanto a combinação de lúpulos cítricos e picantes contribui para um perfil de sabor complexo.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	{
		id: 11,
		name: 'Double Chocolate Porter',
		description:
			'Delicie-se em uma chocolateria com nossa Double Chocolate Porter. O cacau em pó e os nibs de cacau adicionados durante a fervura criam uma experiência decadente de chocolate. Feche os olhos e deixe-se envolver pela riqueza e suavidade, como se estivesse saboreando um pedaço de chocolate gourmet.',
		imageUrl: '',
		abv: 7.2,
		ibu: 40,
		ebc: 30,
		category: 'Porter',
		foodPairing: ['Brownie de chocolate', 'Queijo azul envelhecido', 'Churrasco defumado.'],
		brewersTips:
			'A adição de cacau em pó e nibs de cacau durante a fervura cria uma Porter intensamente chocolate. A levedura utilizada acentua as notas de chocolate, resultando em uma experiência decadente.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 12,
		name: 'Hoppy Wheat Beer',
		description:
			'Passeie por um campo de lúpulos com nossa Hoppy Wheat Beer. A base suave de trigo maltado é a tela perfeita para uma explosão de aromas lupulados. Feche os olhos e sinta-se imerso em uma plantação de lúpulos, onde cada gole é uma celebração de frescor e vitalidade.',
		imageUrl: '',
		abv: 5.5,
		ibu: 40,
		ebc: 10,
		category: 'Wheat Beer',
		foodPairing: ['Salada de camarão', 'Tacos de peixe', 'Cheesecake de limão.'],
		brewersTips:
			'O uso de trigo maltado proporciona uma base suave e cremosa, enquanto os lúpulos de aroma cítrico e o dry hopping contribuem para uma explosão de aromas lupulados nesta cerveja de trigo lupulado.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 13,
		name: 'Barleywine Envelhecida em Barril de Carvalho',
		description:
			'Entre em uma sala de barris de carvalho com nossa Barleywine envelhecida. Cada gole é uma jornada pelo tempo, com as notas de baunilha e carvalho dançando no paladar. Feche os olhos e imagine-se entre barris envelhecidos, onde a maturação prolongada eleva esta cerveja a uma obra-prima de complexidade e suavidade.',
		imageUrl: '',
		abv: 11,
		ibu: 50,
		ebc: 25,
		category: 'Barleywine',
		foodPairing: ['Queijo gorgonzola', 'Filé mignon grelhado', 'Torta de nozes.'],
		brewersTips:
			'A maturação prolongada em barris de carvalho confere a esta Barleywine notas de baunilha e carvalho, adicionando complexidade aos sabores maltados e ao alto teor alcoólico.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	{
		id: 14,
		name: 'Belgian Dubbel de Cereja',
		description:
			'Delicie-se em um pomar de cerejeiras com nossa Belgian Dubbel de Cereja. A adição de purê de cereja durante a fermentação secundária proporciona uma explosão de sabores frutados. Feche os olhos e sinta-se envolvido pelo aroma suave da lavanda, enquanto cada gole é uma jornada pela beleza dos campos floridos.',
		imageUrl: '',
		abv: 7.5,
		ibu: 28,
		ebc: 20,
		category: 'Dubbel',
		foodPairing: ['Costeletas de cordeiro', '!ueijo brie', 'Sorvete de cereja.'],
		brewersTips:
			'A adição de purê de cereja durante a fermentação secundária intensifica as características frutadas desta Dubbel belga, equilibrando-se com os ésteres da levedura.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 15,
		name: 'Porter Defumada com Chipotle',
		description:
			'Explore uma fogueira defumada com nossa Porter Defumada com Chipotle. Os maltes defumados e a pimenta chipotle adicionada durante a fervura criam um espetáculo de sabores defumados e picantes. Feche os olhos e imagine-se junto a uma fogueira, onde a ousadia desta cerveja desperta seus sentidos.',
		imageUrl: '',
		abv: 6.8,
		ibu: 35,
		ebc: 25,
		category: 'Porter',
		foodPairing: ['Churrasco de porco', 'Queijo defumado', 'Brownie de pimenta.'],
		brewersTips:
			'A combinação de maltes defumados e a adição de pimenta chipotle seca durante a fervura criam uma Porter defumada com um toque picante, proporcionando uma experiência única e ousada.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 16,
		name: 'Fruit Punch Gose',
		description:
			'Mergulhe em um paraíso tropical com nossa Fruit Punch Gose. A adição de purês de frutas tropicais durante a fermentação proporciona uma explosão de frescor. Feche os olhos e imagine-se em uma ilha paradisíaca, onde cada gole é como um soco de frutas refrescante, equilibrado pelo toque salgado.',
		imageUrl: '',
		abv: 4.7,
		ibu: 15,
		ebc: 5,
		category: 'Gose',
		foodPairing: ['Ceviche de manga', 'Salada de frutas', 'Tarte de maracujá.'],
		brewersTips:
			'A adição de purês de frutas tropicais durante a fermentação resulta em uma mistura exótica, simulando um soco de frutas refrescante. A presença do sal marinho contribui para um perfil equilibrado.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 17,
		name: 'Blonde Ale com Lavanda',

		description:
			'Passeie por campos de lavanda com nossa Blonde Ale com Lavanda. A infusão de flores de lavanda secas durante a fervura cria uma experiência floral delicada. Feche os olhos e sinta-se envolvido pelo aroma suave da lavanda, enquanto cada gole é uma jornada pela beleza dos campos floridos.',
		imageUrl: '',
		abv: 5.2,
		ibu: 18,
		ebc: 8,
		category: 'Blonde Ale',
		foodPairing: ['Salada de frango grelhado', 'Queijo de cabra', 'Sorvete de lavanda.'],
		brewersTips:
			'A infusão de flores de lavanda secas durante a fervura cria uma Blonde Ale leve e floral. A leveza dos maltes é complementada pela delicadeza da lavanda.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},

	{
		id: 18,
		name: 'Red Rye IPA',
		description:
			'Percorra uma plantação de centeio com nossa Red Rye IPA. A combinação de maltes de centeio e lúpulos cítricos proporciona uma experiência única. Feche os olhos e imagine-se entre campos de centeio balançando ao vento, enquanto cada gole é uma celebração de picância e sabor.',
		imageUrl: '',
		abv: 6.3,
		ibu: 40,
		ebc: 15,
		category: 'India Pale Ale (IPA)',
		foodPairing: ['Tacos de carne assada', 'Queijo cheddar envelhecido', 'Brownie de nozes.'],
		brewersTips:
			'A combinação de maltes de centeio e lúpulos cítricos confere a esta IPA vermelha um perfil maltado e picante, destacando-se entre as IPAs tradicionais.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 19,
		name: 'Weizenbock de Banana e Canela',
		description:
			'Viaje para um mercado de especiarias com nossa Weizenbock de Banana e Canela. A cepa de levedura de trigo desenvolve intensos ésteres de banana, enquanto a canela adiciona um toque de especiaria. Feche os olhos e sinta-se imerso em um mercado exótico, onde cada gole é uma experiência sensorial repleta de sabores tropicais.',
		imageUrl: '',
		abv: 7,
		ibu: 25,
		ebc: 18,
		category: 'Weizenbock',
		foodPairing: ['Schnitzel de porco', 'Queijo suíço', 'Bolo de banana.'],
		brewersTips:
			'A utilização de uma cepa de levedura de trigo desenvolve intensos ésteres de banana, enquanto a adição de canela durante a fermentação proporciona um toque de especiaria a esta Weizenbock robusta.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: 20,
		name: 'Sour Ale de Morango e Manjericão',
		description:
			'Explore um jardim de morangos com nossa Sour Ale de Morango e Manjericão. A adição de morangos frescos e manjericão durante a fermentação proporciona uma mistura refrescante e ácida. Feche os olhos e imagine-se entre canteiros de morangos maduros, enquanto cada gole é uma explosão de frescor e sofisticação.',
		imageUrl: '',
		abv: 5.5,
		ibu: 12,
		ebc: 6,
		category: 'Sour Ale',
		foodPairing: ['Salada de morango', 'Ceviche de camarão', 'Sorvete de limão'],
		brewersTips:
			'A adição de morangos frescos e manjericão durante a fermentação secundária cria uma Sour Ale refrescante e ácida, onde a combinação de frutas e ervas resulta em um perfil único e equilibrado.',
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]
