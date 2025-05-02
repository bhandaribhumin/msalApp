import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthenticationProvider, AuthenticationProviderOptions } from '@microsoft/microsoft-graph-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private graphClient!: Client;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private msalService: MsalService) {
    this.initializeGraphClient();
  }

  private initializeGraphClient() {
    const authProvider: AuthenticationProvider = {
      getAccessToken: async (options?: AuthenticationProviderOptions): Promise<string> => {
        const account = this.msalService.instance.getAllAccounts()[0];
        if (!account) {
          throw new Error('No active account');
        }

        const response = await this.msalService.instance.acquireTokenSilent({
          scopes: ['User.Read', 'People.Read', 'Sites.Selected'],
          account: account
        });

        return response.accessToken;
      }
    };

    this.graphClient = Client.initWithMiddleware({ authProvider });
  }

  async silentLogin(): Promise<void> {
    try {
      const accounts = this.msalService.instance.getAllAccounts();
      if (accounts.length > 0) {
        await this.msalService.instance.acquireTokenSilent({
          scopes: ['User.Read', 'People.Read', 'Sites.Selected'],
          account: accounts[0]
        });
        this.isAuthenticatedSubject.next(true);
      }
    } catch (error) {
      console.error('Silent token acquisition failed', error);
      this.isAuthenticatedSubject.next(false);
    }
  }

  async searchPeople(searchQuery: string) {
    try {
      const result = await this.graphClient
        .api('/users')
        .search(searchQuery)
        .get();
      return result.value;
    } catch (error) {
      console.error('Error searching people:', error);
      throw error;
    }
  }

  async createSharePointItem(siteId: string, listId: string, item: any) {
    try {
      const result = await this.graphClient
        .api(`/sites/${siteId}/lists/${listId}/items`)
        .post(item);
      return result;
    } catch (error) {
      console.error('Error creating SharePoint item:', error);
      throw error;
    }
  }
}
