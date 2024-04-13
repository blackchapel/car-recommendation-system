export const questions = [
  {
    question: "How do you like your vehicle?",
    options: [
      {
        key: "Station Wagon",
        value: {
          vehicle_size_class: "Station Wagon",
        },
      },
      {
        key: "Pickup Trucks",
        value: {
          vehicle_size_class: "Standard Pickup Trucks",
        },
      },
      {
        key: "Van",
        value: {
          vehicle_size_class: "Van",
        },
      },
      {
        key: "SUV",
        value: {
          vehicle_size_class: "Sport Utility Vehicle",
        },
      },
      {
        key: "Midsize Cars",
        value: {
          vehicle_size_class: "Midsize Cars",
        },
      },
    ],
  },
  {
    question: "What is your budget?",
    options: [
      {
        key: "Low",
        value: {
          price: "$30,000",
        },
      },
      {
        key: "Moderate",
        value: {
          price: "$70,000",
        },
      },
      {
        key: "Expensive",
        value: {
          price: "$200,000",
        },
      },
      {
        key: "Luxury",
        value: {
          price: "$500,000",
        },
      },
    ],
  },
  {
    question: "What do you prefer?",
    options: [
      {
        key: "Older Cars",
        value: {
          year: "2010",
        },
      },
      {
        key: "Newer Cars",
        value: {
          year: "2020",
        },
      },
      {
        key: "Latest Cars",
        value: {
          year: "2024",
        },
      },
    ],
  },
  {
    question: "How important is your car's mileage to you?",
    options: [
      {
        key: "Not Really",
        value: {
          city_mpg_for_fuel_type1: "24",
        },
      },
      {
        key: "Little",
        value: {
          city_mpg_for_fuel_type1: "40",
        },
      },
      {
        key: "Very",
        value: {
          city_mpg_for_fuel_type1: "60",
        },
      },
    ],
  },
  {
    question: "Are emissions and sustainibility important to you?",
    options: [
      {
        key: "Not Really",
        value: {
          co2_fuel_type1: "400",
          atv_type: "Petrol",
        },
      },
      {
        key: "Little",
        value: {
          co2_fuel_type1: "196",
          atv_type: "Hybrid",
        },
      },
      {
        key: "Very",
        value: {
          co2_fuel_type1: "70",
          atv_type: "EV",
        },
      },
    ],
  },
];
