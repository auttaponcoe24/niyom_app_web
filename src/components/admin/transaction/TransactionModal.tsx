import {
  TransactionData,
  TransactionMode,
  TransactionParams,
  UpdateOrCreateTransactionList,
  UpdateTransactionId,
} from '@/src/interfaces/transaction.interface';
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Spin,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import dayjs from '@/utils/dayjs';
import {
  usePayTransaction,
  useUpdateOrCreateTransaction,
  useUpdateTransactionId,
} from '@/src/hooks/useTransaction';
import { useGetZone } from '@/src/hooks/useZone';
import { useGetCustomers } from '@/src/hooks/useCustomer';
import { format } from 'path';

type Props = {
  transactionMode: TransactionMode;
  setTransactionMode: Dispatch<SetStateAction<TransactionMode>>;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  setIsFinish: Dispatch<SetStateAction<boolean>>;
  params: TransactionParams;
  transactionData: TransactionData | null;
  setTransactionData: Dispatch<SetStateAction<TransactionData | null>>;
  transactionsData: TransactionData[] | null;
  setTransactionsData: Dispatch<SetStateAction<TransactionData[] | null>>;
};

interface EditForm {
  date: dayjs.Dayjs;
  type: 'W' | 'E';
  zoneId: number;
  customerId: string;
  unitNumberOld: number;
  unitNumberNew: number;
  unitUsed: number;
  amount: number;
  overDue: number;
  total: number;
}

interface PayForm {
  date: dayjs.Dayjs;
  type: 'W' | 'E';
  zoneId: number;
  customerId: string;
  total: number;
  pay: number;
  remain: number;
}

export default function TransactionModal({
  transactionMode,
  setTransactionMode,
  isOpenModal,
  setIsOpenModal,
  setIsFinish,
  params,
  transactionData,
  setTransactionData,
  transactionsData,
  setTransactionsData,
}: Props) {
  const { messages } = useIntl();
  const [editForm] = Form.useForm<EditForm>();
  const [payForm] = Form.useForm<PayForm>();
  const [zoneId, setZoneId] = useState<number | null>(null);

  useEffect(() => {
    if (transactionData && isOpenModal) {
      if (transactionMode === 'edit') {
        if (!editForm) return;

        editForm.setFieldsValue({
          date: transactionData.date ? dayjs(transactionData.date) : undefined,
          type: transactionData.type,
          customerId: transactionData.customerId,
          zoneId: transactionData.zoneId,
          unitNumberOld: transactionData.unitOld.unitNumber,
          unitNumberNew: transactionData.unitNew.unitNumber,
          unitUsed: transactionData.unitUsed,
          amount: transactionData.amount,
          overDue: transactionData.overDue,
          total: transactionData.total,
        });
      } else if (transactionMode === 'pay') {
        payForm.setFieldsValue({
          date: transactionData.date ? dayjs(transactionData.date) : undefined,
          type: transactionData.type,
          customerId: transactionData.customerId,
          zoneId: transactionData.zoneId,
          total: transactionData.total,
          pay: transactionData.pay,
          remain: transactionData.remain,
        });
      }
    }
  }, [transactionData, isOpenModal, transactionMode, editForm]);

  const {
    data: customerListData,
    isLoading: isCustomerListLoading,
    isFetching: isCustomerListFetching,
    refetch: refetchCustomerList,
  } = useGetCustomers({
    pageSize: 999,
    start: 1,
    zoneId: zoneId ?? 0,
    keywords: '',
  });

  useEffect(() => {
    if (zoneId) {
      refetchCustomerList();
    }
  }, [zoneId]);

  const { data: zoneListData } = useGetZone({
    pageSize: 999,
    start: 1,
    keywords: '',
  });

  const typeList = [
    {
      key: 1,
      label: 'น้ำ',
      value: 'W',
    },
    {
      key: 2,
      label: 'ไฟฟ้า',
      value: 'E',
    },
  ];

  const columns: ColumnsType<TransactionData> = [
    {
      title: 'ลำดับ',
      align: 'center',
      fixed: 'left',
      width: 60,
      render: (_, record) => {
        return <div className="text-center">{record.no}</div>;
      },
    },
    {
      title: 'ชื่อ - สกุล',
      align: 'center',
      fixed: 'left',
      width: 200,
      render: (_, record) => {
        return <div className="text-left">{record.fullName}</div>;
      },
    },
    {
      // หน่วยใหม่
      title: dayjs.utc(params?.date).startOf('month').format('MMMBB'),
      align: 'center',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-4">
            {!record?.unitNewId ? (
              <div className="text-red-600">-</div>
            ) : (
              <div className="text-center">{record?.unitNew?.unitNumber}</div>
            )}
          </div>
        );
      },
    },
    {
      // หน่วยเดือนที่แล้ว
      title: dayjs
        .utc(params.date, 'YYYY-MM-DD')
        .subtract(1, 'month')
        .startOf('month')
        .format('MMMBB'),
      align: 'center',
      width: 100,
      render: (_, record) => {
        return (
          <div className="flex items-center justify-center gap-4">
            {!record?.unitOldId ? (
              <div className="text-red-600">-</div>
            ) : (
              <div className="text-center">{record?.unitOld?.unitNumber}</div>
            )}
          </div>
        );
      },
    },
    {
      title: 'หน่วยที่ใช้',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.unitUsed}</div>;
      },
    },
    {
      title: 'ราคา/หน่วย',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.amount}</div>;
      },
    },
    {
      title: 'ยอดค้าง',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.overDue}</div>;
      },
    },
    {
      title: 'รวมสุทธิ์',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.total}</div>;
      },
    },
    {
      title: 'ชำระ',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.pay}</div>;
      },
    },
    {
      title: 'คงเหลือ',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return <div className="text-center">{record.remain}</div>;
      },
    },
    {
      title: 'ผู้รับเงิน',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return (
          <div className="text-center">
            {record.approved ? (
              <div>
                <div>{record?.approved?.firstName}</div>
              </div>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
    {
      title: 'วันที่รับ',
      align: 'center',
      width: 100,
      render: (_, record) => {
        return (
          <div className="text-center">
            {record.approved ? (
              <div>
                <div>{dayjs.utc(record.approvedAt).format('DDMMMBB')}</div>
              </div>
            ) : (
              '-'
            )}
          </div>
        );
      },
    },
  ];

  const handleOnSuccess = (success: any) => {
    if (success) {
      notification.success({
        message: messages['notification.api.resp.success'] as string,
      });
      handleOnCancel();
      setIsFinish((prev) => !prev);
    } else {
      notification.error({
        message: messages['notification.api.resp.error'] as string,
      });
    }
  };

  const handleOnError = (error: any) => {
    notification.error({
      message: messages['notification.api.resp.error'] as string,
    });
  };

  const {
    mutate: updateOrCreateTransaction,
    isPending: isPendingUpdateOrCreateTransaction,
  } = useUpdateOrCreateTransaction();

  const handleOnCreate = () => {
    if (transactionsData && transactionMode === 'create') {
      const updateOrCreate: UpdateOrCreateTransactionList =
        transactionsData.map((transaction) => ({
          id: transaction.id,
          date: transaction.date
            ? dayjs(transaction.date).format('YYYY-MM-DD')
            : '',
          type: transaction.type,
          unitOldId: transaction.unitOldId,
          unitNewId: transaction.unitNewId,
          unitUsed: transaction.unitUsed,
          amount: transaction.amount,
          overDue: transaction.overDue,
          total: transaction.total,
          pay: transaction.pay,
          remain: transaction.remain,
          status: transaction.status,
          customerId: transaction.customerId,
          zoneId: transaction.zoneId,
        }));

      // console.log("updateOrCreate=>", updateOrCreate);
      updateOrCreateTransaction(updateOrCreate, {
        onSuccess: (success) => {
          handleOnSuccess(success);
        },
        onError: (error) => {
          handleOnError(error);
        },
      });
    }
  };

  const { mutate: updateTransactionId, isPending: isTransactionIdPending } =
    useUpdateTransactionId();

  const handleOnUpdateTransactionId = (values: EditForm) => {
    if (transactionMode === 'edit' && transactionData) {
      const data: UpdateTransactionId = {
        transactionId: transactionData?.id,
        unitNumberNew: +values.unitNumberNew,
        unitNumberOld: +values.unitNumberOld,
        unitUsed: +values.unitUsed,
        amount: +values.amount,
        overDue: +values.overDue,
        total: +values.total,
      };

      updateTransactionId(data, {
        onSuccess: (success) => {
          handleOnSuccess(success);
        },
        onError: (error) => {
          handleOnError(error);
        },
      });
    }
  };

  const {
    mutate: updatePayTransactionId,
    isPending: isPayTransactionIdPending,
  } = usePayTransaction();

  const handleOnUpdatePayTransactionId = (values: PayForm) => {
    if (transactionMode === 'pay' && transactionData) {
      const data: { id: number; pay: number } = {
        id: transactionData.id,
        pay: +values.pay,
      };

      updatePayTransactionId(data, {
        onSuccess: (success) => {
          handleOnSuccess(success);
        },
        onError: (error) => {
          handleOnError(error);
        },
      });
    }
  };

  const handleOnCancel = () => {
    setIsOpenModal(false);
    setTransactionMode(null);
    setTransactionData(null);
    setTransactionsData(null);
  };

  const handleValuesChange = (_: any, values: EditForm) => {
    // (ราคาต่อหน่วย * 6 + 50) + 0.07 * (ราคาต่อหน่วย * 6 + 50); => ไฟ
    const { unitNumberNew, unitNumberOld, type, overDue } = values;
    if (unitNumberNew !== undefined && unitNumberOld !== undefined) {
      const unitUsed = unitNumberNew - unitNumberOld;
      const amount =
        type === 'W'
          ? Math.round(unitUsed * 16 + 50)
          : Math.round(+unitUsed * 6 + 50 + 0.07 * (+unitUsed * 6 + 50));
      editForm.setFieldsValue({
        unitUsed,
        amount,
        total: +overDue + +amount,
      });
    }
  };

  const handlePayValuesChange = (_: any, values: PayForm) => {
    const { total, pay } = values;
    if (total !== undefined && pay !== undefined) {
      const remain = total - pay;
      payForm.setFieldsValue({
        remain,
      });
    }
  };

  return (
    <>
      {transactionMode === 'create' && (
        <Modal
          title={'สร้างใบงาน'}
          open={isOpenModal}
          onCancel={handleOnCancel}
          centered
          width={1200}
          footer={null}
        >
          {false ? (
            <div className="flex items-center justify-center m-4">
              <Spin size="default" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-end gap-4 mb-4">
                <Button
                  className="!px-10"
                  type="primary"
                  htmlType="button"
                  loading={isPendingUpdateOrCreateTransaction}
                  onClick={handleOnCreate}
                >
                  สร้าง
                </Button>
              </div>

              <Table
                size="small"
                rowKey={(record) => `${record.customerId}`}
                columns={columns}
                bordered
                dataSource={transactionsData ?? []}
                pagination={false}
                // scroll={{
                // 	y: 1000,
                // }}
              />
            </>
          )}
        </Modal>
      )}

      {transactionMode === 'edit' && (
        <Modal
          title={`แก้ไข: `}
          open={isOpenModal}
          onCancel={handleOnCancel}
          centered
          // width={1200}
          footer={null}
        >
          <Form
            form={editForm}
            onFinish={handleOnUpdateTransactionId}
            onValuesChange={handleValuesChange}
            layout="horizontal"
            wrapperCol={{
              span: 20,
            }}
            labelCol={{
              span: 8,
            }}
            labelAlign="left"
          >
            <Form.Item name={`date`} label="ประจำเดือน">
              <DatePicker
                disabled
                style={{ width: '100%' }}
                picker="month"
                format={`MM/YYYY`}
              />
            </Form.Item>

            <Form.Item name={`type`} label="ประเภท">
              <Select disabled style={{ width: '100%' }} options={typeList} />
            </Form.Item>

            <Form.Item name={`zoneId`} label="เขต">
              <Select
                disabled
                style={{ width: '100%' }}
                options={zoneListData?.data.map((zone) => ({
                  key: zone.id,
                  label: zone.zoneName,
                  value: zone.id,
                }))}
                onChange={(value) => {
                  setZoneId(value);
                }}
              />
            </Form.Item>

            <Form.Item name={`customerId`} label="ลูกค้า">
              <Select
                style={{ width: '100%' }}
                disabled
                loading={isCustomerListLoading || isCustomerListFetching}
                options={customerListData?.data.map((customer) => ({
                  key: customer.id,
                  label: `${customer.firstName} ${customer.lastName}`,
                  value: customer.id,
                }))}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase()) ||
                  false
                }
              />
            </Form.Item>

            <Form.Item
              name={`unitNumberNew`}
              label={`หน่วย ${dayjs
                .utc(transactionData?.unitNew.date)
                .format('MMMBB')}`}
              rules={[
                {
                  required: true,
                  message: 'กรุณาระบุหน่วย',
                },
              ]}
            >
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name={`unitNumberOld`}
              label={`หน่วย ${dayjs
                .utc(transactionData?.unitOld.date)
                .format(`MMMBB`)}`}
              rules={[
                {
                  required: true,
                  message: 'กรุณาระบุหน่วย',
                },
              ]}
            >
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name={`unitUsed`} label={`หน่วยที่ใช้`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={`amount`} label={`ราคา/หน่วย`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={`overDue`} label={`ยอดค้าง`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={`total`} label={`รวมสุทธิ์`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>

            <Divider />
            <div className="flex items-center justify-end gap-4">
              <Button type="default" htmlType="button" onClick={handleOnCancel}>
                ปิด
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isTransactionIdPending}
              >
                บันทึก
              </Button>
            </div>
          </Form>
        </Modal>
      )}

      {transactionMode === 'pay' && (
        <Modal
          title={`จ่าย: `}
          open={isOpenModal}
          onCancel={handleOnCancel}
          centered
          // width={1200}
          footer={null}
        >
          <Form
            form={payForm}
            onFinish={handleOnUpdatePayTransactionId}
            onValuesChange={handlePayValuesChange}
            layout="horizontal"
            wrapperCol={{
              span: 20,
            }}
            labelCol={{
              span: 8,
            }}
            labelAlign="left"
          >
            <Form.Item name={`date`} label="ประจำเดือน">
              <DatePicker
                disabled
                style={{ width: '100%' }}
                picker="month"
                format={`MM/YYYY`}
              />
            </Form.Item>

            <Form.Item name={`type`} label="ประเภท">
              <Select disabled style={{ width: '100%' }} options={typeList} />
            </Form.Item>

            <Form.Item name={`zoneId`} label="เขต">
              <Select
                disabled
                style={{ width: '100%' }}
                options={zoneListData?.data.map((zone) => ({
                  key: zone.id,
                  label: zone.zoneName,
                  value: zone.id,
                }))}
                onChange={(value) => {
                  setZoneId(value);
                }}
              />
            </Form.Item>

            <Form.Item name={`customerId`} label="ลูกค้า">
              <Select
                style={{ width: '100%' }}
                disabled
                loading={isCustomerListLoading || isCustomerListFetching}
                options={customerListData?.data.map((customer) => ({
                  key: customer.id,
                  label: `${customer.firstName} ${customer.lastName}`,
                  value: customer.id,
                }))}
                filterOption={(input, option) =>
                  option?.label.toLowerCase().includes(input.toLowerCase()) ||
                  false
                }
              />
            </Form.Item>

            <Form.Item name={`total`} label={`รวมสุทธิ์`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={`pay`} label={`ชำระ`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={`remain`} label={`คงเหลือ`}>
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>

            <Divider />
            <div className="flex items-center justify-end gap-4">
              <Button type="default" htmlType="button" onClick={handleOnCancel}>
                ปิด
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPayTransactionIdPending}
              >
                บันทึก
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}
