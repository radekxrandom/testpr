swap = (arr, indF, indS) => {
  let temp = arr[indF];
  arr[indF] = arr[indS];
  arr[indS] = temp;
  return arr;
};

part = (arr, l, r) => {
  const pivot = arr[Math.floor((r + l) / 2)].id;
  var i = l;
  var j = r;

  while (i <= j) {
    while (arr[i].id < pivot) {
      i++;
    }
    while (arr[j].id < pivot) {
      j++;
    }

    if (i <= j) {
      this.swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
};

sort = (arr, l, r) => {
  var index;

  if (arr.length > 1) {
    l = typeof l != "number" ? 0 : l;
    r = typeof r != "number" ? arr.length - 1 : r;

    index = this.part(arr, l, r);

    if (l < index - 1) {
      arr = this.sort(arr, l, index - 1);
    }

    if (index < r) {
      arr = this.sort(arr, index, r);
    }
  }

  return arr;
};

let latestDate = Math.max.apply(
  null,
  objInc.data.incomes.map(e => {
    return new Date(e.date);
  })
);
let latestVal = objInc.data.incomes[objInc.data.incomes.indexOf(latestDate)];
console.log(objInc.data.incomes.indexOf(latestDate));

let incInfo = {
  total: totalInc,
  avg: totalInc / values.length,
  latest: values[-1]
};

var addIncome = sorted.map(async obj => {
  var objInc = await axios.get(
    `https://recruitment.hal.skygate.io/incomes/${obj.id}`
  );
  let values = objInc.data.incomes.map(obj => parseInt(obj.value));
  let totalInc = values.reduce((a, b) => a + b);
  let incInfo = {
    total: totalInc,
    avg: totalInc / values.length,
    latest: values[-1]
  };
  return incInfo;
});

console.log("sort");
if (field === "id") {
  console.log("id");
  this.setState({
    apiData:
      this.state.apiData[0].id === 1
        ? this.state.apiData.sort((a, b) => (a.id > b.id ? -1 : 1))
        : this.state.apiData.sort((a, b) => (a.id > b.id ? 1 : -1)),
    arrow: "id"
  });
} else if (field === "name") {
  this.setState({
    apiData:
      this.state.apiData[0].name < this.state.apiData[1].name
        ? this.state.apiData.sort((a, b) => (a.name > b.name ? -1 : 1))
        : this.state.apiData.sort((a, b) => (a.name > b.name ? 1 : -1)),
    arrow: "name"
  });
}

sortBy = field => {
  this.setState({
    apiData:
      this.state.apiData[0][field] < this.state.apiData[1][field]
        ? this.state.apiData.sort((a, b) => (a[field] > b[field] ? -1 : 1))
        : this.state.apiData.sort((a, b) => (a[field] > b[field] ? 1 : -1))
  });
  this.paginate(this.state.activePag);
};

sortBy = field => {
  if (field === "id") {
    console.log("id");
    this.setState({
      apiData:
        this.state.apiData[0].id === 1
          ? this.state.apiData.sort((a, b) => (a.id > b.id ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.id > b.id ? 1 : -1)),
      arrow: "id"
    });
  } else if (field === "name") {
    this.setState({
      apiData:
        this.state.apiData[0].name < this.state.apiData[1].name
          ? this.state.apiData.sort((a, b) => (a.name > b.name ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.name > b.name ? 1 : -1)),
      arrow: "name"
    });
  } else if (field === "city") {
    this.setState({
      apiData:
        this.state.apiData[0].city < this.state.apiData[1].city
          ? this.state.apiData.sort((a, b) => (a.city > b.city ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.city > b.city ? 1 : -1)),
      arrow: "city"
    });
  } else if (field === "total") {
    this.setState({
      apiData:
        this.state.apiData[0].total < this.state.apiData[1].total
          ? this.state.apiData.sort((a, b) => (a.total > b.total ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.total > b.total ? 1 : -1)),
      arrow: "total"
    });
  } else if (field === "avg") {
    this.setState({
      apiData:
        this.state.apiData[0].avg < this.state.apiData[1].avg
          ? this.state.apiData.sort((a, b) => (a.avg > b.avg ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.avg > b.avg ? 1 : -1)),
      arrow: "avg"
    });
  } else if (field === "latest") {
    this.setState({
      apiData:
        this.state.apiData[0].latest < this.state.apiData[1].latest
          ? this.state.apiData.sort((a, b) => (a.latest > b.latest ? -1 : 1))
          : this.state.apiData.sort((a, b) => (a.latest > b.latest ? 1 : -1)),
      arrow: "latest"
    });
  }
  this.paginate(this.state.activePag);
};

apiData.data.sort((a, b) => (a.id > b.id ? 1 : -1));

const get = eh => {
  return eh ? 0 : 1;
};

sortBy = field => {
  this.setState({
    apiData:
      this.state.apiData[0][field] < this.state.apiData[1][field]
        ? this.state.apiData.sort((a, b) => (a[field] > b[field] ? -1 : 1))
        : this.state.apiData.sort((a, b) => (a[field] > b[field] ? 1 : -1)),
    arrow: field
  });
  this.paginate(this.state.activePag);
};

this.setState({
  apiData:
    this.state.apiData[0][field] < this.state.apiData[1][field]
      ? this.quickSort(this.state.apiData, field)
      : this.quickSort(this.state.apiData, field, false),
  arrow: field
});

prom = inc => {
  return Promise.resolve("ok");
};

getData = async id => {
  let inc = await axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`);
  return this.prom(inc);
};
