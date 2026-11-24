# Luz Da Manha Compartilhavel

Crie o aplicativo funcional com as três telas do MVP, começando pelo fluxo de mensagens e compartilhamento no WhatsApp.

# Locked
- Visual direction: Luz da Manhã (direction_id: mensagens-do-dia/luz-da-manha). Paleta solar e acolhedora em pêssego suave, creme e dourado matinal, com tipografia calorosa e botão verde oficial do WhatsApp em alto contraste.
- Design spec rules:
  1. "Visual floral e suave com fundo claro, tipografia limpa e legível para público maduro, e botão de compartilhamento do WhatsApp com contraste verde evidente."
  2. "Direção visual adotada: Luz da Manhã. Paleta solar e acolhedora em tons de pêssego suave, creme e dourado matinal, com tipografia calorosa e botão verde oficial do WhatsApp em alto contraste."
- Tokens CSS e Paleta:
  --cream: #fdf7ef;
  --peach: #f7d9c4;
  --peach-soft: #fbe9dc;
  --gold: #c9973f;
  --ink: #3b2a22;
  --muted: #7a6457;
  --wa: #25D366;
  --wa-dark: #128C4B;
  --r-card: 28px;
  Fontes: Google Fonts 'Lora' para títulos e citações serifadas elegantes; 'Nunito Sans' para interface e textos limpos e legíveis.
- Chrome e Navegação:
  Header: Topo suave com badge 'Luz da Manhã' e ícone de sol dourado, saudação personalizada e subtítulo acolhedor.
  Tabs: Barra inferior com 4 seções: Início (home), Temas (themes), Favoritos (favorites), Perfil VIP (profile).
  Botões: Botão primário verde oficial do WhatsApp (#25D366) com 56px de altura, cantos de 16px, ícone de mensagem e texto em negrito; botão secundário de 'Copiar Legenda' em fundo branco com borda peach.
- Telas Aprovadas e Ordem de Fluxo:
  1. Tela Inicial (home): Abertura do app. Saudação 'Bom dia! Espalhe amor hoje', carrossel de chips de categorias (Todas, Bom Dia, Versículos, Bênçãos, Paz, Conforto & Luto), Card do Dia em destaque com imagem solar/floral, versículo bíblico e botão largo 'Compartilhar no WhatsApp', seguido de grid de 2 colunas com mensagens recentes prontas para envio.
  2. Detalhe da Mensagem (message-detail): Exibição em tela cheia com foto 4:5 de alta qualidade, versículo bem legível com scrim suave, barra de ações com botão de favoritar (coração funcional) e áudio de oração de 1 minuto, card com legenda completa formatada para WhatsApp e botão 'Copiar Legenda', botão principal verde 'Compartilhar no WhatsApp' e carrossel de mensagens recomendadas.
  3. Oferta VIP Vitalício (vip-offer): Selo dourado de 7 dias de garantia, headline 'Abençoe sua família todos os dias com mensagens exclusivas', card de preço 'De R$ 67 por apenas R$ 27' em pagamento único no Pix, lista de 4 benefícios destacados com ícones, depoimento com avaliação 5 estrelas e botão de conversão 'Garantir Meu Acesso por R$ 27' com selos de segurança.
- Interações Essenciais:
  * Compartilhar no WhatsApp: utiliza Web Share API (navigator.share) no celular para compartilhar imagem e texto; fallback para whatsapp://send ou link web com texto pronto e codificado.
  * Copiar Legenda: copia o texto pronto com emojis para o clipboard e exibe feedback 'Mensagem copiada!'.
  * Favoritos: persistência no localStorage para salvar e remover mensagens favoritas na aba correspondente.
  * Filtro de categorias: filtragem instantânea do catálogo de mensagens ao clicar nos chips.

# Open
- Catálogo e Conteúdo: gerar pelo menos 30 mensagens pré-carregadas completas com imagens temáticas suaves de amanhecer, flores e natureza, com versículos bíblicos reais e legendas carinhosas prontas para WhatsApp.
- Player de Áudio Devocional: player funcional simulando o áudio diário de oração de 1 minuto na tela de detalhe.
- Modo PWA: suporte para instalação na tela inicial do celular do usuário (manifest e ícone).
- Simulação de Acesso VIP: toggle ou botão para alternar entre modo Grátis (mostrando categorias bloqueadas e levando para a tela VIP) e modo VIP (liberado) para facilitar a validação de vendas.

build a real working app, not a clickable prototype; the screen and kit files show layout, content and look (a wireframe's, structure only) and are never code to copy. The screens are the moments the user designed, not the whole product. Before building, walk through each flow as its user would and design what the pictures leave out, as a product designer would for this product: the steps a flow needs to finish and how the app responds to what the user does, including the moments its users will actually run into, like waiting on something or finding nothing yet. Add nothing a user of this product would never meet, and keep an app the user wants simple, simple. Never leave a step the product's core flows need as "coming soon", unless the brief says the user chose to. Where such a step needs an outside service, build every part up to it and say in your reply what's left to connect. Fill product gaps only, never a look the design set: an added step reuses the UI kit's tokens, chrome and parts and the nearest designed screen's layout, with no new visual direction. Look at every screen's picture before writing code; design.md says which picture or sheet holds each screen. Open the UI kit's shells and parts HTML for the header, tab bar, composer and components, not only its tokens. Use each finished screen's copy exactly as design.md lists it; never invent copy for one. A wireframe under design.md's Wireframes gives structure only: build it in the design's look, as design.md says. The screens' photos are placeholders for the mockups only: replace every photo design.md lists with the user's own upload for it, else as design.md says (a photo without people re-composed with imagegen--edit_image from it as a reference, a photo of people generated from its brief and never from the photo), and ship no set photo or its URL. For a design that came with no design.md, every photo on assets.lovable.dev or images.unsplash.com is a set photo: replace it with the user's own upload for it, else a new image generated for its slot, any person in it one who doesn't exist, never from the photo or a picture showing it. Build and check each screen at the canvas it was drawn at: phone 393×764, tablet landscape 1133×744, tablet portrait 744×1133, desktop 1280×832. After building, screenshot the app at those sizes and states, compare each finished screen with its picture, and fix every visual difference you didn't choose; check a wireframe's screen against its structure, never its grey look. End your reply with "Changed from the mockups": each deliberate change and why, and "Added beyond the mockups": each step, state or interaction you built that no screen shows.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://luz-da-manha-compartilhavel.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e890e324-806c-4abe-a0a3-f4f0178c107d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
