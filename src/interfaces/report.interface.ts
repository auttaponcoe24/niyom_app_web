export interface ReportParams {
  lang: 'th' | 'en';
  date: string;
  zoneId?: number;
  customerId?: string;
  reportType: 'pdf' | 'html' | 'excel'; // pdf,html
}
