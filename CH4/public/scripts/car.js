class Component {
  static list = [];

  constructor() {
    if (this.constructor === Component) {
      throw new Error("Cannot instantiate from Abstract Class");
    }
  }

  render() {
    throw new Error("Cannot call render directly from Abstract Class");
  }
}

class Car extends Component {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    super();
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  rupiah(num) {
    return new Intl.NumberFormat("id-ID").format(num);
  }

  render() {
    return `
        <div class="card border-0 ">
          <div class="card-body card-filter card-car">
            <div class="text-center py-5">
              <img src="${this.image}" alt="${this.manufacture}" class="car-image" />
            </div>
            <h5 class="car-title">${this.manufacture}/${this.type}</h5>
            <h6 class="car-price">Rp ${this.rupiah(this.rentPerDay)} / hari</h6>
            <p class="car-text">${this.description}</p>
            <div>
              <p class="car-text">
                <img class="me-1" src="https://res.cloudinary.com/dhwwzz0u2/image/upload/v1698385882/challenge-1/icons/fi_users_s1tgxv.svg" /> 
                ${this.capacity} orang
              </p>
              <p class="car-text">
                <img class="me-1" src="https://res.cloudinary.com/dhwwzz0u2/image/upload/v1698385892/challenge-1/icons/fi_settings_zlzsro.svg" /> 
                ${this.transmission}
              </p>
              <p class="car-text mb-4">
                <img class="me-1" src="https://res.cloudinary.com/dhwwzz0u2/image/upload/v1698385900/challenge-1/icons/fi_calendar_lfuinl.svg" /> 
                Tahun ${this.year}
              </p>
            </div>

            <div>
              <button class="btn btn-success btn-card-filter">Pilih Mobil</button>
            </div>
          </div>
        </div>
    `;
  }
}
