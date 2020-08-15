import React from "react";
import moment from "moment";
import {
  Input,
  Select,
  Row,
  Col,
  Card,
  Form,
  DatePicker,
  Radio,
  Button,
  InputNumber,
} from "antd";
import "antd/dist/antd.css";
import countryList from "react-select-country-list";

import "react-phone-number-input/style.css";
import { getCountryCallingCode, getCountries } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

const { Option } = Select;
const dateFormat = "MM/DD/YY";

function onChange(date, dateString) {}

function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

function onChangesalary(value) {}

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

const InputForm = (props) => {
  const { handleSubmitedit, handleSubmit, editData, setedit } = props;
  const [form] = Form.useForm();

  const onFill = () => {
    form.setFieldsValue({
      title: editData.title,
      Firstname: editData.Firstname,
      Lastname: editData.Lastname,
      Birthday: editData?.Birthday,
      Nationality: editData.Nationality,
      CityzenID1: editData.CityzenID1,
      CityzenID2: editData.CityzenID2,
      CityzenID3: editData.CityzenID3,
      CityzenID4: editData.CityzenID4,
      CityzenID5: editData.CityzenID5,
      Gender: editData.Gender,
      MobileCountry: editData.MobileCountry,
      PassportNo: editData.PassportNo,
      ExpectedSalary: editData.ExpectedSalary,
      phone: editData.phone,
    });
  };
  if (editData !== "") {
    onFill();
  }
  const onFinish = (values) => {
    const isEdit = editData.type === "edit";

    if (isEdit) {
      const resultData = {
        ...values,
        rowkey: editData.rowkey,
      };

      handleSubmitedit(resultData);
      setedit("");
      form.resetFields();
    } else {
      const rowkey = moment().unix();
      const result = { ...values, rowkey };
      handleSubmit(result);
      form.resetFields();
    }
  };

  function PhoneCountry() {
    const country = getCountries();

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

  return (
    <Card>
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
          <Col span={5}>
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
          <Col span={2}>
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
  );
};

export default InputForm;
