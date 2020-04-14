import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Select,
  Input,
  Form,
  InputNumber,
  Radio,
  DatePicker,
  Button,
  notification,
} from "antd";
const { Title } = Typography;
const { Option } = Select;

const layout = {
  wrapperCol: { span: 24 },
};
const BasicInfoQuestion = () => {
  const [imageLink, setImageLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    // setLoading(true);
    // const data = {
    //   ...values,
    //   phone: "0" + values.phone,
    //   birthday: values.birthday.toDate(),
    //   avatar: imageLink,
    // };
    // try {
    //   const result = await agent.post("/users", data);
    //   if (result && result.data.success) {
    //     onReset();
    //     notification.success({
    //       message: "Create user sucessfully!",
    //     });
    //   }
    // } catch (err) {
    //   console.log(err.response);
    //   notification.error({
    //     message: err.response.data.message,
    //   });
    // }
    // setLoading(false);
  };

  const onReset = () => {
    // form.resetFields();
    // setImageLink("");
  };
  return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{}}
      >
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 8, offset: 0 }}>
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item name="role" rules={[{ required: true }]}>
                  <Select placeholder="Choose difficult *">
                    <Option value="hard">Hard</Option>
                    <Option value="medium">Medium</Option>
                    <Option value="easy">Easy</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={{ span: 24 }} lg={{ span: 24 }}>
                <Form.Item
                  name="title"
                  type="text"
                  rules={[{ required: true, message: "Please input title" }]}
                >
                  <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Title *"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 16, offset: 0 }}>
            hello
          </Col>
          {/* <Col xs={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <Row type="flex" justify="center">
              <Col>
                <Button type="secondary" onClick={onReset}>
                  Reset
                </Button>
                &nbsp;
                <Button type="primary" htmlType="submit" loading={loading}>
                  Create
                </Button>
              </Col>
            </Row>
          </Col> */}
        </Row>
      </Form>
    </div>
  );
};

export default BasicInfoQuestion;
