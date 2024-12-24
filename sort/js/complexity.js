// 监听按钮点击事件，生成复杂度曲线
document.getElementById('generateBtn').addEventListener('click', generateComplexityCurve);

// 生成复杂度曲线的主要函数
function generateComplexityCurve() {
  const numPoints = parseInt(document.getElementById('numPoints').value); // 获取用户输入的点数
  const algorithm = document.getElementById('algorithm').value; // 获取选中的排序算法
  const canvas = document.getElementById('complexCanvas');  // 获取canvas元素
  const ctx = canvas.getContext('2d');  // 获取canvas的上下文

  // 设置Canvas的宽高，增大画布以显示更多内容
  canvas.width = 1200;  // 增加画布宽度
  canvas.height = 600;  // 增加画布高度

  // 设置横坐标n，从1到numPoints，等间隔增长
  const xValues = Array.from({ length: numPoints }, (_, i) => i + 1);

  // 初始化纵坐标（时间t）
  let yValues = [];

  // 根据选择的算法计算每个n对应的t
  if (algorithm === 'bubbleSort') {
    yValues = xValues.map(x => x * x); // O(n^2)
  } else if (algorithm === 'quickSort') {
    yValues = xValues.map(x => x * Math.log(x)); // O(n log n)
  } else if (algorithm === 'mergeSort') {
    yValues = xValues.map(x => x * Math.log(x)); // O(n log n)
  }

  // 绘制坐标轴和网格
  drawAxes(ctx, canvas, numPoints, xValues, yValues);  // 将canvas传递给drawAxes

  // 设置动画的逐点绘制
  let currentIndex = 0;

  // 动态绘制每个点
  function drawPoint() {
    if (currentIndex >= numPoints) {
      // 如果所有点都绘制完成，连接点
      connectPoints();
      return;
    }

    // 计算当前点的坐标
    const x = (xValues[currentIndex] - 1) * (canvas.width - 100) / (numPoints - 1) + 50;  // 调整n的横坐标放大比例
    const y = canvas.height - (yValues[currentIndex] / Math.max(...yValues)) * (canvas.height - 100) - 50;  // 调整t的纵坐标放大比例

    // 绘制当前点
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#007bff';  // 点的颜色
    ctx.fill();

    // 更新当前索引
    currentIndex++;

    // 每隔50毫秒绘制下一个点
    setTimeout(drawPoint, 88);
  }

  // 连接所有的点，绘制直线
  function connectPoints() {
    ctx.beginPath();
    const firstX = (xValues[0] - 1) * (canvas.width - 100) / (numPoints - 1) + 50;
    const firstY = canvas.height - (yValues[0] / Math.max(...yValues)) * (canvas.height - 100) - 50;
    ctx.moveTo(firstX, firstY); // 起点

    for (let i = 1; i < numPoints; i++) {
      const x = (xValues[i] - 1) * (canvas.width - 100) / (numPoints - 1) + 50;
      const y = canvas.height - (yValues[i] / Math.max(...yValues)) * (canvas.height - 100) - 50;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#007bff'; // 曲线颜色
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // 清除画布
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 动态绘制每个点
  drawPoint();

  saveToDatabase(algorithm, numPoints);
}

// 绘制坐标轴和网格函数
function drawAxes(ctx, canvas, numPoints, xValues, yValues) {
  const padding = 50;
  const xAxisStart = padding;
  const yAxisStart = canvas.height - padding;
  const xAxisEnd = canvas.width - padding;
  const yAxisEnd = padding;

  // 绘制网格
  drawGrid(ctx, canvas, numPoints, xValues, yValues);

  // 绘制X轴 (数组大小n)
  ctx.beginPath();
  ctx.moveTo(xAxisStart, yAxisStart);
  ctx.lineTo(xAxisEnd, yAxisStart); // 横坐标
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 绘制Y轴 (时间t)
  ctx.beginPath();
  ctx.moveTo(xAxisStart, yAxisStart);
  ctx.lineTo(xAxisStart, yAxisEnd); // 纵坐标
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 添加X轴的刻度和标签
  const xStep = (xAxisEnd - xAxisStart) / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const x = xAxisStart + i * xStep;
    ctx.beginPath();
    ctx.moveTo(x, yAxisStart); // 刻度线
    ctx.lineTo(x, yAxisStart + 5);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 添加X轴标签
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.fillText(xValues[i], x - 5, yAxisStart + 20); // 标签数字
  }

  // 添加Y轴的刻度和标签
  const maxY = Math.max(...yValues); // 获取最大y值，用于缩放
  const yStep = (yAxisStart - yAxisEnd) / 6; // 增加纵向刻度
  for (let i = 0; i <= 6; i++) {
    const y = yAxisStart - i * yStep;
    ctx.beginPath();
    ctx.moveTo(xAxisStart - 5, y); // 刻度线
    ctx.lineTo(xAxisStart, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 添加Y轴标签
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    const label = Math.round((i * maxY) / 6); // 计算对应的标签
    ctx.fillText(label, xAxisStart - 30, y + 5); // 标签数字
  }

  // 添加坐标轴标签
  ctx.fillStyle = '#000';
  ctx.font = '14px Arial';
  ctx.fillText('n (Array Size)', xAxisEnd - 100, yAxisStart + 20);
  ctx.fillText('t (Sorting Time)', xAxisStart - 40, yAxisEnd + 30);
}

// 绘制网格线
function drawGrid(ctx, canvas, numPoints, xValues, yValues) {
  const padding = 50;
  const xAxisStart = padding;
  const yAxisStart = canvas.height - padding;
  const xAxisEnd = canvas.width - padding;
  const yAxisEnd = padding;

  // 绘制横向网格线
  const yStep = (yAxisStart - yAxisEnd) / 6;
  for (let i = 0; i <= 6; i++) {
    const y = yAxisStart - i * yStep;
    ctx.beginPath();
    ctx.moveTo(xAxisStart, y); // 网格线从X轴到Y轴
    ctx.lineTo(xAxisEnd, y);  // 横向网格线
    ctx.strokeStyle = '#e0e0e0'; // 网格线颜色
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 绘制纵向网格线
  const xStep = (xAxisEnd - xAxisStart) / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const x = xAxisStart + i * xStep;
    ctx.beginPath();
    ctx.moveTo(x, yAxisStart); // 网格线从Y轴到X轴
    ctx.lineTo(x, yAxisEnd);   // 纵向网格线
    ctx.strokeStyle = '#e0e0e0'; // 网格线颜色
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function saveToDatabase(algorithm, numPoints) {
    const data = new FormData();
    data.append('algorithm_name', algorithm);
    data.append('num', numPoints);
  
    fetch('../save_curve_data.php', {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data saved successfully:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }