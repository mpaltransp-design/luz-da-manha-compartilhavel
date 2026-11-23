import { photos, type PhotoKey } from "./photos";

export type CategoryId =
  | "bom-dia"
  | "versiculos"
  | "bencaos"
  | "paz"
  | "gratidao"
  | "boa-noite"
  | "conforto"
  | "aniversario"
  | "protecao"
  | "familia"
  | "cura"
  | "amizade"
  | "semana"
  | "trabalho";

export type Category = {
  id: CategoryId;
  label: string;
  /** Detail-screen heading, e.g. "Mensagem de Fé". */
  heading: string;
  /** "Mais sobre …" carousel title. */
  related: string;
  vip: boolean;
};

export const categories: Category[] = [
  { id: "bom-dia", label: "Bom Dia", heading: "Mensagem de Bom Dia", related: "Mais mensagens de Bom Dia", vip: false },
  { id: "versiculos", label: "Versículos", heading: "Mensagem de Fé", related: "Mais sobre Gratidão e Confiança", vip: false },
  { id: "bencaos", label: "Bênçãos", heading: "Mensagem de Bênção", related: "Mais Bênçãos para enviar", vip: false },
  { id: "paz", label: "Paz", heading: "Mensagem de Paz", related: "Mais sobre Paz e Descanso", vip: false },
  { id: "gratidao", label: "Gratidão", heading: "Mensagem de Gratidão", related: "Mais sobre Gratidão e Confiança", vip: false },
  { id: "boa-noite", label: "Boa Noite", heading: "Mensagem de Boa Noite", related: "Mais mensagens de Boa Noite", vip: false },
  { id: "conforto", label: "Conforto & Luto", heading: "Mensagem de Conforto", related: "Mais palavras de Conforto", vip: true },
  { id: "aniversario", label: "Aniversário", heading: "Mensagem de Aniversário", related: "Mais mensagens de Aniversário", vip: true },
  { id: "protecao", label: "Proteção & Livramento", heading: "Mensagem de Proteção", related: "Mais sobre Proteção e Livramento", vip: true },
  { id: "familia", label: "Família & Filhos", heading: "Oração pela Família", related: "Mais orações pela Família", vip: true },
  { id: "cura", label: "Cura, Saúde & Força", heading: "Oração por Cura", related: "Mais orações por Saúde e Força", vip: true },
  { id: "amizade", label: "Amizade & Irmãos na Fé", heading: "Mensagem de Amizade", related: "Mais mensagens para Amigos", vip: true },
  { id: "semana", label: "Dias da Semana", heading: "Mensagem do Dia", related: "Mais mensagens da Semana", vip: true },
  { id: "trabalho", label: "Trabalho & Provisão", heading: "Oração pelo Trabalho", related: "Mais sobre Trabalho e Provisão", vip: true },
];

/** Chips on the home screen, in order. "todas" shows everything. */
export const homeChips: Array<CategoryId | "todas"> = [
  "todas",
  "bom-dia",
  "versiculos",
  "bencaos",
  "paz",
  "protecao",
  "familia",
  "cura",
  "trabalho",
  "amizade",
  "semana",
  "conforto",
];

export type Message = {
  id: string;
  title: string;
  category: CategoryId;
  verse: string;
  reference: string;
  caption: string;
  photo: PhotoKey;
  baseShares: number;
  related?: string[];
};

export const messages: Message[] = [
  { id: "misericordias-cada-manha", title: "Renovado a cada manhã", category: "versiculos", verse: "As misericórdias do Senhor são a causa de não sermos consumidos; elas se renovam a cada manhã.", reference: "Lamentações 3:22", caption: "Bom dia! ☀️ Hoje Deus te dá um novo começo, cheinho de misericórdia. Respire fundo, sorria e siga em frente. Você é muito amado(a)! 🌸", photo: "beach", baseShares: 3120 },
  { id: "caminhe-com-fe", title: "Caminhe com fé", category: "bom-dia", verse: "Porque andamos por fé, e não por vista.", reference: "2 Coríntios 5:7", caption: "Bom dia! 🌅 Mesmo sem enxergar o caminho todo, dê o primeiro passo com fé. Deus vai na frente abrindo portas. Tenha um dia lindo! 🙏", photo: "walkway", baseShares: 1874 },
  { id: "paz-no-coracao", title: "Paz no coração", category: "paz", verse: "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá.", reference: "João 14:27", caption: "Que a paz de Jesus encha o seu coração hoje 🕊️ Nada de aflição: Ele está no controle. Fica com Deus! 💛", photo: "autumn", baseShares: 1652 },
  { id: "deus-te-abencoe", title: "Deus te abençoe", category: "bencaos", verse: "O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti.", reference: "Números 6:24-25", caption: "Passando para deixar uma bênção pra você 🙌 Que o Senhor te guarde hoje e sempre, você e toda a sua família. Bom dia! 🌻", photo: "vehicle", baseShares: 2210 },
  { id: "um-novo-comeco", title: "Um novo começo", category: "bom-dia", verse: "Eis que faço uma coisa nova; agora sairá à luz.", reference: "Isaías 43:19", caption: "Bom dia! ✨ Hoje é dia de recomeçar. Deus está fazendo algo novo na sua vida. Acredite! 🌼", photo: "road", baseShares: 1433 },
  { id: "entrega-o-teu-caminho", title: "Entrega teu caminho", category: "versiculos", verse: "Entrega o teu caminho ao Senhor; confia nele, e o mais Ele fará", reference: "Salmos 37:5", caption: "Bom dia, minha querida! 🌸 Que neste novo dia você entregue cada passo nas mãos de Deus. Confie, Ele cuida de tudo com amor. Um abraço apertado e uma manhã abençoada! ☀️", photo: "hills", baseShares: 2348, related: ["caminho-seguro", "grata-pelo-hoje", "louvor-da-manha"] },
  { id: "caminho-seguro", title: "Caminho seguro", category: "versiculos", verse: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.", reference: "Salmos 119:105", caption: "Que a Palavra de Deus ilumine cada passo seu hoje 🕯️ Com Ele, o caminho é sempre seguro. Bom dia, querida! 🌸", photo: "lantern", baseShares: 987 },
  { id: "grata-pelo-hoje", title: "Grata pelo hoje", category: "gratidao", verse: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.", reference: "Salmos 118:24", caption: "Bom dia! 💛 Hoje eu só quero agradecer: pela vida, pela família e por ter você por perto. Que seu dia seja cheio de alegria! ☀️", photo: "golden", baseShares: 1290 },
  { id: "louvor-da-manha", title: "Louvor da manhã", category: "gratidao", verse: "Tudo quanto tem fôlego louve ao Senhor. Louvai ao Senhor!", reference: "Salmos 150:6", caption: "Comece o dia louvando! 🙌 Enquanto houver fôlego, há motivo para agradecer. Bom dia e muitas bênçãos! 🌅", photo: "praise", baseShares: 1105 },
  { id: "o-senhor-e-meu-pastor", title: "Nada me faltará", category: "versiculos", verse: "O Senhor é o meu pastor, nada me faltará.", reference: "Salmos 23:1", caption: "Bom dia! 🐑 Pode descansar: o Bom Pastor cuida de você e nada vai faltar. Um dia abençoado pra você! 💛", photo: "bible", baseShares: 4021 },
  { id: "flores-de-bom-dia", title: "Flores pra você", category: "bom-dia", verse: "Ele fez tudo formoso em seu tempo.", reference: "Eclesiastes 3:11", caption: "Bom dia, flor! 🌹 Te mandando essas rosas pra lembrar que Deus faz tudo lindo no tempo certo. Tenha uma manhã maravilhosa! ✨", photo: "roses", baseShares: 2760 },
  { id: "sol-da-justica", title: "Luz da manhã", category: "bom-dia", verse: "Mas para vós, que temeis o meu nome, nascerá o sol da justiça, trazendo salvação debaixo das suas asas.", reference: "Malaquias 4:2", caption: "O sol nasceu e com ele novas bênçãos pra sua vida ☀️ Bom dia com muito carinho! 🌻", photo: "wheat", baseShares: 1544 },
  { id: "cafe-com-deus", title: "Café com Deus", category: "bom-dia", verse: "Pela manhã ouvirás a minha voz, ó Senhor; pela manhã apresentarei a ti a minha oração.", reference: "Salmos 5:3", caption: "Bom dia! ☕ Antes do café, uma conversa com Deus. Que seu dia comece em oração e termine em gratidão 🙏", photo: "coffee", baseShares: 1987 },
  { id: "forca-para-hoje", title: "Força para hoje", category: "versiculos", verse: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13", caption: "Bom dia, guerreira! 💪 Você não está sozinha: Deus é a sua força. Hoje vai dar tudo certo! 🌸", photo: "mountain", baseShares: 3410 },
  { id: "nao-temas", title: "Não temas", category: "versiculos", verse: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", reference: "Isaías 41:10", caption: "Se o coração apertar hoje, lembre: Deus está com você 🤍 Nada de medo! Bom dia e um abraço carinhoso 🌷", photo: "lake", baseShares: 2875 },
  { id: "bencao-do-alto", title: "Bênção do alto", category: "bencaos", verse: "Toda a boa dádiva e todo o dom perfeito vem do alto, descendo do Pai das luzes.", reference: "Tiago 1:17", caption: "Que hoje chovam bênçãos do céu sobre a sua casa 🌧️✨ Deus te abençoe grandemente! Bom dia! 💛", photo: "meadow", baseShares: 1322 },
  { id: "familia-abencoada", title: "Família abençoada", category: "bencaos", verse: "Eu e a minha casa serviremos ao Senhor.", reference: "Josué 24:15", caption: "Bom dia, família! 🏡 Que Deus abençoe cada um de nós hoje, nos guarde e nos mantenha unidos no amor. Amo vocês! ❤️", photo: "home", baseShares: 2654 },
  { id: "bencao-sem-medida", title: "Bênção sem medida", category: "bencaos", verse: "O Senhor te dará abundância de bens… abrirá o seu bom tesouro, o céu.", reference: "Deuteronômio 28:11-12", caption: "Que Deus abra as janelas do céu sobre a sua vida hoje 🙌 Saúde, paz e muito amor pra você! 🌻", photo: "orchard", baseShares: 1188 },
  { id: "descanso-da-alma", title: "Descanso da alma", category: "paz", verse: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", reference: "Mateus 11:28", caption: "Se você está cansada, entregue tudo a Jesus 🤍 Ele dá descanso de verdade. Fica em paz! 🕊️", photo: "hammock", baseShares: 1876 },
  { id: "aguas-tranquilas", title: "Águas tranquilas", category: "paz", verse: "Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.", reference: "Salmos 23:2", caption: "Que o seu dia seja calmo como águas tranquilas 🌊 Deus guia você com carinho. Bom dia! 🌸", photo: "stream", baseShares: 1043 },
  { id: "paz-que-excede", title: "Paz que excede", category: "paz", verse: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.", reference: "Filipenses 4:7", caption: "Te desejo a paz que só Deus pode dar 🕊️ Que ela guarde seu coração hoje. Um abraço! 💛", photo: "lavender", baseShares: 1399 },
  { id: "obrigada-senhor", title: "Obrigada, Senhor", category: "gratidao", verse: "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reference: "1 Tessalonicenses 5:18", caption: "Hoje eu acordei agradecida 🙏 Por mais um dia, pela saúde e por pessoas especiais como você. Bom dia! ☀️", photo: "sunflowers", baseShares: 1567 },
  { id: "bondade-do-senhor", title: "Ele é bom", category: "gratidao", verse: "Louvai ao Senhor, porque ele é bom; porque a sua benignidade dura para sempre.", reference: "Salmos 136:1", caption: "Deus é bom o tempo todo! 💛 Que hoje você perceba o cuidado Dele em cada detalhe. Bom dia! 🌼", photo: "peonies", baseShares: 932 },
  { id: "boa-noite-em-paz", title: "Durma em paz", category: "boa-noite", verse: "Em paz também me deitarei e dormirei, porque só tu, Senhor, me fazes habitar em segurança.", reference: "Salmos 4:8", caption: "Boa noite! 🌙 Descanse em paz, Deus cuida de você enquanto dorme. Até amanhã, com carinho ✨", photo: "moon", baseShares: 2101 },
  { id: "boa-noite-guarda", title: "Ele te guarda", category: "boa-noite", verse: "Eis que não tosquenejará nem dormirá o guarda de Israel.", reference: "Salmos 121:4", caption: "Boa noite, querida! 🌙 Pode dormir tranquila: quem te guarda não dorme. Bons sonhos 💤🙏", photo: "window", baseShares: 1210 },
  { id: "boa-noite-gratidao", title: "Gratidão pelo dia", category: "boa-noite", verse: "Bom é louvar ao Senhor… e anunciar de manhã a tua benignidade, e todas as noites a tua fidelidade.", reference: "Salmos 92:1-2", caption: "Mais um dia vencido com a graça de Deus 🌙 Boa noite e um descanso abençoado pra você e sua família 💛", photo: "candle", baseShares: 876 },
  { id: "conforto-choro", title: "Ele enxuga as lágrimas", category: "conforto", verse: "E Deus limpará de seus olhos toda a lágrima; e não haverá mais morte, nem pranto, nem clamor, nem dor.", reference: "Apocalipse 21:4", caption: "Estou orando por você 🤍 Que Deus console seu coração neste momento tão difícil. Conte comigo sempre. 🕊️", photo: "whiterose", baseShares: 1543 },
  { id: "conforto-perto", title: "Perto de você", category: "conforto", verse: "Perto está o Senhor dos que têm o coração quebrantado.", reference: "Salmos 34:18", caption: "Mesmo na dor, você não está só 🤍 Deus está pertinho, segurando a sua mão. Meus sentimentos e um abraço apertado. 🕯️", photo: "bench", baseShares: 1120 },
  { id: "conforto-bem-aventurados", title: "Consolo do céu", category: "conforto", verse: "Bem-aventurados os que choram, porque eles serão consolados.", reference: "Mateus 5:4", caption: "Que o consolo de Deus chegue até você hoje 🕊️ Estou aqui, orando pela sua família. Com muito carinho. 🤍", photo: "doves", baseShares: 987 },
  { id: "conforto-ressurreicao", title: "Esperança eterna", category: "conforto", verse: "Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.", reference: "João 11:25", caption: "Nossa esperança está em Cristo 🤍 Que essa certeza traga paz ao seu coração. Meus sinceros sentimentos. 🕯️", photo: "lilies", baseShares: 812 },
  { id: "aniversario-dias", title: "Feliz aniversário", category: "aniversario", verse: "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios.", reference: "Salmos 90:12", caption: "Feliz aniversário! 🎉🎂 Que Deus te dê muitos anos de vida, saúde e alegria. Você é uma bênção! 💛", photo: "bouquet", baseShares: 2433 },
  { id: "aniversario-planos", title: "Planos de Deus", category: "aniversario", verse: "Porque eu bem sei os pensamentos que tenho a vosso respeito… pensamentos de paz, e não de mal, para vos dar o fim que esperais.", reference: "Jeremias 29:11", caption: "Parabéns, querida! 🎈 Que este novo ano seja cheio dos planos lindos de Deus pra sua vida. Muitas felicidades! 🌸", photo: "cake", baseShares: 1765 },
  { id: "sob-suas-asas", title: "Sob as suas asas", category: "protecao", verse: "Ele te cobrirá com as suas penas, e debaixo das suas asas estarás seguro; a sua verdade será o teu escudo.", reference: "Salmos 91:4", caption: "Bom dia! 🕊️ Que hoje Deus cubra você e toda a sua casa debaixo das asas Dele. Nenhum mal vai te alcançar. Fica guardada! 🙏", photo: "shelter", baseShares: 1820 },
  { id: "guarda-entrada-saida", title: "Ele guarda seus passos", category: "protecao", verse: "O Senhor guardará a tua entrada e a tua saída, desde agora e para sempre.", reference: "Salmos 121:8", caption: "Onde você for hoje, Deus vai junto 🌿 Que Ele guarde sua saída e sua volta pra casa. Um dia protegido e abençoado! 💛", photo: "gate", baseShares: 1460 },
  { id: "nenhuma-arma-prosperara", title: "Nenhuma arma prosperará", category: "protecao", verse: "Nenhuma arma forjada contra ti prosperará.", reference: "Isaías 54:17", caption: "Declaro sobre a sua vida: nenhuma arma forjada contra você vai prosperar! 🛡️ Deus é o seu farol e a sua defesa. Bom dia! ✨", photo: "lighthouse", baseShares: 2034 },
  { id: "filhos-heranca", title: "Filhos, herança do Senhor", category: "familia", verse: "Eis que os filhos são herança do Senhor, e o fruto do ventre o seu galardão.", reference: "Salmos 127:3", caption: "Hoje entrego nossos filhos e netos nas mãos de Deus 🙏 Que Ele guarde cada um, onde quer que estejam. Família é presente do céu! 💛", photo: "hands", baseShares: 1688 },
  { id: "casa-sobre-a-rocha", title: "Casa sobre a rocha", category: "familia", verse: "Se o Senhor não edificar a casa, em vão trabalham os que a edificam.", reference: "Salmos 127:1", caption: "Que Deus seja o alicerce da nossa casa 🏡 Com Ele, nossa família fica firme em qualquer tempestade. Bom dia, família! ❤️", photo: "family", baseShares: 1342 },
  { id: "amor-que-une", title: "O amor que une", category: "familia", verse: "E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição.", reference: "Colossenses 3:14", caption: "Que não falte amor, paciência e abraço na nossa família 🤗 Deus abençoe nossa mesa e nosso lar hoje e sempre! 🌻", photo: "table", baseShares: 1215 },
  { id: "filhos-guardados", title: "Filhos guardados por Deus", category: "familia", verse: "Todos os teus filhos serão ensinados pelo Senhor; e a paz de teus filhos será abundante.", reference: "Isaías 54:13", caption: "Hoje cubro meus filhos e netos em oração 🙏 Que o Senhor os ensine, os guarde e encha a vida deles de paz. Família é bênção! 💛", photo: "grandhands", baseShares: 1534 },
  { id: "oracao-pelo-lar", title: "Bênção sobre o lar", category: "familia", verse: "Paz seja nesta casa.", reference: "Lucas 10:5", caption: "Bom dia, família! 🏡 Que nunca falte paz, pão e abraço na nossa casa. Deus abençoe cada cantinho do nosso lar! 🌸", photo: "porch", baseShares: 1176 },
  { id: "aniversario-bencao", title: "Bênçãos no seu dia", category: "aniversario", verse: "O Senhor te abençoe e te guarde.", reference: "Números 6:24", caption: "Feliz aniversário! 🎁🌹 Que Deus derrame sobre você saúde, paz e muita alegria neste novo ano de vida. Você merece o melhor! 💛", photo: "gift", baseShares: 1890 },
  { id: "aniversario-alegria", title: "Ano de alegria", category: "aniversario", verse: "Coroas o ano com a tua bondade, e as tuas veredas destilam fartura.", reference: "Salmos 65:11", caption: "Parabéns! 🎈✨ Que Deus coroe seu novo ano com bondade e fartura. Muitas felicidades e um dia lindo! 🌼", photo: "balloons", baseShares: 1422 },
  { id: "conforto-saudade", title: "Consolo na saudade", category: "conforto", verse: "Ele sara os quebrantados de coração, e lhes ata as suas feridas.", reference: "Salmos 147:3", caption: "Sei que a saudade aperta 🤍 Que Deus cuide do seu coração e transforme a dor em lembranças de amor. Estou com você. 🕊️", photo: "feather", baseShares: 1064 },
  { id: "conforto-refugio", title: "Refúgio e fortaleza", category: "conforto", verse: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", reference: "Salmos 46:1", caption: "Nos dias difíceis, Deus é o nosso refúgio 🌅 Que Ele te dê forças e esperança. Um abraço carinhoso. 🤍", photo: "sunrays", baseShares: 948 },
  {"id": "forca-ao-cansado", "title": "Força para o cansado", "category": "cura", "verse": "Dá força ao cansado e multiplica as forças ao que não tem nenhum vigor.", "reference": "Isaías 40:29", "caption": "Bom dia! 🌱 Se hoje o cansaço apertar, lembre: Deus renova as suas forças. Ele te sustenta em cada passo! 💛", "photo": "sprout", "baseShares": 1388},
  {"id": "cura-me-senhor", "title": "Cura-me, Senhor", "category": "cura", "verse": "Cura-me, Senhor, e serei curado; salva-me, e serei salvo; porque tu és o meu louvor.", "reference": "Jeremias 17:14", "caption": "Hoje oro pela sua saúde 🌷 Que o Senhor toque seu corpo e seu coração, trazendo cura, alívio e paz. Fica bem! 🙏", "photo": "tulips", "baseShares": 1611},
  {"id": "bendize-minha-alma", "title": "Bendize, ó minha alma", "category": "cura", "verse": "Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios. É ele que perdoa todas as tuas iniquidades, que sara todas as tuas enfermidades.", "reference": "Salmos 103:2-3", "caption": "Bom dia! 🌼 Agradeço a Deus pela saúde de cada dia e peço que Ele sare todas as suas enfermidades. Deus cuida de você! 💛", "photo": "chamomile", "baseShares": 1274},
  {"id": "clamei-e-me-saraste", "title": "Clamei e me saraste", "category": "cura", "verse": "Senhor, meu Deus, clamei a ti, e tu me saraste.", "reference": "Salmos 30:2", "caption": "Deus ouve o seu clamor 💧 Que Ele renove sua saúde como água fresca na alma. Força e fé hoje e sempre! 🙏", "photo": "springwater", "baseShares": 1157},
  {"id": "anjo-acampa-ao-redor", "title": "O anjo acampa ao redor", "category": "protecao", "verse": "O anjo do Senhor acampa-se ao redor dos que o temem, e os livra.", "reference": "Salmos 34:7", "caption": "Bom dia! 🫒 Os anjos do Senhor estão acampados ao redor da sua casa. Pode sair em paz, você está guardado! 🙏", "photo": "olivetree", "baseShares": 1702},
  {"id": "amigo-em-todo-tempo", "title": "Amigo em todo tempo", "category": "amizade", "verse": "Em todo o tempo ama o amigo, e na angústia nasce o irmão.", "reference": "Provérbios 17:17", "caption": "Bom dia, amiga querida! ☕🌸 Obrigada por estar comigo nos dias bons e nos difíceis. Deus abençoe nossa amizade! 💛", "photo": "teacups", "baseShares": 1495},
  {"id": "melhor-sao-dois", "title": "Melhor são dois", "category": "amizade", "verse": "Melhor é serem dois do que um… porque se um cair, o outro levanta o seu companheiro.", "reference": "Eclesiastes 4:9-10", "caption": "Que bom caminhar com você na fé! 🌅 Quando um cai, o outro levanta. Deus abençoe nossa caminhada juntos! 🤝", "photo": "chairs", "baseShares": 1333},
  {"id": "edificai-uns-aos-outros", "title": "Edificai-vos uns aos outros", "category": "amizade", "verse": "Exortai-vos uns aos outros e edificai-vos uns aos outros, como também o fazeis.", "reference": "1 Tessalonicenses 5:11", "caption": "Passando pra te dar um abraço de fé 🧺🌼 Você é bênção na minha vida. Vamos seguir firmes, juntos em Cristo! 💛", "photo": "basket", "baseShares": 1188},
  {"id": "perfume-da-amizade", "title": "O perfume da amizade", "category": "amizade", "verse": "O óleo e o perfume alegram o coração; assim o faz a doçura do amigo com o seu conselho cordial.", "reference": "Provérbios 27:9", "caption": "Sua amizade é perfume na minha vida 🌹 Obrigada pelos conselhos e pelo carinho. Deus te abençoe muito hoje! ✨", "photo": "perfume", "baseShares": 1067},
  {"id": "segunda-de-vitorias", "title": "Segunda-feira de vitórias", "category": "semana", "verse": "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.", "reference": "Salmos 118:24", "caption": "Bom dia e boa segunda-feira! ☀️ Que esta semana comece com Deus no comando e termine com muitas vitórias! 🙌", "photo": "rooftops", "baseShares": 1890},
  {"id": "quarta-de-descanso", "title": "Quarta-feira de renovo", "category": "semana", "verse": "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.", "reference": "Mateus 11:28", "caption": "Boa quarta-feira! 🌿 Metade da semana já passou. Respire fundo, descanse em Deus e siga com fé! 💛", "photo": "fern", "baseShares": 1244},
  {"id": "sexta-de-gratidao", "title": "Sexta-feira de gratidão", "category": "semana", "verse": "Louvai ao Senhor, porque ele é bom, porque a sua benignidade dura para sempre.", "reference": "Salmos 107:1", "caption": "Sextou com gratidão! 🍇🍊 Obrigada, Senhor, por cada bênção desta semana. Boa sexta-feira e ótimo fim de semana! 🙏", "photo": "fruits", "baseShares": 1532},
  {"id": "domingo-na-casa-do-senhor", "title": "Domingo na casa do Senhor", "category": "semana", "verse": "Alegrei-me quando me disseram: Vamos à casa do Senhor.", "reference": "Salmos 122:1", "caption": "Feliz domingo! ⛪🌸 Que hoje a sua casa se encha da presença de Deus e o seu coração de paz. Bom domingo, família! 💛", "photo": "chapel", "baseShares": 1416},
  {"id": "deus-supre-tudo", "title": "Deus supre tudo", "category": "trabalho", "verse": "O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.", "reference": "Filipenses 4:19", "caption": "Bom dia! 🌾 Não se preocupe: Deus vai suprir cada necessidade da sua casa. Ele é fiel e nunca falha! 🙏", "photo": "haybales", "baseShares": 1777},
  {"id": "confia-ao-senhor-tuas-obras", "title": "Confia ao Senhor tuas obras", "category": "trabalho", "verse": "Confia ao Senhor as tuas obras, e os teus planos serão estabelecidos.", "reference": "Provérbios 16:3", "caption": "Bom dia e bom trabalho! 📖☕ Entregue seus planos a Deus hoje, e Ele vai firmar cada passo seu! 💛", "photo": "desk", "baseShares": 1299},
  {"id": "obra-das-nossas-maos", "title": "A obra das nossas mãos", "category": "trabalho", "verse": "Seja sobre nós a graça do Senhor, nosso Deus; e confirma sobre nós a obra das nossas mãos.", "reference": "Salmos 90:17", "caption": "Que Deus abençoe o trabalho das suas mãos hoje 🙌 Tudo que você fizer vai prosperar! Bom dia e bom trabalho! ✨", "photo": "pottery", "baseShares": 1163},
  {"id": "bencao-nos-celeiros", "title": "Bênção nos celeiros", "category": "trabalho", "verse": "O Senhor mandará que a bênção esteja contigo nos teus celeiros e em tudo o que puseres a tua mão.", "reference": "Deuteronômio 28:8", "caption": "Declaro bênção sobre sua casa 🍞🌾 Que nunca falte pão na mesa e que tudo o que você tocar prospere! Bom dia! 🙏", "photo": "bread", "baseShares": 1455},
];

export const categoryById = (id: CategoryId) =>
  categories.find((c) => c.id === id) ?? categories[0]!;

export const getMessage = (id: string) => messages.find((m) => m.id === id);

export const photoOf = (m: Message) => photos[m.photo];

export const isLocked = (m: Message, vip: boolean) => !vip && categoryById(m.category).vip;

/** Card do Dia: the featured message for a date, rotating through free verses. */
export function messageOfTheDay(date: Date): Message {
  const pool = messages.filter((m) => !categoryById(m.category).vip && (m.category === "versiculos" || m.category === "bom-dia"));
  const start = new Date(2026, 10, 23).getTime();
  const day = Math.floor((date.getTime() - start) / 86_400_000);
  const idx = ((day % pool.length) + pool.length) % pool.length;
  return pool[idx]!;
}

export function filterMessages(chip: CategoryId | "todas"): Message[] {
  return chip === "todas" ? messages : messages.filter((m) => m.category === chip);
}

export function relatedMessages(m: Message, limit = 6): Message[] {
  const picked = (m.related ?? []).map(getMessage).filter((x): x is Message => !!x);
  const same = messages.filter((x) => x.id !== m.id && x.category === m.category);
  const others = messages.filter((x) => x.id !== m.id && x.category !== m.category && !categoryById(x.category).vip);
  const rest = [...same, ...others].filter((x) => !picked.includes(x));
  return [...picked, ...rest].slice(0, limit);
}

/** Full text that goes to WhatsApp: caption, verse and reference. */
export function shareText(m: Message): string {
  return `${m.caption}\n\n“${m.verse}”\n— ${m.reference}`;
}
