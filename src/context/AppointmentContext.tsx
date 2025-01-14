import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the structure of an appointment
export interface Appointment {
  id: number;
  job_description: string;
  price: number;
  duration: number;
  deadline: number;
  laxity: number;
}

// Define the context type
interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (newAppointment: Appointment) => void;
}

// Create the context
const AppointmentsContext = createContext<AppointmentsContextType | undefined>(
  undefined
);

// Create the provider component
export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    // {
    //   id: 1,
    //   job_description: "Car Wash",
    //   price: 10,
    //   duration: 2,
    //   deadline: 5,
    //   laxity: 0,
    // },
    // {
    //   id: 2,
    //   job_description: "Car Polish",
    //   price: 40,
    //   duration: 3,
    //   deadline: 8,
    //   laxity: 0,
    // },
    // {
    //   id: 3,
    //   job_description: "Interior Wash",
    //   price: 70,
    //   duration: 4,
    //   deadline: 10,
    //   laxity: 0,
    // },
    // {
    //   id: 4,
    //   job_description: "Car Service",
    //   price: 50,
    //   duration: 3,
    //   deadline: 7,
    //   laxity: 0,
    // },
    // {
    //   id: 5,
    //   job_description: "Tyre Care",
    //   price: 60,
    //   duration: 5,
    //   deadline: 9,
    //   laxity: 0,
    // },
  ]);

  // Function to add a new appointment
  const addAppointment = (newAppointment: Appointment) => {
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

// Create a custom hook for easier use of the context
export const useAppointments = (): AppointmentsContextType => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentsProvider"
    );
  }
  return context;
};
