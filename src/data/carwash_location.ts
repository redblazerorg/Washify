import { ServiceType } from "../utils/enum";

const CARWASH_DATA = [
  {
    id: 1,
    latitude: 2.9205118608687073,
    longitude: 101.63704000089737,
    title: "Lake Garden",
    reviews: [
      { user: "Abu", rating: 5, comment: "good2" },
      { user: "Ali", rating: 4, comment: "Clean and fast service." },
      { user: "Sara", rating: 5, comment: "Very satisfied with the service." },
    ],
    services: [
      ServiceType.CAR_WASH,
      ServiceType.INTERIOR_WASH,
      ServiceType.CAR_SERVICE,
    ],
  },
  {
    id: 2,
    latitude: 2.921018224553574,
    longitude: 101.63813901364176,
    title: "Lake Jen Car",
    reviews: [
      {
        user: "Zain",
        rating: 3,
        comment: "Service was okay, but could be better.",
      },
      { user: "Nina", rating: 4, comment: "Friendly staff and good work." },
      {
        user: "Hadi",
        rating: 5,
        comment: "Excellent service! Highly recommend.",
      },
    ],
    services: [
      ServiceType.CAR_WASH,
      ServiceType.CAR_POLISH,
      ServiceType.TYRE_CARE,
    ],
  },
  {
    id: 3,
    latitude: 2.9221,
    longitude: 101.6392,
    title: "Rapid Shine",
    reviews: [
      { user: "John", rating: 4, comment: "Quick service but a bit pricey." },
      { user: "Maya", rating: 5, comment: "Very thorough and professional." },
      { user: "Dan", rating: 4, comment: "Great experience overall." },
    ],
    services: [
      ServiceType.CAR_POLISH,
      ServiceType.INTERIOR_WASH,
      ServiceType.CAR_SERVICE,
    ],
  },
  {
    id: 4,
    latitude: 2.9233,
    longitude: 101.6403,
    title: "Super Wash Hub",
    reviews: [
      {
        user: "Ravi",
        rating: 5,
        comment: "Exceptional quality and attention to detail.",
      },
      { user: "Lina", rating: 4, comment: "Good service, but took a while." },
      { user: "Fahmi", rating: 4, comment: "Nice and friendly service." },
    ],
    services: [
      ServiceType.CAR_WASH,
      ServiceType.CAR_SERVICE,
      ServiceType.TYRE_CARE,
    ],
  },
  {
    id: 5,
    latitude: 2.9244,
    longitude: 101.6414,
    title: "Pristine Auto Care",
    reviews: [
      {
        user: "Aisyah",
        rating: 5,
        comment: "Amazing service! My car looks brand new.",
      },
      { user: "Farid", rating: 4, comment: "Good job but slightly expensive." },
      {
        user: "Janet",
        rating: 5,
        comment: "Highly recommended for anyone nearby.",
      },
    ],
    services: [ServiceType.CAR_POLISH, ServiceType.INTERIOR_WASH],
  },
  {
    id: 6,
    latitude: 2.9255,
    longitude: 101.6425,
    title: "Elite Car Spa",
    reviews: [
      { user: "Sam", rating: 4, comment: "Efficient and affordable." },
      { user: "Hana", rating: 5, comment: "They did an amazing job!" },
      { user: "Razak", rating: 5, comment: "Best car wash I’ve been to." },
      { user: "Sophia", rating: 4, comment: "Would definitely return." },
    ],
    services: [
      ServiceType.CAR_WASH,
      ServiceType.CAR_SERVICE,
      ServiceType.TYRE_CARE,
    ],
  },
];

export default CARWASH_DATA;
