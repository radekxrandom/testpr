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
