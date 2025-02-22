import { useReceiptReport } from '@/src/hooks/useReport';
import { ReportParams } from '@/src/interfaces/report.interface';
import { ZoneData, ZoneFetchResponse } from '@/src/interfaces/zone.interface';
import {
  notification,
  Progress,
  Form,
  DatePicker,
  Select,
  Button,
  Dropdown,
  Space,
} from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { GrDocumentExcel, GrDocumentPdf } from 'react-icons/gr';
import { VscOpenPreview } from 'react-icons/vsc';
import dayjs from 'dayjs';
import { useState, Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

type Props = {
  params: ReportParams;
  setParams: Dispatch<SetStateAction<ReportParams>>;
  zonesData: ZoneFetchResponse | undefined;
};

interface Form {
  date?: dayjs.Dayjs;
  zoneId?: number;
  customerId?: string;
}

export const ReceiptReportFilter: React.FC<Props> = (props) => {
  const { params, setParams, zonesData } = props;
  const { messages } = useIntl();
  const [form] = Form.useForm<Form>();
  const [zoneName, setZoneName] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const { mutate: downloadReport, mutateAsync: asyncDownloadReport } =
    useReceiptReport();

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const items: MenuProps['items'] = [
    {
      key: 'html',
      label: 'Preview',
      icon: <VscOpenPreview />,
    },
    {
      key: 'pdf',
      label: 'PDF',
      icon: <GrDocumentPdf />,
    },
  ];

  const menuProps = {
    items: [
      { key: 'pdf', label: 'PDF', onClick: () => handleDownload('pdf') },
      { key: 'html', label: 'HTML', onClick: () => handleDownload('html') },
    ],
  };

  const handleDownload = (key: 'html' | 'pdf') => {
    handleOnDownload(key);
    setParams((prev) => ({
      ...prev,
      reportType: key,
    }));
    handleOnFinish(form.getFieldsValue()); // ใช้ค่าปัจจุบันจาก Form
  };

  const handleOnDownload = async (key: 'html' | 'pdf') => {
    setLoading(true);

    // อัปเดตค่าพารามิเตอร์ก่อน
    setParams((prev) => ({
      ...prev,
      reportType: key,
    }));
  };

  const handleOnFinish = async (values: Form) => {
    setLoading(true);

    const data = {
      lang: params.lang,
      date: values.date
        ? dayjs(values.date).startOf('month').format('YYYY-MM-DD')
        : '',
      zoneId: values.zoneId || undefined,
      reportType: 'pdf' as 'pdf' | 'html' | 'excel',
    };

    asyncDownloadReport(data, {
      onSuccess: async (success) => {
        try {
          if (!success) {
            throw new Error('No data received');
          }

          // console.log('success=>', success);

          const type = data.reportType === 'excel' ? 'xlsx' : data.reportType;
          const blob = new Blob([success], {
            type: `application/${type}`,
          });
          const downloadUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute(
            'download',
            `${zoneName} ${dayjs(data.date).format('YYYY-MM-DD')}.${type}`,
          );
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error: any) {
          console.error('Error in download process:', error);
          notification.error({
            message: messages['notification.api.resp.error'] as string,
            // description: error.message,
            description: error?.response?.data?.message,
          });
        } finally {
          setLoading(false);
          // await new Promise((resolve) => setTimeout(resolve, 5000));
          // notification.destroy('processingNotification');
        }
      },
      onError: (error: any) => {
        console.error('API Error:', error);
        notification.error({
          message: messages['notification.api.resp.error'] as string,
          description: error?.response?.data?.message || 'Download failed',
        });
        setLoading(false);
      },
    });
  };

  return (
    <>
      <Form form={form} onFinish={handleOnFinish} layout="vertical">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Form.Item
            name={`date`}
            label="เดือน"
            rules={[
              {
                required: true,
                message: 'กรุณาเลือก',
              },
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              picker="month"
              format={`MM/YYYY`}
              placeholder="เดือน"
            />
          </Form.Item>

          <Form.Item
            name={`zoneId`}
            label="เขต"
            rules={[
              {
                required: true,
                message: 'กรุณาเลือก',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              options={zonesData?.data.map((zone) => ({
                key: zone.id,
                label: zone.zoneName,
                value: zone.id,
                option: zone,
              }))}
              onChange={(
                value,
                option:
                  | {
                      key: number;
                      label: string;
                      value: number;
                      option: ZoneData;
                    }
                  | {
                      key: number;
                      label: string;
                      value: number;
                      option: ZoneData;
                    }[],
              ) => {
                if (!Array.isArray(option)) {
                  const { label } = option;

                  setZoneName(label);
                }
              }}
            />
          </Form.Item>

          <Form.Item label=" ">
            <div className="flex items-center justify-center gap-4">
              <Button style={{ width: '100%' }} type="default" htmlType="reset">
                ล้าง
              </Button>
              <Button
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Download
              </Button>
            </div>
            {/* <div className="flex items-center justify-evenly gap-4">
              <Button
                style={{ width: '100%' }}
                type="default"
                onClick={() => form.resetFields()}
              >
                ล้าง
              </Button>
              <Dropdown menu={menuProps}>
                <Button type="primary">
                  <Space>
                    Download
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div> */}
          </Form.Item>
        </div>
      </Form>
    </>
  );
};
