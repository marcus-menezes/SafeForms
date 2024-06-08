# SafeForms

- [SafeForms](#safeforms)
  - [Overview](#overview)
  - [Usage Flow](#usage-flow)
  - [Technologies Used](#technologies-used)
    - [Language](#language)
    - [Architecture (Monorepo)](#architecture-monorepo)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Authentication](#authentication)
    - [Database](#database)
    - [CI/CD](#cicd)
    - [Hosts](#hosts)
  - [Screen Flow](#screen-flow)
    - [Login Screen](#login-screen)
    - [Form Listing Screen](#form-listing-screen)
    - [Form Creation Screen](#form-creation-screen)
  - [Environment Setup](#environment-setup)

## Overview

The Safe Forms application is a full-stack project designed to manage user-specific forms. This application uses Firebase Authentication to handle user login and token validation, ensuring secure and personalized access to form data. The backend, built with NestJS, interacts with the Firebase Admin SDK to authenticate requests and manage user-specific data, while the frontend, built with React and Next.js, seamlessly integrates Firebase Auth for user authentication.

## Usage Flow

1. Upon entering the application, you must register via the sign-up screen.
2. After registration, log in to the application.
3. Upon first entering the application, you can register a new form.
4. In the form creation screen, there are two statuses the form can be in:
     - **Draft**: Status where the form is not yet complete and is saved locally.
  
     - **Published**: Status where the form is complete and saved in the database.
5. You can also edit a form with three use cases:
    1. If it is in **Draft** status and not completed, it remains in the same status.

    2. If it is in **Published** status, it cannot revert to **Draft** but can be edited normally while remaining in the same status.

    3. If it is in **Draft** status and completed, it moves to **Published** status.

## Technologies Used

### Language

- [TypeScript](https://www.typescriptlang.org/)

### Architecture (Monorepo)

- [Yarn Workspace](https://classic.yarnpkg.com/en/docs/workspaces/)

### Frontend

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Ui Shadcn](https://shadcn.dev/)
- [TanStack (React Query)](https://tanstack.com/query/v4)
- [Tailwind CSS](https://tailwindcss.com/)
- [axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)

### Backend

- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)

### Authentication

- [Firebase Authentication](https://firebase.google.com/docs/auth)

### Database

- [Firestore Database](https://firebase.google.com/docs/firestore)

### CI/CD

- [GitHub Actions](https://docs.github.com/pt/actions)

### Hosts

- [Vercel (Frontend)](https://vercel.com/)
- [Azure Web App (Backend)](https://azure.microsoft.com/)

## Screen Flow

### Login Screen

![alt text](./shared//assets//images/signIn.png)

### Form Listing Screen

![alt text](./shared//assets//images/forms.png)

### Form Creation Screen

![alt text](./shared//assets//images/createForm.png)

## Environment Setup

1. In the root of the project, run the command `yarn install` to install all dependencies for all projects.

2. Add environment variables for the projects:
    - **Frontend**: Create a `.env` file in the root of the frontend folder with the following variables:

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

    - **Backend**: Create a `.env` file in the root of the backend folder with the following variables:

    ```sh
    FIREBASE_PROJECT_ID=safeforms-649cd
    FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCgLNwPaYgfAGph\nWVtoKMPk7Ww+QDopR9NX9ZssaXJ54w6oY4HXI53Jp0+QsCtIWm10KOJJi6s1vNqm\nMF6rSidjNxhDHPRx0E58h3NlBRdJe4RJvyiV4r6UC483N7sQu624WnswuTaEb+4N\naNpDoqiisUzKzYHDy36SaxPEG03AYqRig5l4zPm1q6TAnjnzb6LV7tbz283EUhaA\nWbpWQwODh0X9P6SizRGYdHczOWY+aWjqXywo1wPOIdJSGeo408fcevUL9nBY8t9x\nbj9qIhkMgeqKNEkRLBABY6ObGsKqOcfT5KfkD/pFIDXaznqa8wdjUbir6DjmT+K8\nDHJimInXAgMBAAECggEAR9XWm9LoiX7WNvKsW/psYK9abFDBxOHBlyE/hpuEC8YZ\nPMvj32jJyzaOKIXZ44kqrX3ofrN1BZS9OutWidun7oc3CmJh/uk9Sfw1dIjj+MC8\ng5aHzTDz59GHWWxVKRwCvTtXJHLsUFkimkD8InlAyDZcClhAal9JVMFRDBJyvGTL\nBOaQpdHnwFVwHtZi9vHrsZ7Uoo0AkjfWtuTFUxoMrBezw+XvTkTA98toQBFB+tOF\nygD8cfaW7sXmJTX7YVyK0fDRi/986WcT991Qh+n8XZ12WJ8V6+C21V0FNEcLYxBZ\nTG4CCdpCcxNiVBvW0dLu1RbhJq1qZ3RodYzlORN+AQKBgQDWhwd2Og2AN0jHou9s\nbWJJvRkSvWMiaXbEKud9ZMxR4qnsGnXlWOBaAYZ0hV1urFGhuSiaN7BYMDF1jLPy\nFxs9YsqyPz88uI8vjDPLQRUQ+6WeOyW/4k1Aj+zm23chyoIRsddm84fcJ8xByCAg\nGZYnqv1qT5Bd98IX929jcbMDkQKBgQC/I+/lQy9mYdekOIWtN0XD0Gqvb7usVlLz\nuJGgYEIocmui8pch6tjvXNlimLvB87wTTZVG8R/nWsvOzuiKz7WlzXr+9dEvFvKw\n4VCth7j2KXD1S/GP6ob9y9+U4YknRBefBxeUWKoDhTzpjk6otI+71dLJ2lXBYxE1\nAtwX8n4y5wKBgQCT/HfYRbm0fe6V0L8q49YOmgSm2cB+J5SHRDWGWbdcsWiYd7Rm\nbsXtMOoojStjwjlZv5nTsKDUZQJpXZNwaCIhWXoMNfcQkxwrJ6M/DflTStT370Ne\nN+UkqWQ56KEozUKmpDC8UzigVU/g/QW0PxJG8Px5jsM/Hz9kOws65V8hEQKBgHCJ\nfiMjzXKgRNChnsL/egnyWf308TBkmu54SvV79zfNNmZ4IleL6DH2Ht+YQWPOV3ue\nADgGm9whb0HSPMQNy0tVkgcvP/xTrIxL/K5O7K2ydJlYH1+2m8guEvObXp9JzgaJ\nrG5hTahI+DYi3VkjBkV3fWXvMPJtm6H0jxViZr8dAoGBAI2ed08rAyNqAvWCrsCI\nBY19cubcKTrpz+nKGjrGUVkcyrgGscAAl7NNbfve5/kfVbZDJTLRnpfEX16JvMEg\nk1854WGf1x5eAf9Eu3y0MAiadyjBJZHGOVwlP3W9uIlP3xICE3ZIYzv4ALuJLvPR\nvAlJBBFYeQzt1LiCf4lj9VWt\n-----END PRIVATE KEY-----\n
    FIREBASE_CLIENT_EMAIL=firebase-adminsdk-d9w1a@safeforms-649cd.iam.gserviceaccount.com
    ```

3. To run the projects, use the following commands:
    - **Frontend** (PORT 3000):

    ```sh
    yarn start:frontend
    ```

    - **Backend** (PORT 4000):

    ```sh
    yarn start:backend
    ```
    [Open swagger local](http://localhost:4000/api#/)

    ![alt text](./shared/assets/images/swagger.png)
