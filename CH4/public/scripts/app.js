class App {
  constructor() {
    this.carContainerElement = document.getElementById("cars-container");
    this.btnSearch = document.getElementById("btn-search");
    this.typeDriver = document.getElementById("tipe-driver");
    this.inputDate = document.getElementById("date");
    this.inputTime = document.getElementById("time");
    this.penumpang = document.getElementById("penumpang");
  }

  async init() {
    await this.load();

    this.typeDriver.oninput = this.handleInputChange;
    this.inputDate.oninput = this.handleInputChange;
    this.inputTime.oninput = this.handleInputChange;

    this.typeDriver.onfocus = this.handleInputFocus;

    this.updateButtonState();

    this.btnSearch.onclick = this.filteredCars;
  }

  handleInputFocus = () => {
    // console.log("ok");
    // document.body.classList = "active-backdrop";
  };

  handleInputChange = () => {
    this.updateButtonState();
  };

  updateButtonState() {
    const selectedDriver = this.typeDriver.value;
    const selectedDate = this.inputDate.value;
    const selectedTime = this.inputTime.value;

    this.isBothInputFilled = selectedDriver && selectedDate && selectedTime;
    this.btnSearch.disabled = !this.isBothInputFilled;
  }

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  filteredCars = () => {
    const selectedDate = this.inputDate.value;
    const selectedTime = this.inputTime.value;
    const countPenumpang = parseInt(this.penumpang.value);

    const filteredCars = Car.list.filter((car) => {
      const timeZone = { timeZone: "Asia/Jakarta" };

      const carAvailableDate = new Date(car.availableAt);
      const carDateStr = carAvailableDate.toLocaleDateString("id-ID", timeZone);
      const selectedDateStr = new Date(selectedDate).toLocaleDateString("id-ID", timeZone);

      const carAvailableTime = new Date(car.availableAt).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (!isNaN(countPenumpang) && car.capacity < countPenumpang) {
        return false;
      }

      return carDateStr >= selectedDateStr && carAvailableTime >= selectedTime;
    });

    this.carContainerElement.innerHTML = "";

    if (filteredCars.length === 0) {
      this.carContainerElement.textContent = "No cars available on the selected date.";
    } else {
      filteredCars.forEach((car) => {
        const node = document.createElement("div");
        node.classList = "col-lg-4 mt-4";
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }
  };
}
