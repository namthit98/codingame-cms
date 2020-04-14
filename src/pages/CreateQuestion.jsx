import React, { useState } from "react";
import { Steps, Button, notification } from "antd";
import BasicInfoQuestion from "./BasicInfoQuestion";

const { Step } = Steps;

const steps = [
  {
    title: "Basic info",
    content: <BasicInfoQuestion />,
  },
  {
    title: "Suggestions",
    content: "Second-content",
  },
  {
    title: "Test cases",
    content: "Last-content",
  },
];

const CreateQuestion = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (current) => {
    setCurrent(current)
  }

  return (
    <div>
      <Steps current={current}  onChange={onChange}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => notification.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: 8 }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateQuestion;
