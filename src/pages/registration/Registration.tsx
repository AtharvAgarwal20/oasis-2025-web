import * as yup from "yup";
import { useEffect, useState } from "react";

const registrationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  mobile: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  college: yup.string().required("College is required"),
  year: yup.string().required("Year of study is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
});

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FormData = {
  name: string;
  email: string;
  dob: string;
  gender: string;
  mobile: string;
  college: string;
  year: string;
  state: string;
  city: string;
};

import statesData from "./cities.json";

interface StateItem {
  state: string;
  cities: string[];
}

const typedStatesData: StateItem[] = statesData;

const colleges = [
  "University of Tokyo",
  "University of Cape Town",
  "Pontifical Catholic University of Chile",
  "Trinity College Dublin",
  "University of British Columbia",
  "BITS Pilani",
  "University of Melbourne",
  "Korea Advanced Institute of Science & Technology (KAIST)",
  "Sciences Po",
  "University of São Paulo",
];

import styles from "./Registration.module.scss";

const Registration = () => {
  const [selectedState, setSelectedState] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  const getAvailableCities = (stateName: string): string[] =>
    typedStatesData.find((item) => item.state === stateName)?.cities ?? [];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const state = e.target.value;
    setSelectedState(state);
    setAvailableCities([]);
  };

  useEffect(() => {
    setAvailableCities(getAvailableCities(selectedState));
  }, [selectedState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className={styles.reg}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registrationForm}
      >
        <h2 className={styles.title}>Registration</h2>
        <div className={styles.formColumns}>
          <div className={styles.left}>
            <label>NAME</label>
            <input {...register("name")} />
            <p>{errors.name?.message}</p>

            <label>EMAIL ID</label>
            <input {...register("email")} />
            <p>{errors.email?.message}</p>

            <label>DATE OF BIRTH</label>
            <input type="date" {...register("dob")} />
            <p>{errors.dob?.message}</p>

            <label>GENDER</label>
            <select {...register("gender")}>
              <option value="">-- Select --</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            <p>{errors.gender?.message}</p>

            <label>MOBILE NUMBER</label>
            <input {...register("mobile")} />
            <p>{errors.mobile?.message}</p>
          </div>

          <div className={styles.right}>
            <label>COLLEGE NAME</label>
            <select {...register("college")}>
              <option value="">-- Select --</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
            </select>
            <p>{errors.college?.message}</p>

            <label>YEAR OF STUDY</label>
            <select {...register("year")}>
              <option value="">-- Select --</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            <p>{errors.year?.message}</p>

            <label>STATE OF RESIDENCE</label>
            <select {...register("state")} onChange={handleStateChange}>
              <option value="">-- Select --</option>
              {typedStatesData.map((stateItem, index) => (
                <option key={index} value={stateItem.state}>
                  {stateItem.state}
                </option>
              ))}
            </select>
            <p>{errors.state?.message}</p>

            <label>CITY</label>
            <select {...register("city")} disabled={!selectedState}>
              <option value="">-- Select --</option>
              {availableCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p>{errors.city?.message}</p>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          NEXT
        </button>
      </form>
    </div>
  );
};

export default Registration;
