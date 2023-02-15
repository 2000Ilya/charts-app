function formatParamLayout(param) {
  return `${param.marker} ${param.seriesName} <b>${param.value}шт</b>`;
}

function getAvailableParams(params) {
  let availableParams = Array(4).fill(null);
  params.map((param) => {
    for (let i = 0; i < 4; i++) {
      if (i === param.componentIndex) {
        availableParams[i] = { param: param, value: param.value };
      }
    }
  });
  availableParams = availableParams.map((param) => {
    if (!param) {
      return { param: null, value: 0 };
    }
    return param;
  });

  return availableParams;
}

function calculateTooltipStats(params) {
  const inProgramSumValue = params[0].value + params[1].value;
  const outProgramSumValue = params[2].value + params[3].value;
  const sumValue =
    params[0].value + params[1].value + params[2].value + params[3].value;
  const inProgramPartValue =
    sumValue !== 0 ? (inProgramSumValue / sumValue) * 100 : 0;
  const outProgramPartValue =
    sumValue !== 0 ? (outProgramSumValue / sumValue) * 100 : 0;

  return {
    inProgramSumValue,
    outProgramSumValue,
    inProgramPartValue,
    outProgramPartValue,
  };
}

function tooltipFormatter(params) {
  const availableParams = getAvailableParams(params);

  const {
    inProgramSumValue,
    outProgramSumValue,
    inProgramPartValue,
    outProgramPartValue,
  } = calculateTooltipStats(availableParams);

  const firstAvailableParamIndex = availableParams.findIndex(
    (param) => param.param !== null
  );

  const axisValue = availableParams[firstAvailableParamIndex].param.axisValue;

  let paramsFormatted = [`<b>${axisValue} 2022</b>`];

  if (availableParams[0].param || availableParams[1].param) {
    paramsFormatted.push(
      `<b>В программе ${Math.round(
        inProgramPartValue
      )}% | ${inProgramSumValue}шт</b>`
    );
  }
  if (availableParams[0].param) {
    paramsFormatted.push(formatParamLayout(availableParams[0].param));
  }
  if (availableParams[1].param) {
    paramsFormatted.push(formatParamLayout(availableParams[1].param));
  }

  if (availableParams[2].param || availableParams[3].param) {
    paramsFormatted.push(
      `<b>Вне программы ${Math.round(
        outProgramPartValue
      )}% | ${outProgramSumValue}шт</b>`
    );
  }
  if (availableParams[2].param) {
    paramsFormatted.push(formatParamLayout(availableParams[2].param));
  }
  if (availableParams[3].param) {
    paramsFormatted.push(formatParamLayout(availableParams[3].param));
  }

  return paramsFormatted.join("<br>");
}

export default tooltipFormatter;
