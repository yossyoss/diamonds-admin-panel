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
          label: "Top Videos: ",
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
    var sortable = [];
    for (var vehicle in newObj) {
      sortable.push([vehicle, newObj[vehicle]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    sortable.map(s => {
      primengObj.labels.push(s[0]);
    });
    sortable.map(s => {
      primengObj.datasets[0].data.push(s[1]);
    });
    let index = 0;
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
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
            label: "Top Videos: ",
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
  //new method specific for store.ts
  calculateStoresBarChart(data, title = "Top Stores:") {
    let newObj = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: title,
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
    data.forEach(data => {
      if (newObj[data.storename]) {
        newObj[data.storename] += data.total;
      } else {
        newObj[data.storename] = data.total;
      }
    });
    var sortable = [];
    for (var vehicle in newObj) {
      sortable.push([vehicle, newObj[vehicle]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    sortable.map(s => {
      primengObj.labels.push(s[0]);
    });
    sortable.map(s => {
      primengObj.datasets[0].data.push(s[1]);
    });
    let index = 0;
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
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
            label: title,
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

  //new method specific for top-sales
  calculateSalesBarChart(data, title = "Top Stores:") {
    let newObj = {};
    const mapping = {};
    let primengObj = {
      labels: [],
      datasets: [
        {
          label: title,
          data: [],
          hoverBackgroundColor: [],
          mapping: {},
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
    data.forEach(data => {
      const name = `${data.user.firstName} ${data.user.lastName}`;
      const id = data.user.id;
      mapping[name] = id;
      if (newObj[data.user.store]) {
        newObj[name] += data.total;
      } else {
        newObj[name] = data.total;
      }
    });
    primengObj.datasets[0].mapping = mapping;
    var sortable = [];
    for (var vehicle in newObj) {
      sortable.push([vehicle, newObj[vehicle]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    sortable.map(s => {
      primengObj.labels.push(s[0]);
    });
    sortable.map(s => {
      primengObj.datasets[0].data.push(s[1]);
    });
    let index = 0;
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
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
            label: title,
            data: [1],
            fill: true,
            mapping: {},
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
