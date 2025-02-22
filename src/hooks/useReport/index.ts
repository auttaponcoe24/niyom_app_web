import { ReportParams } from '@/src/interfaces/report.interface';
import { receiptReport, transactionsReport } from '@/src/services/repost.api';
import { useMutation, useQuery } from '@tanstack/react-query';
// reportTransacions
export const useTransactionReport = () => {
  return useMutation({
    mutationKey: ['transactions-report'],
    mutationFn: (params: ReportParams) => transactionsReport(params),
  });
};

export const useReceiptReport = () => {
  return useMutation({
    mutationKey: ['receipt-report'],
    mutationFn: (params: ReportParams) => receiptReport(params),
  });
};
