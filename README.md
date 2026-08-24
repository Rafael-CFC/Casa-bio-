# Site — CASABIO

Site institucional da **CASABIO** — saneamento ecológico, bioconstrução e arquitetura.
Loja física em Garopaba/SC, atendimento em todo o Brasil.

Site **estático**: só HTML, CSS e JavaScript. Não precisa de build, servidor Node
nem banco de dados. É só abrir o `index.html` no navegador ou publicar a pasta.

---

## Estrutura

```
index.html        Página inicial (hero, faixa da loja, áreas de atuação, números,
                  o equipamento e seus benefícios, como funciona, loja + Instagram, contato)
servicos.html     Área de atuação detalhada: esgoto, água da chuva, bioconstrução
produtos.html     Linha de produtos: estações de tratamento e cisternas
projetos.html     Lista dos projetos de bioconstrução
projeto-chale-ecologico.html   Página do Chalé Ecológico (galeria + técnicas)
contato.html      Contato, mapa, Instagram e perguntas frequentes

assets/css/style.css   Todo o visual do site (cores, tipografia, layout)
assets/js/main.js      Menu mobile, animações, filtro de produtos, formulário
assets/img/            Fotos do equipamento
```

---

## Identidade visual

As cores seguem o site da marca: **verde-floresta profundo + âmbar**.
Estão todas no topo do `assets/css/style.css`, no bloco `:root` — mudando ali,
muda no site inteiro.

| Token | Cor | Onde aparece |
|---|---|---|
| `--verde-900` | `#062b0c` | Cabeçalho, rodapé, fundos escuros |
| `--verde-700` | `#14521e` | Botões e títulos |
| `--dourado-500` | `#eda92e` | Logo, links do menu, faixa da loja, destaques |
| `--agua-500` | `#3a7fa5` | Seções de água da chuva |
| `--terra-500` | `#b9834e` | Seções de bioconstrução |

### A logo

A marca no cabeçalho é um **SVG desenhado à mão** (pássaro sobre o círculo
âmbar), definido no HTML de cada página — busque por `class="logo__marca"`.

> ⚠️ É uma **aproximação** do pássaro original, feita a partir de uma captura de
> tela. Assim que houver o arquivo original da logo (SVG ou PNG com fundo
> transparente), o ideal é substituir: salve como `assets/img/logo.svg` e troque
> o bloco `<svg class="logo__marca">…</svg>` por
> `<img class="logo__marca" src="assets/img/logo.svg" alt="CASABIO">`
> nas cinco páginas.

---

## Como editar as coisas do dia a dia

### 1. Os números da home

Ficam na seção `<section class="secao numeros">` do `index.html`.
Cada número está no atributo `data-contador`:

```html
<div class="numero__valor"><span data-contador="70">70</span><small>+</small></div>
<p class="numero__rotulo">Sistemas executados</p>
```

Troque o valor dentro de `data-contador` **e** o número dentro do `<span>`
(o segundo é o que aparece caso o JavaScript esteja desligado).

> ⚠️ **Confirme estes valores antes de publicar.** Os quatro números são valores
> de referência colocados como ponto de partida e precisam ser substituídos
> pelos reais: sistemas executados (70), municípios atendidos (15),
> pessoas atendidas (1.200) e litros tratados por dia (85.000).

### 2. Contato, WhatsApp e Instagram

Os dados aparecem em todas as páginas. Para trocar, use "localizar e substituir"
em **todos os arquivos `.html`**:

| O que | Valor atual |
|---|---|
| WhatsApp (link) | `5548991013968` |
| WhatsApp (exibido) | `(48) 99101-3968` |
| Instagram | `casabio.construcao` |
| Facebook | `casabioconstrucao` |
| Loja | `CASAS ECO, próximo ao Komprão, no portal de entrada de Garopaba` |
| Cidade | `Garopaba / SC` |

O link do WhatsApp segue o formato `https://wa.me/55` + DDD + número, sem
espaços nem símbolos.

### 3. Fotos

Todas ficam em `assets/img/`. **Para trocar qualquer uma, basta salvar o arquivo
novo com o mesmo nome** — não precisa mexer no HTML.

| Arquivo | Onde aparece | Situação |
|---|---|---|
| `estacao-instalada.jpg` | Hero da home e página de serviços | recorte do folheto — trocar pela foto digital |
| `estacao-tratamento.jpg` | Seção do equipamento e os 4 cards de estação | recorte do folheto — trocar pela foto digital |
| `esquema-sistema.jpg` | "Como funciona na sua casa" e serviços | recorte do folheto — trocar pela foto digital |
| `casa-bioconstruida.jpg` | Galeria de bioconstrução na home | **placeholder** |
| `pergolado-bambu.jpg` | Galeria de bioconstrução na home | **placeholder** |
| `interior-terra.jpg` | Galeria de bioconstrução na home | **placeholder** |
| `chale-fachada.jpg` | Capa do Chalé (card, hero e galeria) | **placeholder** |
| `chale-sala.jpg` | Galeria do Chalé — foto grande | **placeholder** |
| `chale-quarto.jpg` | Galeria do Chalé | **placeholder** |
| `chale-circulacao.jpg` | Galeria do Chalé | **placeholder** |
| `chale-detalhe.jpg` | Galeria do Chalé | **placeholder** |

Os placeholders são imagens temporárias em verde com o texto "foto em breve".
Assim que as fotos reais entrarem com os mesmos nomes, tudo se ajusta sozinho.

Formato recomendado: JPG, lado maior de 1600px, orientação paisagem.
Se lembrar, atualize também o texto do `alt` no HTML — é o que descreve a foto
para quem usa leitor de tela e para o Google.

Os projetos de bioconstrução ainda usam ilustrações vetoriais. Para colocar
fotos reais, dentro de `<div class="projeto__capa">` substitua o `<svg>` por:

```html
<img src="assets/img/nome-da-foto.jpg" alt="Descrição da foto" loading="lazy">
```

O CSS já recorta e ajusta a imagem automaticamente.

### 4. Produtos

Em `produtos.html`, cada produto é um bloco `<article class="produto">`.
Para adicionar um novo, copie um bloco existente e ajuste:

- `data-categoria="estacoes"` ou `data-categoria="cisternas"` — controla o filtro
- `<h3>` — nome do produto
- `<p class="produto__desc">` — descrição
- `<ul class="produto__especs">` — as etiquetas de especificação
- `<p class="produto__ideal">` — para quem é indicado
- o `?text=` no link do WhatsApp — mensagem que já vem preenchida

Produtos de cisterna devem ter também a classe `produto--agua` (deixa o card azul).

### 5. Projetos

`projetos.html` lista os seis projetos: Chalé Ecológico, Casa Inspirulina,
Morada Ekoa, Vivenda Viva, Pergolado de Bambu e Ekoa Surf Camp.

O **Chalé Ecológico** já tem página própria (`projeto-chale-ecologico.html`),
com capa, ficha técnica, galeria de cinco fotos e os destaques construtivos.
Ela serve de modelo para os outros cinco: copie o arquivo, renomeie, troque
textos e nomes das fotos.

Em `projetos.html`, um projeto sem página própria é um `<article class="projeto">`
com ilustração; um projeto com página é um `<a href="..." class="projeto">` com
foto na capa. Para promover um projeto, siga o padrão do Chalé.

---

## O formulário de orçamento

O formulário **não envia e-mail** — ele monta uma mensagem e abre o WhatsApp
com os dados já preenchidos. Isso evita depender de servidor ou serviço pago.

O número de destino fica no atributo `data-form-whatsapp` da tag `<form>`.

Se um dia quiser receber por e-mail, dá para trocar por um serviço como
Formspree ou Web3Forms sem mexer no visual.

---

## Como publicar

### GitHub Pages (grátis)

1. No GitHub: **Settings → Pages**
2. Em *Source*, escolha **Deploy from a branch**
3. Selecione a branch e a pasta `/ (root)` e salve

### Domínio próprio (casabioconstrucao.com)

1. Crie um arquivo `CNAME` na raiz com uma única linha: `casabioconstrucao.com`
2. No painel do domínio, aponte o DNS para o GitHub Pages
3. Em **Settings → Pages**, marque *Enforce HTTPS*

Também funciona em qualquer hospedagem comum (Netlify, Vercel, Hostinger,
cPanel) — basta subir os arquivos.

---

## Testar localmente

Abrir o `index.html` direto no navegador já funciona. Para um teste mais fiel:

```bash
python3 -m http.server 8000
# depois acesse http://localhost:8000
```

---

## Detalhes técnicos

- Responsivo (celular, tablet e desktop)
- Sem dependências externas além das fontes do Google Fonts
- Acessibilidade: `alt` descritivo nas fotos, `aria-label` nas ilustrações,
  navegação por teclado, respeito a `prefers-reduced-motion`
- SEO básico: `<title>`, `meta description` e Open Graph em cada página
