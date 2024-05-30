# Super Awesome Chat App

By Mikkel Søder

## Description

This project is a React Native chat app based around Firebase.

## Table of contents

-   Installation
-   Features
-   Todo

# Installation

1. Install node dependencies

```bash
yarn install
```

2. Install pods for ios

```bash
npx pod-install ios
```

3. Build the app

```bash
# build ios app
yarn ios

# build android app
yarn android
```

# Features

-   Firebase Authorization with Facebook and Google
-   Firebase Firestore database and real time updates
-   Firebase Storage for file storage

# To Do

-   screens/signin/signin.screen.tsx
    -   Better error handling
-   components/chat.feed.tsx
    -   Make the use aware when there is no more data left to fetch when fetching older messages
-   Firebase Cloud Messaging
    -   Make API to send push messages

# Contact

mis@pentia.dk
