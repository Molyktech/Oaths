import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url = 'https://mercatoroathapi.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) {}

  getReports(id, startDate, endDate) {
    return this.httpClient.get(
      `${this.url}/Report/GetPaymentReport/${id}/${startDate}/${endDate}`
    );
  }

  getTransactionReport(institutionId: number) {
    return this.httpClient.get(
      `${this.url}/TransactionReport/GetByInstitutionID/${institutionId}`
    );
  }

  getTransactionSummaryReport(institutionId: number, startDate:string, endDate: string){
    return this.httpClient.get(`${this.url}/Report/GetSummaryTransactionReport/${institutionId}/${startDate}/${endDate}`)
  }
}
