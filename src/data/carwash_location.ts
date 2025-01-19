import { ServiceType } from "../utils/enum";

const CARWASH_DATA = [
  {
    id: 1,
    latitude: 3.065161,
    longitude: 101.504936,
    title: "Lake Garden",
    reviews: [
      { user: "Abu", rating: 5, comment: "good2" },
      { user: "Ali", rating: 4, comment: "Clean and fast service." },
      { user: "Sara", rating: 5, comment: "Very satisfied with the service." },
    ],
    services: [
      { service: ServiceType.CAR_WASH, price: 20, duration: 3 },
      { service: ServiceType.INTERIOR_WASH, price: 30, duration: 2 },
      { service: ServiceType.CAR_SERVICE, price: 20, duration: 2 },
    ],
  },
  {
    id: 2,
    latitude: 3.071418, 
    longitude: 101.506460,
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
      { service: ServiceType.CAR_WASH, price: 120, duration: 1 },
      { service: ServiceType.CAR_POLISH, price: 180, duration: 2 },
      { service: ServiceType.TYRE_CARE, price: 100, duration: 3 },
    ],
  },
  {
    id: 3,
    latitude: 3.070797, 
    longitude: 101.499786,
    title: "Rapid Shine",
    reviews: [
      { user: "John", rating: 4, comment: "Quick service but a bit pricey." },
      { user: "Maya", rating: 5, comment: "Very thorough and professional." },
      { user: "Dan", rating: 4, comment: "Great experience overall." },
    ],
    services: [
      { service: ServiceType.CAR_POLISH, price: 170, duration: 1 },
      { service: ServiceType.INTERIOR_WASH, price: 140, duration: 2 },
      { service: ServiceType.CAR_SERVICE, price: 220, duration: 2 },
    ],
  },
  {
    id: 4,
    latitude: 3.067904, 
    longitude: 101.498692,
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
      { service: ServiceType.CAR_WASH, price: 110, duration: 2 },
      { service: ServiceType.CAR_SERVICE, price: 210, duration: 1 },
      { service: ServiceType.TYRE_CARE, price: 120, duration: 1 },
    ],
  },
  {
    id: 5,
    latitude: 3.068290, 
    longitude: 101.508949,
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
    services: [
      { service: ServiceType.CAR_POLISH, price: 190, duration: 2 },
      { service: ServiceType.INTERIOR_WASH, price: 160, duration: 3 },
    ],
  },
  {
    id: 6,
    latitude: 3.072982, 
    longitude: 101.498434,
    title: "Elite Car Spa",
    reviews: [
      { user: "Sam", rating: 4, comment: "Efficient and affordable." },
      { user: "Hana", rating: 5, comment: "They did an amazing job!" },
      { user: "Razak", rating: 5, comment: "Best car wash I’ve been to." },
      { user: "Sophia", rating: 4, comment: "Would definitely return." },
    ],
    services: [
      { service: ServiceType.CAR_WASH, price: 130, duration: 3 },
      { service: ServiceType.CAR_SERVICE, price: 230, duration: 1 },
      { service: ServiceType.TYRE_CARE, price: 110, duration: 1 },
    ],
  },
];

export default CARWASH_DATA;
