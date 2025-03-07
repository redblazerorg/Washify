export const ServiceType = {
  CAR_WASH: "Car Wash",
  CAR_POLISH: "Car Polish",
  INTERIOR_WASH: "Interior Wash",
  CAR_SERVICE: "Car Service",
  TYRE_CARE: "Tyre Care",
};

export const ItemEnum = {
  // Home: "Home",
  Profile: "Profile",
  Location: "Location",
  Appointment: "Appointment",
};

export const ItemProfileEnum = {
  Edit: "Edit",
  Logout: "Logout",
};

export type ServiceType = keyof typeof ServiceType;
