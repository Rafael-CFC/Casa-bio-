# Site — BioCasa Soluções Ecológicas

Site institucional da **BioCasa Soluções Ecológicas Ltda.** (São Sebastião/SP) —
tratamento de esgoto, captação de água da chuva e bioconstrução.

Site **estático**: só HTML, CSS e JavaScript. Não precisa de build, servidor Node
nem banco de dados. É só abrir o `index.html` no navegador ou publicar a pasta.

---

## Estrutura

```
index.html        Página inicial (hero, áreas de atuação, números,
                  equipamento BioETE®, processo, localização, Instagram, contato)
servicos.html     Área de atuação detalhada: esgoto, água da chuva, bioconstrução
produtos.html     Linha de produtos: estações de tratamento e cisternas
projetos.html     Projetos de bioconstrução
contato.html      Contato, mapa, Instagram e perguntas frequentes

assets/css/style.css   Todo o visual do site (cores, tipografia, layout)
assets/js/main.js      Menu mobile, animações, filtro de produtos, formulário
```

---

## Como editar as coisas do dia a dia

### 1. Os números da home

Ficam na seção `<section class="secao numeros">` do `index.html`.
Cada número está no atributo `data-contador`:

```html
<div class="numero__valor"><span data-contador="70">70</span><small>+</small></div>
<p class="numero__rotulo">Sistemas executados</p>
```

Troque **apenas o valor dentro de `data-contador`** (e o texto que aparece dentro
do `<span>`, que é o fallback caso o JavaScript esteja desligado).

> ⚠️ **Confirme estes valores antes de publicar.**
> `Sistemas executados = 70` vem do material público da empresa ("mais de 70 projetos
> e obras desde 2019"). Os outros três — **municípios atendidos (15)**,
> **pessoas atendidas (1200)** e **litros tratados por dia (85000)** — são
> valores de referência colocados como ponto de partida e precisam ser
> substituídos pelos números reais.

### 2. Contato, WhatsApp e Instagram

Os dados de contato aparecem em todas as páginas. Para trocar, use
"localizar e substituir" em **todos os arquivos `.html`**:

| O que | Valor atual |
|---|---|
| WhatsApp (link) | `5512996611636` |
| WhatsApp (exibido) | `(12) 99661-1636` |
| E-mail | `contato@biocasaecologica.com.br` |
| Instagram | `biocasaecologica` |
| Endereço | `Alameda Santo André, Boraceia — São Sebastião/SP, 11.626-300` |
| CNPJ | `44.609.395/0001-08` |

O link do WhatsApp segue o formato `https://wa.me/55` + DDD + número, sem
espaços nem símbolos.

### 3. Produtos

Em `produtos.html`, cada produto é um bloco `<article class="produto">`.
Para adicionar um novo, copie um bloco existente e ajuste:

- `data-categoria="estacoes"` ou `data-categoria="cisternas"` — controla o filtro
- `<h3>` — nome do produto
- `<p class="produto__desc">` — descrição
- `<ul class="produto__especs">` — as etiquetas de especificação
- `<p class="produto__ideal">` — para quem é indicado
- o `?text=` no link do WhatsApp — mensagem que já vem preenchida

Produtos de cisterna devem ter também a classe `produto--agua` (deixa o card azul).

### 4. Projetos

Em `projetos.html`, cada projeto é um bloco `<article class="projeto">`.
Mesma lógica: copie um bloco e troque título, descrição e etiquetas.

> ⚠️ Os nomes **"Moradecov"** e **"Venda Viva"** foram transcritos de áudio e
> podem estar grafados de forma diferente do nome oficial do projeto. Confira
> e ajuste no arquivo se necessário.

### 5. Fotos

Hoje as ilustrações são desenhos vetoriais (SVG) feitos à mão no próprio HTML —
por isso o site carrega rápido e não depende de nenhuma imagem externa.

Para trocar por fotos reais, crie uma pasta `assets/img/` e substitua o `<svg>`
do bloco por:

```html
<img src="assets/img/nome-da-foto.jpg" alt="Descrição da foto" loading="lazy">
```

Nos cards de projeto, a foto entra dentro de `<div class="projeto__capa">` — o
CSS já recorta e ajusta a imagem automaticamente.

### 6. Cores

Todas as cores estão no topo do `assets/css/style.css`, no bloco `:root`.
Mudando ali, muda no site inteiro.

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

### Domínio próprio (biocasaecologica.com.br)

1. Crie um arquivo `CNAME` na raiz com uma única linha: `biocasaecologica.com.br`
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
- Acessibilidade: `alt`/`aria-label` nas ilustrações, navegação por teclado,
  respeito a `prefers-reduced-motion`
- SEO básico: `<title>`, `meta description` e Open Graph em cada página
