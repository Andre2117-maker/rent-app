# ✅ Stack Frontend - ReactJS

📢 **Observação:** A escolha da stack e das bibliotecas de UI/UX é de preferência do desenvolvedor. O design, os testes e a observabilidade também são responsabilidade do desenvolvedor. O desenvolvedor pode propor novas soluções e ferramentas desde que estejam dentro da stack escolhida e não prejudiquem o andamento das atividades e requisitos do projeto.

## 📦 Dependências Principais
- ReactJS (v18+)
- TypeScript
- Axios (requisições HTTP)
- React Router (roteamento)

## 🎨 UI/UX Framework
- Material-UI (MUI) (preferência)
- Alternativas (opcionais): Ant Design, Chakra UI

## ✅ Testes
- Jest para testes unitários e de integração
- React Testing Library para testes de componentes

## 📊 Observabilidade
- Sentry para rastreamento de erros
- React Profiler para análise de performance
- Logs customizados com LogRocket (opcional)

## 🔑 Autenticação e Segurança
- JWT Decode (decodificação de tokens)
- Context API ou Redux Toolkit para gerenciamento de estado

## 📡 Comunicação em Tempo Real
- Paho MQTT ou MQTT.js (para MQTT)
- Socket.IO Client (se WebSocket for usado)

## 🛠️ Desenvolvimento
- ESLint + Prettier (padronização de código)
- Vite ou CRA (Create React App) para bootstrapping

## 📁 Estrutura de Pastas Sugerida
```bash
src/
├── api/               # Serviços de API com Axios
├── components/        # Componentes reutilizáveis
├── context/           # Context API ou Redux setup
├── hooks/             # Custom hooks
├── pages/             # Páginas (React Router)
├── styles/            # Estilos globais (CSS-in-JS ou SCSS)
├── utils/             # Funções utilitárias
├── tests/             # Testes unitários e de integração
├── App.tsx            # Componente principal
└── main.tsx           # Ponto de entrada
```

## 📦 Integração com CI/CD no GitLab
- Crie um arquivo `.gitlab-ci.yml` com as seguintes etapas:

```yaml
stages:
  - lint
  - test
  - build
  - deploy

lint:
  image: node:18
  stage: lint
  script:
    - npm ci
    - npm run lint

unit_test:
  image: node:18
  stage: test
  script:
    - npm ci
    - npm run test:ci

build:
  image: node:18
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  image: node:18
  stage: deploy
  script:
    - echo "Deploy para homologação..."
    # comandos de deploy com Docker ou rsync
  environment:
    name: homolog
    url: http://frontend-homolog.local
  only:
    - main
```

---

# ✅ Stack Frontend - Angular 2+

📢 **Observação:** A escolha da stack e das bibliotecas de UI/UX é de preferência do desenvolvedor. O design, os testes e a observabilidade também são responsabilidade do desenvolvedor. O desenvolvedor pode propor novas soluções e ferramentas desde que estejam dentro da stack escolhida e não prejudiquem o andamento das atividades e requisitos do projeto.

## 📦 Dependências Principais
- Angular (v16+)
- TypeScript
- RxJS (observables)
- Angular Router (roteamento)

## 🎨 UI/UX Framework
- Angular Material (preferência)
- Alternativas (opcionais): PrimeNG, NG Bootstrap

## ✅ Testes
- Karma e Jasmine (default Angular)
- Cypress para testes end-to-end

## 📊 Observabilidade
- Sentry Angular para rastreamento de erros
- Angular DevTools para análise de performance
- Logs com NGX Logger

## 🔑 Autenticação e Segurança
- @auth0/angular-jwt (interceptação de tokens JWT)
- ngrx/store ou ng-redux para gerenciamento de estado

## 📡 Comunicação em Tempo Real
- ngx-mqtt (para MQTT)
- @angular/websockets (para WebSocket)

## 🛠️ Desenvolvimento
- ESLint + Prettier (padronização de código)
- Angular CLI para scaffolding e build

## 📁 Estrutura de Pastas Sugerida
```bash
src/
├── app/
│   ├── api/             # Serviços HTTP
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Módulos e rotas
│   ├── services/        # Serviços e injeção de dependências
│   ├── store/           # NGRX ou Redux
│   ├── tests/           # Testes unitários e e2e
│   └── app.module.ts    # Módulo principal
├── assets/              # Imagens e arquivos estáticos
└── main.ts              # Ponto de entrada
```

## 📦 Integração com CI/CD no GitLab
- Exemplo de `.gitlab-ci.yml` para Angular:

```yaml
stages:
  - lint
  - test
  - build
  - deploy

lint:
  image: node:18
  stage: lint
  script:
    - npm ci
    - npm run lint

unit_test:
  image: node:18
  stage: test
  script:
    - npm ci
    - npm run test:headless

build:
  image: node:18
  stage: build
  script:
    - npm ci
    - npm run build -- --configuration production
  artifacts:
    paths:
      - dist/

deploy:
  image: node:18
  stage: deploy
  script:
    - echo "Deploy para homologação..."
    # comandos de deploy com Docker ou rsync
  environment:
    name: homolog
    url: http://frontend-angular-homolog.local
  only:
    - main
```

---

# ✅ Stack Frontend - React Native

📢 **Observação:** A escolha da stack e das bibliotecas de UI/UX é de preferência do desenvolvedor. O design, os testes e a observabilidade também são responsabilidade do desenvolvedor. O desenvolvedor pode propor novas soluções e ferramentas desde que estejam dentro da stack escolhida e não prejudiquem o andamento das atividades e requisitos do projeto.

## 📦 Dependências Principais
- React Native (v0.73+)
- TypeScript
- Axios (requisições HTTP)
- React Navigation (roteamento)

## 🎨 UI/UX Framework
- UI Kitten (preferência)
- Alternativas (opcionais): React Native Paper, NativeBase

## ✅ Testes
- Jest (default para React Native)
- Detox para testes end-to-end

## 📊 Observabilidade
- Sentry React Native para rastreamento de erros
- Flipper para debug
- Logs customizados com React Native Logger

## 🔑 Autenticação e Segurança
- react-native-keychain (armazenamento seguro)
- Context API ou Redux Toolkit para gerenciamento de estado

## 📡 Comunicação em Tempo Real
- react-native-mqtt ou MQTT.js (para MQTT)
- react-native-websocket (para WebSocket)

## 🛠️ Desenvolvimento
- ESLint + Prettier (padronização de código)
- Expo ou CLI React Native para bootstrapping

## 📁 Estrutura de Pastas Sugerida
```bash
src/
├── api/               # Serviços de API
├── components/        # Componentes reutilizáveis
├── navigation/        # Stack e Tab navigators
├── screens/           # Telas da aplicação
├── context/           # Context API ou Redux setup
├── tests/             # Testes unitários e e2e
├── assets/            # Imagens e fontes
├── App.tsx            # Componente principal
└── index.js           # Ponto de entrada
```

## 📦 Integração com CI/CD no GitLab
- Exemplo básico de `.gitlab-ci.yml` para React Native:

```yaml
stages:
  - lint
  - test
  - build
  - deploy

lint:
  image: node:18
  stage: lint
  script:
    - npm ci
    - npm run lint

unit_test:
  image: node:18
  stage: test
  script:
    - npm ci
    - npm run test:ci

build:
  image: node:18
  stage: build
  script:
    - npm ci
    - npm run build:android
    - npm run build:ios
  artifacts:
    paths:
      - android/app/build/outputs/apk/
      - ios/build/

deploy:
  image: node:18
  stage: deploy
  script:
    - echo "Deploy para homologação..."
    # comandos para Fastlane ou App Center
  only:
    - main
```

---
