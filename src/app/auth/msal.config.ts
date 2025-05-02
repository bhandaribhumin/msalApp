import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD app registration client ID
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID', // Replace with your tenant ID
    redirectUri: 'msauth://YOUR_PACKAGE_NAME/callback', // Replace with your app's redirect URI
    postLogoutRedirectUri: 'msauth://YOUR_PACKAGE_NAME/callback',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
      logLevel: LogLevel.Verbose,
    },
  },
};
