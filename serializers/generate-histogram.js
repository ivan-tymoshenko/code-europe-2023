import { writeFile } from 'node:fs/promises'

import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default async function (results, type) {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width: 1200,
    height: 600,
    backgroundColour: 'white',
    type: 'svg'
  })

  const labels = Object.keys(results)
  const dataset = Object.values(results)

  const image = chartJSNodeCanvas.renderToBufferSync({
    type: 'bar',
    data: {
      datasets: [
        {
          label: 'Basic serialization',
          data: dataset,
          datalabels: {
            color: 'black',
            font: {
              size: 18
            },
            anchor: 'end',
            align: 'top',
            formatter: (value) => value.toLocaleString('en-US')
          }
        }
      ],
      labels
    },
    options: {
      backgroundColor: 'rgb(0, 39, 61)',
      borderColor: 'black',
      scales: {
        y: {
          ticks: {
            stepSize: 50000,
            color: 'black',
            font: {
              size: 18
            }
          },
          beginAtZero: true,
        },
        x: {
          ticks: {
            color: 'black',
            font: {
              size: 22
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      layout: {
        padding: 30
      }
    },
    plugins: [ChartDataLabels]
  }, 'image/jpeg')

  await writeFile('chart.svg', image)
}
