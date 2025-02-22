'use client';

import React, { useState, useEffect } from 'react';
import { Card, Divider } from 'antd';
import { ReportParams } from '@/src/interfaces/report.interface';
import dayjs from '@/src/utils/dayjs';
import { useGetZone } from '@/src/hooks/useZone';
import { TransactionReportFilter } from '@/src/components/admin/report/TransactionReportFilter';
import { ReceiptReportFilter } from '@/src/components/admin/report/ReceiptReportFilter';

type Props = {};

export default function ReportComponent({}: Props) {
  const [params, setParams] = useState<ReportParams>({
    date: dayjs().startOf('month').format('YYYY-MM-DD'),
    lang: 'th',
    reportType: 'html',
    zoneId: undefined,
    customerId: '',
  });

  const { data: zonesData } = useGetZone({
    pageSize: 99,
    start: 1,
    keywords: '',
  });

  useEffect(() => {
    if (zonesData && zonesData.data && zonesData.data.length > 0) {
      setParams((prev) => ({
        ...prev,
        zoneId: zonesData.data[0].id,
      }));
    }
  }, [zonesData]);
  return (
    <div>
      <Card>
        <div className="mb-4 font-semibold text-lg">ประจำเดือน</div>
        <TransactionReportFilter
          params={params}
          setParams={setParams}
          zonesData={zonesData}
        />
      </Card>

      <Divider />

      <Card>
        <div className="mb-4 font-semibold text-lg">ใบเสร็จ</div>
        <ReceiptReportFilter
          params={params}
          setParams={setParams}
          zonesData={zonesData}
        />
      </Card>
    </div>
  );
}
