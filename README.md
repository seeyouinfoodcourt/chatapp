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

-   Send and receive messages in predefined chat rooms
-   Image upload from gallery or camera
-   Firebase Authorization with Facebook and Google
-   Firebase Firestore database and real time updates
-   Firebase Storage for file storage
-   Firebase Cloud Messaging partial integration - Android only. User can subscribe to topics and receive messages sent from FCM.

# To Do

-   screens/signin/signin.screen.tsx
    -   Better error handling
-   components/chat.feed.tsx
    -   Make the use aware when there is no more data left to fetch when fetching older messages
-   Firebase Cloud Messaging
    -   Make API to send push messages
    -   Use deeplinks to send the user to the correct room when message is pushed
    -   Make it support ios

# Contact

mis@pentia.dk
