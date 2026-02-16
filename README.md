# D.C. Modern High School - Static Web App

A static React SPA version of the DCMHS website, built for deployment on Azure Static Web Apps.

## Tech Stack

- React 19 + Vite
- MUI (Material-UI) 7
- MobX for state management
- React Router for navigation

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview  # preview production build
```

## Deployment

Deployed automatically to Azure Static Web Apps on push to `main`.

### Setup

1. Create an Azure Static Web App in the Azure Portal
2. Copy the deployment token
3. Add it as a GitHub secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
