import { ReportParams } from '@/src/interfaces/report.interface';
import httpClient from '@/src/utils/httpClient';

// /api/report/transaction
export const transactionsReport = async (params: ReportParams) => {
  try {
    const responseType = params.reportType === 'pdf' ? 'blob' : 'json';

    const response = await httpClient.post(`/api/report/transaction`, params, {
      headers: { 'Content-Type': 'application/json' },
      responseType, // เพิ่ม responseType ให้ Axios ใช้ตามประเภทที่กำหนด
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error; // ส่ง error ออกไปเพื่อให้ caller handle ต่อ
  }
};

// /api/report/receipt
export const receiptReport = async (params: ReportParams) => {
  try {
    const responseType = params.reportType === 'pdf' ? 'blob' : 'json';

    const response = await httpClient.post(`/api/report/receipt`, params, {
      headers: { 'Content-Type': 'application/json' },
      responseType, // เพิ่ม responseType ให้ Axios ใช้ตามประเภทที่กำหนด
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error; // ส่ง error ออกไปเพื่อให้ caller handle ต่อ
  }
};
