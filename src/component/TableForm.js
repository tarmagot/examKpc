import React, { useState } from "react";
import { Card, Table, Button, Space, Form } from "antd";

export const TableForm = (props) => {
  const {
    data,
    handleDelete,
    delete_all,

    gethandleEdit,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = data.data.length > 0;
  const [form] = Form.useForm();

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onClickselect = () => {
    delete_all(selectedRowKeys);
  };

  const handleEdit = (data) => {
    const result = { ...data, type: "edit" };

    gethandleEdit(result);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "Firstname",
      key: "Firstname",
      render: (text, record) => <label>{`${text} ${record.Lastname}`}</label>,
    },
    {
      title: "GENDER",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "MOBILE PHONE",
      dataIndex: "MobileCountry",
      key: "MobileCountry",
      render: (text, record) => <label>{`${text} ${record.phone}`}</label>,
    },
    {
      title: "NATIONALITY",
      dataIndex: "Nationality",
      key: "Nationality",
    },
    {
      title: "",
      key: "",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              const edit = data.data.filter(
                (data) => data.rowkey === record.rowkey
              );

              handleEdit(record);

              //set_data(record.rowkey);
            }}
          >
            EDIT
          </Button>
          <Button
            onClick={() => {
              handleDelete(record.rowkey);
            }}
          >
            DLETE
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ marginTop: 10 }}>
      <Button type="primary" disabled={!hasSelected} onClick={onClickselect}>
        DELETE
      </Button>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data.data}
        rowKey={(record) => record.rowkey}
        pagination={{ pageSize: 3, position: ["topRight"] }}
      />
    </Card>
  );
};

export default TableForm;
