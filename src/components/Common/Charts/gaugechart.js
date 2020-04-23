import React, { useState, useRef, useEffect } from "react";
import { cloneDeep } from "lodash";
import ReactEcharts from "echarts-for-react";

const getOption = () => {
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    toolbox: {
      feature: {
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: "Business indicator",
        type: "gauge",
        detail: { formatter: "{value}%" },
        axisLine: {
          lineStyle: {
            color: [
              [0.2, "#02a499"],
              [0.8, "#3c4ccf"],
              [1, "#ec4561"],
            ],
            width: 20,
          },
        },
        data: [{ value: 50, name: "Completion rate" }],
      },
    ],
  };
};

const Guage = () => {
  const [options, setOptions] = useState(getOption());
  const timeTicket = useRef(null);

  useEffect(() => {
    if (timeTicket.current) {
      clearInterval(timeTicket.current);
    }
    timeTicket.current = setInterval(() => {
      const option = cloneDeep(options);
      option.series[0].data.value = (Math.random() * 100).toFixed(2) - 0;
      setOptions(option);
    }, 2000);

    return () => {
      if (timeTicket.current) {
        clearInterval(timeTicket.current);
      }
    };
  }, []);

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "100%" }} option={getOption()} />
    </React.Fragment>
  );
};

export default Guage;
