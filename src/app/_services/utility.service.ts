import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilityService {
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
    for (const key in newObj) {
      if (newObj.hasOwnProperty(key)) {
        const total = newObj[key];
        primengObj.labels.push(key);
        primengObj.datasets[0].data.push(total);
        let color = this.getDynamicColors();
        primengObj.datasets[0].backgroundColor.push(color);
        primengObj.datasets[0].hoverBackgroundColor.push(color);
      }
    }
    return primengObj;
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
              console.log(tooltipItem);
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
          fill: true,
          backgroundColor: "#9CCC65",
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
}
