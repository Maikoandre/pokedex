# Pokédex

Uma Pokédex web feita com **React** e **Vite**, que consome a [PokéAPI](https://pokeapi.co/) para listar Pokémon e exibir seus detalhes: tipos, altura, peso, habilidades e atributos base.

A interface usa **Tailwind CSS v4** e componentes no estilo **shadcn/ui** (baseados em Radix UI), com um menu lateral para navegar entre os Pokémon.

![Print da Tela Principal]("src/assets/Screenshot_20261009_135134.png")

## Funcionalidades

- Menu lateral com a lista dos primeiros 50 Pokémon, numerados no formato `001`, `002`...
- Card de detalhes do Pokémon selecionado, com:
  - arte oficial (com fallback para o sprite padrão);
  - número e nome;
  - tipos (badges);
  - altura (m) e peso (kg);
  - habilidades;
  - atributos base (HP, Ataque, Defesa, Atq. especial, Def. especial e Velocidade) com barras de progresso.
- Cache em memória dos detalhes já carregados, evitando requisições repetidas ao alternar entre Pokémon.
- Estados de carregamento e de erro tanto na lista quanto no card de detalhes.
- Layout responsivo, com sidebar adaptável a telas menores.

## Tecnologias

| Categoria | Ferramentas |
| --- | --- |
| Framework | [React 19](https://react.dev/) |
| Build / Dev server | [Vite](https://vite.dev/) |
| Estilização | [Tailwind CSS 4](https://tailwindcss.com/), `tw-animate-css`, `class-variance-authority` |
| Componentes de UI | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Ícones | [Lucide](https://lucide.dev/) |
| Fonte | [Geist Variable](https://fontsource.org/fonts/geist) |
| Dados | [PokéAPI](https://pokeapi.co/) |
| Qualidade de código | ESLint (com plugins de React Hooks e React Refresh) |

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm (ou outro gerenciador de pacotes de sua preferência)

## Como executar

```bash
# 1. Clone o repositório
git clone https://github.com/Maikoandre/pokedex.git
cd pokedex

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Depois, acesse o endereço exibido no terminal (por padrão, `http://localhost:5173`).

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera a build de produção na pasta `dist/` |
| `npm run preview` | Serve localmente a build de produção |
| `npm run lint` | Executa o ESLint em todo o projeto |

## Estrutura do projeto

```
pokedex/
├── public/                     # Arquivos estáticos (favicon, pokébola)
├── src/
│   ├── assets/                 # Imagens e SVGs
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx          # Cabeçalho da página
│   │   │   ├── SidebarLayout.jsx   # Layout principal: sidebar + conteúdo
│   │   │   ├── PokemonCard.jsx     # Card com os detalhes do Pokémon
│   │   │   ├── Modal.jsx           # (em desenvolvimento)
│   │   │   └── TypeCard.jsx        # (em desenvolvimento)
│   │   └── ui/                 # Componentes base (shadcn/ui): badge, button,
│   │                           # card, dialog, input, progress, sidebar...
│   ├── hooks/
│   │   ├── usePokemons.js          # Busca a lista de Pokémon
│   │   ├── usePokemonDetails.js    # Busca os detalhes de um Pokémon (com cache)
│   │   └── use-mobile.js           # Detecta viewport mobile
│   ├── lib/utils.js            # Utilitários (ex.: merge de classes CSS)
│   ├── utils/index.js          # Cores por tipo, lista da 1ª geração, helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── components.json             # Configuração do shadcn/ui
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Como funciona

- **`usePokemons`** faz uma requisição a `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`, extrai o ID de cada Pokémon a partir da URL e monta o endereço do sprite.
- **`usePokemonDetails`** busca `https://pokeapi.co/api/v2/pokemon/{id}`, normaliza os dados (converte altura e peso para m e kg) e guarda o resultado em um `Map` para reaproveitar em seleções futuras. Também cancela atualizações de estado de requisições obsoletas.
- **`SidebarLayout`** renderiza a lista lateral e controla qual Pokémon está selecionado, repassando-o ao **`PokemonCard`**.

O projeto também configura o alias `@` apontando para `src/`, então os imports ficam no formato `@/components/...`.

## Próximos passos

Ideias para evoluir o projeto:

- [ ] Paginação ou carregamento de todos os Pokémon (hoje são carregados apenas 50)
- [ ] Busca e filtro por nome
- [ ] Filtro por tipo, usando as cores já definidas em `src/utils/index.js` (`TypeCard`)
- [ ] Modal de detalhes (`Modal`)
- [ ] Modo escuro

## Créditos

- Dados e sprites fornecidos pela [PokéAPI](https://pokeapi.co/).
- Pokémon e seus nomes são marcas registradas da Nintendo, Game Freak e The Pokémon Company. Este é um projeto sem fins lucrativos, feito para estudo.