import React, { useState } from "react";
import moment from "moment";
import Action from "../actions"; //chang
import { connect } from "react-redux";
import "./BoxInput.css";
import {
  Input,
  Select,
  Row,
  Col,
  Card,
  Form,
  DatePicker,
  Space,
  Radio,
  Button,
  Table,
  Tag,
  InputNumber,
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput, {
  getCountryCallingCode,
  getCountries,
} from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";
import flags from "react-phone-number-input/flags";

const { Option } = Select;
const dateFormat = "MM/DD/YY";

function onChange(date, dateString) {}
function onChangesalary(value) {
  // console.log("changed", value);
}
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}
function Nationality() {
  const country = countryList().getData();
  return (
    <Select>
      {country.map((item, index) => {
        return (
          <Option key={index} value={item.value}>
            {item.label}
          </Option>
        );
      })}
    </Select>
  );
}

const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = (dispatch) => ({
  set_data: (data) => dispatch({ type: "SET_DATA", data }),
  delete_data: (rowkey) => dispatch({ type: "DELETE_DATA", rowkey }),
  add_data: (data) => dispatch({ type: "ADD_DATA", data }),
});

function BoxInput(props) {
  const [tellData, setTellData] = useState("9999");
  const [country, setCountry] = useState("");
  const [editData, setEditData] = useState({});
  const { data, set_data, delete_data, add_data, title } = props;
  // console.log("test", en[country]);

  const handleEdit = (data) => {
    const result = { ...data, type: "edit" };
    setEditData(result);
  };
  //---------------------------------------------------phone start
  function PhoneCountry() {
    const country = getCountries();
    // console.log("c", country);
    return (
      <Select style={{ width: 120 }}>
        {country.map((item, index) => {
          return (
            <Option
              key={index}
              value={`${item}+${getCountryCallingCode(item)}`}
            >
              {en[item]}+{getCountryCallingCode(item)}
            </Option>
          );
        })}
      </Select>
    );
  }

  //---------------------------------------------------phone end
  //-----------------------------------------------------------------Check start

  //-----------------------------------------------------------------------------------tabel
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
              // console.log("line123",edit);
              onFill(edit);
              handleEdit(record);

              //set_data(record.rowkey);
            }}
          >
            EDIT
          </Button>
          <Button
            onClick={() => {
              delete_data(record.rowkey);
              console.log("row", record.rowkey);
            }}
          >
            DLETE
          </Button>
        </Space>
      ),
    },
  ];
  //-----------------------------------------------------------------------------------tabel end

  const [form] = Form.useForm();

  const onFill = (edit) => {
    console.log("fill");
    console.log(edit);
    form.setFieldsValue({
      title: edit[0].title,
      Firstname: edit[0].Firstname,
      Lastname: edit[0].Lastname,
      Birthday: edit[0].Birthday,
      Nationality: edit[0].Nationality,
      CityzenID1: edit[0].CityzenID1,
      CityzenID2: edit[0].CityzenID2,
      CityzenID3: edit[0].CityzenID3,
      CityzenID4: edit[0].CityzenID4,
      CityzenID5: edit[0].CityzenID5,
      Gender: edit[0].Gender,
      MobileCountry: edit[0].MobileCountry,
      PassportNo: edit[0].PassportNo,
      ExpectedSalary: edit[0].ExpectedSalary,
      phone: edit[0].phone,
    });
  };
  const onFinish = (values) => {
    const isEdit = editData.type === "edit";
    //--------------check edit and set
    if (isEdit) {
      const resultData = {
        ...values,
        rowkey: editData.rowkey,
      };
      console.log("onfi", resultData);
      console.log("in is edit");
      set_data(resultData);
      setEditData("");
      form.resetFields();
    }
    //--------------check edit end
    else {
      const rowkey = moment().unix();
      const result = { ...values, rowkey };
      add_data(result);
      form.resetFields();
    }
  };

  return (
    <div>
      <Card style={{ width: 1000, marginTop: 20 }}>
        {console.log("Received values of form: ", data.data)}
        <Form name="box_inputline1" onFinish={onFinish} form={form}>
          <Row>
            <Col>
              <Form.Item
                name="title"
                label="title"
                rules={[
                  {
                    required: true,
                    message: "Please select your title !",
                  },
                ]}
                className="boxline1"
              >
                <Select placeholder="Mr." className="select-title">
                  <Option value="Mr.">Mr.</Option>
                  <Option value="Ms.">Ms.</Option>
                  <Option value="Mrs.">Mrs.</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className="boxline1">
              <Form.Item
                name="Firstname"
                label="Firstname: "
                rules={[
                  {
                    required: true,
                    message: "Please select your Firstname !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8} className="boxline1">
              <Form.Item
                name="Lastname"
                label="Lastname: "
                rules={[
                  {
                    required: true,
                    message: "Please select your Lastname !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item
                name="Birthday"
                label="Birthday: "
                rules={[
                  {
                    required: true,
                    message: "Please choose Birthday ",
                  },
                ]}
                className="boxline1"
              >
                <DatePicker
                  onChange={onChange}
                  format={dateFormat}
                  disabledDate={disabledDate}
                />
              </Form.Item>
            </Col>

            <Col span={8} className="boxline1">
              <Form.Item name={"Nationality"} label="Nationality: ">
                {Nationality()}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item
                name="CityzenID1"
                label="CityzenID: "
                className="boxline1"
              >
                <Input
                  style={{ width: "50px", textAlign: "center" }}
                  maxLength={1}
                />
              </Form.Item>
            </Col>

            <label className="label_cityzen">-</label>
            <Form.Item name="CityzenID2" className="boxline1" type="number">
              <Input
                style={{ width: "60px", textAlign: "center" }}
                maxLength={4}
              />
            </Form.Item>
            <label className="label_cityzen">-</label>
            <Form.Item name="CityzenID3" className="boxline1">
              <Input
                style={{ width: "50px", textAlign: "center" }}
                maxLength={3}
              />
            </Form.Item>
            <label className="label_cityzen">-</label>
            <Form.Item name="CityzenID4" className="boxline1">
              <Input
                style={{ width: "60px", textAlign: "center" }}
                maxLength={4}
              />
            </Form.Item>
            <label className="label_cityzen">-</label>
            <Col>
              <Form.Item name="CityzenID5" className="boxline1">
                <Input
                  style={{ width: "50px", textAlign: "center" }}
                  maxLength={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item name="Gender" label="Gender: " className="boxline1">
                <Radio.Group>
                  <Radio value="Male">male</Radio>
                  <Radio value="Female">female</Radio>
                  <Radio value="UniSex">uniSex</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item
                name="MobileCountry"
                label="Mobile Phone: "
                className="boxline1"
                rules={[
                  {
                    required: true,
                    message: "Please choose Country ",
                  },
                ]}
              >
                {PhoneCountry()}
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                name="phone"
                className="boxline1"
                rules={[
                  {
                    required: true,
                    min: 9,
                    max: 9,
                    // pattern: "[0-9]*",
                    message: "Please enter correct Mobile Number ",
                  },
                ]}
              >
                <Input style={{ marginLeft: 10 }} maxLength={9} type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item
                name="PassportNo"
                label="Passport No : "
                className="boxline1"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item
                name="ExpectedSalary"
                label="Expected Salary : "
                className="boxline1"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Expected Salary ",
                    type: "number",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: 150 }}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={onChangesalary}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="THB" className="boxline1">
                <label>THB</label>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Table
          columns={columns}
          dataSource={data.data}
          rowKey={(record) => record.rowkey}
          rowSelection={data.data}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxInput);
