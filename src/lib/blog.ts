export type BlogPost = { slug: string; category: string; title: string; excerpt: string; body: { heading?: string; paragraphs: string[] }[] };

export const posts: BlogPost[] = [
  {
    slug: "helioterapia-poder-curativo-do-sol", category: "SOL CONSCIENTE", title: "Helioterapia: o poder curativo do sol", excerpt: "Como aproveitar a luz solar com equilíbrio para cuidar da saúde e do bem-estar.",
    body: [
      { paragraphs: ["A helioterapia, ou terapia solar, é uma prática milenar que utiliza a exposição controlada à luz do sol. Gregos, egípcios e romanos já reconheciam seus efeitos sobre a saúde física e mental."] },
      { heading: "O que é helioterapia?", paragraphs: ["A exposição solar moderada estimula a produção de vitamina D, ajuda a regular o humor e participa do funcionamento do sistema imunológico. O cuidado está na dose: períodos curtos e horários de menor intensidade são fundamentais."] },
      { heading: "Uma prática segura", paragraphs: ["Comece com pequenas doses, mantenha a hidratação e proteja as áreas sensíveis. A luz solar pode ser uma aliada, mas exposição excessiva causa queimaduras e danos à pele. Procure orientação médica para qualquer uso terapêutico."] },
    ],
  },
  {
    slug: "protetor-solar-ciencia-e-controversias", category: "PELE", title: "Protetor solar: ciência e controvérsias", excerpt: "Filtros físicos, filtros químicos e o que considerar para uma escolha consciente.",
    body: [
      { paragraphs: ["O protetor solar reduz os danos provocados pela radiação UVA e UVB. Enquanto filtros minerais refletem a radiação, filtros químicos a absorvem e transformam em calor."] },
      { heading: "Proteção sem falsa segurança", paragraphs: ["O consenso dermatológico recomenda protetor solar junto de sombra, roupas e menor exposição nos horários de pico. Nenhum produto substitui uma rotina responsável, e a reaplicação correta continua essencial."] },
      { heading: "Escolhas conscientes", paragraphs: ["Quem busca fórmulas minerais pode procurar óxido de zinco ou dióxido de titânio. Para necessidades específicas, crianças ou gestantes, a orientação de um dermatologista é indispensável."] },
    ],
  },
  {
    slug: "melanina-vitamina-d-alimentacao", category: "BEM-ESTAR", title: "Melanina, vitamina D e alimentação", excerpt: "O papel do sol, da hidratação e dos alimentos na saúde e na aparência da pele.",
    body: [
      { paragraphs: ["A melanina dá cor à pele, ao cabelo e aos olhos e funciona como parte da defesa natural contra a radiação ultravioleta. Sua quantidade é principalmente genética, mas a exposição solar estimula sua produção."] },
      { heading: "De dentro para fora", paragraphs: ["Alimentos ricos em betacaroteno, como cenoura, abóbora e batata-doce, além de fontes de tirosina, antioxidantes e vitamina D, contribuem para uma rotina equilibrada."] },
      { heading: "Equilíbrio diário", paragraphs: ["Exposição controlada, hidratação e alimentação variada apoiam a saúde da pele. Suplementos só devem ser usados com avaliação profissional."] },
    ],
  },
  {
    slug: "cosmeticos-naturais-e-veganos", category: "FÓRMULA", title: "Cosméticos naturais e veganos", excerpt: "Uma escolha que conecta cuidado com a pele, ética e menor impacto ambiental.",
    body: [
      { paragraphs: ["Cosméticos naturais usam ingredientes de origem vegetal e evitam substâncias sintéticas desnecessárias. Fórmulas veganas excluem ingredientes de origem animal e se alinham a escolhas de consumo mais conscientes."] },
      { heading: "Gentileza com a pele", paragraphs: ["Óleos vegetais e extratos botânicos podem nutrir e hidratar com fórmulas mais simples. Ainda assim, natural não significa livre de alergias: faça teste de contato e respeite as necessidades da sua pele."] },
      { heading: "Ética e ambiente", paragraphs: ["Produtos cruelty free e embalagens com menor impacto ajudam a ampliar o cuidado para além do corpo, incluindo animais e ecossistemas."] },
    ],
  },
  {
    slug: "bronzeado-beleza-autoestima", category: "CULTURA SOLAR", title: "Bronzeado, beleza e autoestima", excerpt: "Por que a pele dourada é associada a vitalidade, confiança e uma vida ao ar livre.",
    body: [
      { paragraphs: ["A pele dourada costuma ser associada a saúde, energia e momentos de lazer. O contraste valoriza traços, acessórios e a percepção de luminosidade da pele."] },
      { heading: "O efeito psicológico", paragraphs: ["Sentir-se bem com a própria imagem influencia postura e confiança. A luz solar também participa da regulação do humor, mas o bem-estar nunca deve depender de exposição excessiva."] },
      { heading: "Beleza com segurança", paragraphs: ["O equilíbrio é essencial: respeite o seu tipo de pele, use proteção solar e evite horários de radiação intensa. O Coco Honey Bronze é um acelerador de bronzeado e não substitui o protetor solar."] },
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);