import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilityService {
  coloerdObject = {};
  constructor() {}
  convertDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  getDynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  getStaticColors(i) {
    const coloredArr = [
      "#4bc0c0",
      "#c0caf1",
      "#e8a1d5",
      "#eca068",
      "#ecdd68",
      "#beec68",
      "#68ec9e",
      "#68e5ec",
      "#6890ec",
      "#9068ec",
      "#e568ec",
      "#ec68b0"
    ];
    if (coloredArr[i]) return coloredArr[i];
    return this.getDynamicColors();
  }

  calculatePieChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }
      ]
    };
    data.forEach(user => {
      if (newObj[user.jewelryDTO.barcode]) {
        newObj[user.jewelryDTO.barcode] += user.total;
      } else {
        newObj[user.jewelryDTO.barcode] = user.total;
      }
    });
    let index = 0;
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
        let color = this.getStaticColors(index);
        primengObj.datasets[0].backgroundColor.push(color);
        primengObj.datasets[0].hoverBackgroundColor.push(color);
        index++;
      }
    }

    if (!primengObj.labels.length) {
      primengObj = this.setDefaultEmptyPieChart();
    }
    return primengObj;
  }
  setDefaultEmptyPieChart() {
    const newPrimengObj = {
      labels: ["None"],
      datasets: [
        {
          data: [1],
          backgroundColor: ["#c5c5c5"],
          hoverBackgroundColor: ["#c5c5c5"]
        }
      ]
    };
    return newPrimengObj;
  }
  calculateLineChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: "Videos sent: ",
          data: [],
          fill: true,
          borderColor: "#4bc0c0"
        }
      ],
      options: {
        label: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    };
    data.forEach(user => {
      if (newObj[user.day]) {
        newObj[user.day] += user.total;
      } else {
        newObj[user.day] = user.total;
      }
    });
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
      }
    }

    return primengObj;
  }
  calculateBarChart(data) {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: "Videos sent: ",
          data: [],
          hoverBackgroundColor: [],
          backgroundColor: [],
          fill: true,
          borderColor: "#7CB342"
        }
      ],
      options: {
        label: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        }
      }
    };
    data.forEach(user => {
      if (newObj[user.jewelryDTO.barcode]) {
        newObj[user.jewelryDTO.barcode] += user.total;
      } else {
        newObj[user.jewelryDTO.barcode] = user.total;
      }
    });
    let index = 0;
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
        let color = this.getStaticColors(index);
        primengObj.datasets[0].backgroundColor.push(color);
        primengObj.datasets[0].hoverBackgroundColor.push(color);
        index++;
      }
    }
    if (!primengObj.labels.length) {
      primengObj = {
        labels: ["None"],
        datasets: [
          {
            label: "Videos sent: ",
            data: [1],
            fill: true,
            backgroundColor: ["#c5c5c5"],
            hoverBackgroundColor: ["#c5c5c5"],
            borderColor: "#c5c5c5"
          }
        ],
        options: {
          label: {
            display: false
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.yLabel;
              }
            }
          }
        }
      };
    }
    return primengObj;
  }
}
