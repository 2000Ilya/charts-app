function formatParamLayout(param) {
  return `<span class='flex-row'><span>${param.marker} ${param.data.tooltipName}</span> <b>${param.value} шт.</b></span>`;
}

function getAvailableParams(params) {
  let availableParams = Array(4).fill(null);
  params.map((param) => {
    for (let i = 0; i < 4; i++) {
      if (i === param.componentIndex) {
        availableParams[i] = param;
      }
    }
  });
  availableParams = availableParams.map((param) => {
    if (!param) {
      return null;
    }
    return param;
  });

  return availableParams;
}

function getParamValue(param) {
  return param ? param.value : 0;
}

function calculateTooltipStats(params) {
  const [paramValue0, paramValue1, paramValue2, paramValue3] = params.map(
    (param) => getParamValue(param)
  );
  const inProgramSumValue = paramValue0 + paramValue1;
  const outProgramSumValue = paramValue2 + paramValue3;
  const sumValue = paramValue0 + paramValue1 + paramValue2 + paramValue3;
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

function fillTooltip(availableParams, axisValue, tooltipStats) {
  const {
    inProgramPartValue,
    inProgramSumValue,
    outProgramPartValue,
    outProgramSumValue,
  } = tooltipStats;
  let tooltipData = [`<b>${axisValue} 2022</b>`];

  if (availableParams[0] || availableParams[1]) {
    tooltipData.push(
      `<b class='flex-row'>В программе <span>${Math.round(
        inProgramPartValue
      )}% | ${inProgramSumValue} шт.</span></b>`
    );
  }
  if (availableParams[0]) {
    tooltipData.push(formatParamLayout(availableParams[0]));
  }
  if (availableParams[1]) {
    tooltipData.push(formatParamLayout(availableParams[1]));
  }

  if (availableParams[2] || availableParams[3]) {
    tooltipData.push(
      `<b class='flex-row'>Вне программ <span>${Math.round(
        outProgramPartValue
      )}% | ${outProgramSumValue} шт.</span></b>`
    );
  }
  if (availableParams[2]) {
    tooltipData.push(formatParamLayout(availableParams[2]));
  }
  if (availableParams[3]) {
    tooltipData.push(formatParamLayout(availableParams[3]));
  }

  return `<div class='tooltip'>${tooltipData.join("")}</div>`;
}

function formatTooltip(params) {
  const availableParams = getAvailableParams(params);

  const tooltipStats = calculateTooltipStats(availableParams);

  const firstAvailableParamIndex = availableParams.findIndex(
    (param) => param !== null
  );

  const axisValue = availableParams[firstAvailableParamIndex].axisValue;

  return fillTooltip(availableParams, axisValue, tooltipStats);
}

export default formatTooltip;
