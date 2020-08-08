import React, { useState } from "react";
import Action from "../actions";
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
} from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import countryList from "react-select-country-list";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const { Option } = Select;
const dateFormat = "MM/DD/YY";

function onChange(date, dateString) {}

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
  delete_data: (data) => dispatch({ type: "DELETE_DATA", data }),
  add_data: (data) => dispatch({ type: "ADD_DATA", data }),
});

function BoxInput(props) {
  const [tellData, setTellData] = useState("");
  const { data, set_data, delete_data, add_data, title } = props;

  const onFinish = (values) => {
    add_data(values);
  };

  return (
    <Card style={{ width: 1000, marginTop: 20 }}>
      {console.log("Received values of form: ", data.data)}
      <Form name="box_inputline1" onFinish={onFinish}>
        <Row>
          <Col>
            <Form.Item
              name={"title"}
              label="title"
              rules={[
                {
                  required: true,
                  message: "Please select your title !",
                },
              ]}
              className="boxline1"
            >
              <Select defaultValue="Mr." className="select-title">
                <Option value="Mr.">Mr.</Option>
                <Option value="Ms.">Ms.</Option>
                <Option value="Mrs.">Mrs.</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8} className="boxline1">
            <Form.Item
              name={"Firstname"}
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
              name={"Lastname"}
              label="Lastname: "
              rules={[
                {
                  required: true,
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
              name={"Birthday"}
              label="Birthday: "
              rules={[
                {
                  required: true,
                },
              ]}
              className="boxline1"
            >
              <DatePicker onChange={onChange} format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={8} className="boxline1">
            <Form.Item name={"Nationality"} label="Nationality: ">
              {Nationality()}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item
            name={"CityzenID"}
            label="CityzenID: "
            rules={[
              {
                required: true,
              },
            ]}
            className="boxline1"
          >
            <Space>
              <Input style={{ width: "30px", textAlign: "center" }} />
              <label className="label_cityzen">-</label>
              <Input style={{ width: "60px", textAlign: "center" }} />
              <label className="label_cityzen">-</label>
              <Input style={{ width: "50px", textAlign: "center" }} />
              <label className="label_cityzen">-</label>
              <Input style={{ width: "60px", textAlign: "center" }} />
              <label className="label_cityzen">-</label>
              <Input style={{ width: "30px", textAlign: "center" }} />
            </Space>
          </Form.Item>
        </Row>

        <Row>
          <Form.Item name={"Gender"} label="Gender: " className="boxline1">
            <Space>
              <Radio value={2}>male</Radio>
              <Radio value={2}>female</Radio>
              <Radio value={2}>uniSex</Radio>
            </Space>
          </Form.Item>
        </Row>

        <Row>
          <Form.Item name={"Gender"} label="Gender: " className="boxline1">
            <Space>
              <PhoneInput
                placeholder="Enter phone number"
                value={tellData}
                onChange={setTellData}
              />
            </Space>
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            name={"Passport No"}
            label="Passport No : "
            className="boxline1"
          >
            <Space>
              <Input />
            </Space>
          </Form.Item>
        </Row>

        <Row>
          <Form.Item
            name={"Expected Salary "}
            label="Expected Salary : "
            className="boxline1"
          >
            <Space>
              <Input />
              <label className="label_cityzen">THB</label>
            </Space>
          </Form.Item>
        </Row>
        <Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxInput);
