# SafeForms

- [SafeForms](#safeforms)
  - [Visão Geral](#visão-geral)
  - [Fluxo de Uso](#fluxo-de-uso)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
    - [Linguagem](#linguagem)
    - [Arquiterura (Monorepo)](#arquiterura-monorepo)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Autenticação](#autenticação)
    - [Banco de Dados](#banco-de-dados)
    - [CI/CD](#cicd)
    - [Hosts](#hosts)
  - [Fluxo de Telas](#fluxo-de-telas)
    - [Tela de login](#tela-de-login)
    - [Tela de listagem de formulários](#tela-de-listagem-de-formulários)
    - [Tela de criação de formulário](#tela-de-criação-de-formulário)
  - [Configuração de ambiente](#configuração-de-ambiente)

## Visão Geral

A aplicação Safe Forms é um projeto full-stack projetado para gerenciar formulários específicos do usuário. Esta aplicação utiliza o Firebase Authentication para lidar com o login do usuário e validação de token, garantindo acesso seguro e personalizado aos dados dos formulários. O backend, construído com NestJS, interage com o Firebase Admin SDK para autenticar solicitações e gerenciar dados específicos do usuário, enquanto o frontend, construído com React e Next.js, integra perfeitamente o Firebase Auth para autenticação de usuários.

## Fluxo de Uso

1. Ao entrar na aplicação você deve efetuar seu cadastro pela tela de sign up.
2. Após o cadatro faça o login na aplicação.
3. Entrando a primeira vez na aplicação você poderá cadastrar um novo formulário
4. Dentro da criação de formulário temos dois status que ele pode estar:
     - **Draft**: Status onde o fomulário ainda não está completo e salvo localmente.
  
     - **Published**: Status onde o fomulário está completo e salvo no banco de dados.
5. É possivel também editar um formulário, temos 3 casos de uso:
    1. Caso esteja no status **Draft** e não for completado ele continua no mesmo status.

    2. Caso esteja no status **Published** ele não poderá virar **Draft** mas ele pode ser editado normalmente assim se mantendo no mesmo status.

    3. Caso esteja no status **Draft** e for completado ele vai para o status **Published**

## Tecnologias Utilizadas

### Linguagem

- [TypeScript](https://www.typescriptlang.org/)

### Arquiterura (Monorepo)

- [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/)

### Frontend

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Ui Shadcn](https://shadcn.dev/)
- [TanStack (React Query)](https://tanstack.com/query/v4)
- [Tailwind CSS](https://tailwindcss.com/)
- [axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/) com [Zod](https://zod.dev/)

### Backend

- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

### Autenticação

- [Firebase Authentication](https://firebase.google.com/docs/auth)

### Banco de Dados

- [Firestore Database](https://firebase.google.com/docs/firestore)

### CI/CD

- [GitHub Actions](https://docs.github.com/pt/actions)

### Hosts

- [Vercel (Frontend)](https://vercel.com/)
- [Azure Web App (Backend)](https://azure.microsoft.com/)

## Fluxo de Telas

### Tela de login

![alt text](./shared//assets//images/signIn.png)

### Tela de listagem de formulários

![alt text](./shared//assets//images/forms.png)

### Tela de criação de formulário

![alt text](./shared//assets//images/createForm.png)

## Configuração de ambiente

1. No root do projeto rode o comando yarn install para instalar todas as depedencias de todos os projetos.
2. Adicionar envs para projetos:
    - **Frontend**: Criar um arquivo .env na pasta frontend na raiz com as seguindes variaveis:

    ```sh
    NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDBoNfVhPW3Jhaih-nnuCVW8swRPvX2n68
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=safeforms-649cd.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=safeforms-649cd
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=safeforms-649cd.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=446967180446
    NEXT_PUBLIC_FIREBASE_APP_ID=1:446967180446:web:279307ee8e43fd9b6a5f8f
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BX8M2BTSCB
    NEXT_PUBLIC_API_URL=http://localhost:4000
    ```

    - **Backend**: Criar um arquivo .env na pasta backend na raiz com as seguindes variaveis:

    ```sh
    FIREBASE_PROJECT_ID=safeforms-649cd
    FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgLNwPaYgfAGph\nWVtoKMPk7Ww+QDopR9NX9ZssaXJ54w6oY4HXI53Jp0+QsCtIWm10KOJJi6s1vNqm\nMF6rSidjNxhDHPRx0E58h3NlBRdJe4RJvyiV4r6UC483N7sQu624WnswuTaEb+4N\naNpDoqiisUzKzYHDy36SaxPEG03AYqRig5l4zPm1q6TAnjnzb6LV7tbz283EUhaA\nWbpWQwODh0X9P6SizRGYdHczOWY+aWjqXywo1wPOIdJSGeo408fcevUL9nBY8t9x\nbj9qIhkMgeqKNEkRLBABY6ObGsKqOcfT5KfkD/pFIDXaznqa8wdjUbir6DjmT+K8\nDHJimInXAgMBAAECggEAR9XWm9LoiX7WNvKsW/psYK9abFDBxOHBlyE/hpuEC8YZ\nPMvj32jJyzaOKIXZ44kqrX3ofrN1BZS9OutWidun7oc3CmJh/uk9Sfw1dIjj+MC8\ng5aHzTDz59GHWWxVKRwCvTtXJHLsUFkimkD8InlAyDZcClhAal9JVMFRDBJyvGTL\nBOaQpdHnwFVwHtZi9vHrsZ7Uoo0AkjfWtuTFUxoMrBezw+XvTkTA98toQBFB+tOF\nygD8cfaW7sXmJTX7YVyK0fDRi/986WcT991Qh+n8XZ12WJ8V6+C21V0FNEcLYxBZ\nTG4CCdpCcxNiVBvW0dLu1RbhJq1qZ3RodYzlORN+AQKBgQDWhwd2Og2AN0jHou9s\nbWJJvRkSvWMiaXbEKud9ZMxR4qnsGnXlWOBaAYZ0hV1urFGhuSiaN7BYMDF1jLPy\nFxs9YsqyPz88uI8vjDPLQRUQ+6WeOyW/4k1Aj+zm23chyoIRsddm84fcJ8xByCAg\nGZYnqv1qT5Bd98IX929jcbMDkQKBgQC/I+/lQy9mYdekOIWtN0XD0Gqvb7usVlLz\nuJGgYEIocmui8pch6tjvXNlimLvB87wTTZVG8R/nWsvOzuiKz7WlzXr+9dEvFvKw\n4VCth7j2KXD1S/GP6ob9y9+U4YknRBefBxeUWKoDhTzpjk6otI+71dLJ2lXBYxE1\nAtwX8n4y5wKBgQCT/HfYRbm0fe6V0L8q49YOmgSm2cB+J5SHRDWGWbdcsWiYd7Rm\nbsXtMOoojStjwjlZv5nTsKDUZQJpXZNwaCIhWXoMNfcQkxwrJ6M/DflTStT370Ne\nN+UkqWQ56KEozUKmpDC8UzigVU/g/QW0PxJG8Px5jsM/Hz9kOws65V8hEQKBgHCJ\nfiMjzXKgRNChnsL/egnyWf308TBkmu54SvV79zfNNmZ4IleL6DH2Ht+YQWPOV3ue\nADgGm9whb0HSPMQNy0tVkgcvP/xTrIxL/K5O7K2ydJlYH1+2m8guEvObXp9JzgaJ\nrG5hTahI+DYi3VkjBkV3fWXvMPJtm6H0jxViZr8dAoGBAI2ed08rAyNqAvWCrsCI\nBY19cubcKTrpz+nKGjrGUVkcyrgGscAAl7NNbfve5/kfVbZDJTLRnpfEX16JvMEg\nk1854WGf1x5eAf9Eu3y0MAiadyjBJZHGOVwlP3W9uIlP3xICE3ZIYzv4ALuJLvPR\nvAlJBBFYeQzt1LiCf4lj9VWt\n-----END PRIVATE KEY-----\n
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-d9w1a@safeforms-649cd.iam.gserviceaccount.com
    ```

3. Para rodar os projetos temos os comandos:
    - **Frontend** (PORT 3000):

    ```sh
    yarn start:frontend
    ```

    - **Backend** (PORT 4000):

    ```sh
    yarn start:backend
    ```
