import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private readonly SHAREPOINT_SITE_ID = 'YOUR_SITE_ID';
  private readonly INCIDENT_LIST_ID = 'YOUR_LIST_ID';

  constructor(private authService: AuthService) {}

  async createIncident(incident: {
    title: string;
    description: string;
    priority: string;
    assignedTo?: string;
  }) {
    const item = {
      fields: {
        Title: incident.title,
        Description: incident.description,
        Priority: incident.priority,
        AssignedTo: incident.assignedTo
      }
    };

    return this.authService.createSharePointItem(
      this.SHAREPOINT_SITE_ID,
      this.INCIDENT_LIST_ID,
      item
    );
  }
}
