window.onload = event => {
  const isDisplayVisible = () => {
    if (!document.getElementById("counterDisplay")) {
      return false;
    }
    return true;
  };

  const elementExists = element => {
    if (!localStorage.getItem(element)) {
      return false;
    }
    return true;
  };

  const appendButton = () => {
    if (!isDisplayVisible) {
      return;
    }
    console.log("appbtnruns");
    let newHElement = document.createElement("li");
    var count = localStorage.getItem("counter");
    console.log(count);
    newHElement.innerHTML = `Posts counter: ${count}`;
    console.log(newHElement.innerHTML);
    newHElement.setAttribute("id", "counterDisplay");
    console.log(newHElement.attributes);
    document.getElementsByClassName("rules")[1].appendChild(newHElement);
  };

  const updateDisplayedValue = value => {
    let element = document.getElementById("counterDisplay");
    element.innerHTML = `Posts counter: ${value}`;
  };

  const initializeElementInLocalStorage = (el, val) => {
    localStorage.setItem(el, val);
  };

  const incremenetCounter = () => {
    if (!elementExists("counter")) {
      localStorage.counter = "2000";
    }
    let currentCount = parseInt(localStorage.getItem("counter"));
    currentCount++;
    console.log("pifipaf");
    localStorage.setItem("counter", currentCount);
    updateDisplayedValue(currentCount);
  };

  const initializeLocalStorage = () => {
    if (!elementExists("counter")) {
      initializeElementInLocalStorage("counter", 2000);
    }
    if (!elementExists("display")) {
      initializeElementInLocalStorage("display", "exists");
    }
  };

  initializeLocalStorage();
  appendButton();
  document.addEventListener("submit", incremenetCounter());
};
