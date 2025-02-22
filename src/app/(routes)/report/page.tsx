import ReportComponent from '@/src/components/admin/report';
import React from 'react';
import { Breadcrumb } from 'antd';

type Props = {};

export default function ReportPage({}: Props) {
  return (
    <section>
      <header className="mb-5">
        <Breadcrumb
          items={[
            {
              key: 0,
              title: 'หน้าหลัก',
            },
            {
              key: 1,
              title: 'รายงาน',
            },
          ]}
        />
      </header>

      <div>
        <ReportComponent />
      </div>
    </section>
  );
}
