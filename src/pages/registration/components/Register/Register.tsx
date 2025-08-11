import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./Register.module.scss";

import { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import statesData from "./cities.json";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";
import CloudLeft from "/svgs/registration/left.svg";
import CloudRight from "/svgs/registration/right.svg";

type FormData = {
  name: string;
  email_id: string;
  // dob: string;
  gender: string;
  phone: string;
  college_id: string;
  year: string;
  state: string;
  city: string;
};

interface StateItem {
  state: string;
  cities: string[];
}

const typedStatesData: StateItem[] = statesData;

const registrationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
  // dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  college_id: yup.string().required("College is required"),
  year: yup.string().required("Year of study is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
});

type PropsType = {
  onClickNext: () => void;
  userEmail: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

const Register = forwardRef<HTMLFormElement, PropsType>(
  ({ onClickNext, userEmail, setUserData }, ref) => {
    const [selectedState, setSelectedState] = useState("");
    const [availableCities, setAvailableCities] = useState<string[]>([]);
    const [interestOptions, setInterestOptions] = useState<
      { id: number; name: string }[]
    >([]);
    const [collegeOptions, setCollegeOptions] = useState<
      { id: number; name: string }[]
    >([]);

    useEffect(() => {
      axios
        .get(
          "https://merge.bits-apogee.org/2025/main/registrations/categories/"
        )
        .then((response) => {
          setInterestOptions(response.data.data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }, []);

    useEffect(() => {
      axios
        .get(
          "https://merge.bits-apogee.org/2025/main/registrations/get_college/"
        )
        .then((response) => {
          setCollegeOptions(response.data.data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }, []);

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
      setUserData(data);
      onClickNext();
    };

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.registrationForm}
        ref={ref}
      >
        <div className={styles.formColumns}>
          <div className={styles.left}>
            <div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>NAME</label>
              <img src={Right} alt="" />
            </div>
            <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />
              <input {...register("name")} />
              <img src={CloudRight} alt="" />
            </div>
            <p>{errors.name?.message}</p>
            <div className={styles.email} style={{ marginLeft: "-1.5vw" }}>
              <div className={styles.sameline}>
                <img src={Left} alt="" />
                <label>EMAIL </label>
                <img src={Right} alt="" />
              </div>
              <div className={styles.clouds}>
                <img src={CloudLeft} alt="" />
                <input
                  {...register("email_id")}
                  value={userEmail}
                  disabled
                  placeholder={userEmail}
                />
                <img src={CloudRight} alt="" />
              </div>
              <p>{errors.email_id?.message}</p>
            </div>
            <div className={styles.together}>
              <div className={styles.fields}>
                <div className={styles.field1}>
                  <label className={styles.gendob}>GENDER</label>

                  <div className={styles.clouds}>
                    <img src={CloudLeft} alt="" />
                    <select {...register("gender")}>
                      <option value="">-- Select --</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                    </select>
                  </div>

                  <p>{errors.gender?.message}</p>
                </div>
                {/* <div className={styles.field2}>
                  <label className={styles.gendob}>DATE OF BIRTH</label>

                  <div className={styles.clouds}>
                    <img src="" alt="" />
                    <input type="date" {...register("dob")} />

                    <img src={CloudRight} alt="" />
                  </div>
                  <p>{errors.dob?.message}</p>
                </div> */}
                <div className={styles.clouds}>
                  <img src={CloudLeft} alt="" />
                  <select {...register("college_id")}>
                    <option value="">-- Select --</option>
                    {(Array.isArray(interestOptions)
                      ? interestOptions
                      : []
                    ).map((college, index) => (
                      <option key={index} value={college.name}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                  <img src={CloudRight} alt="" />
                </div>
              </div>
            </div>
            <div className={styles.mobile} style={{ marginLeft: "3.5vw" }}>
              <div className={styles.sameline}>
                <img src={Left} alt="" />
                <label>MOBILE NUMBER </label>
                <img src={Right} alt="" />
              </div>
              <div className={styles.clouds}>
                <img src={CloudLeft} alt="" />
                <input {...register("phone")} />
                <img src={CloudRight} alt="" />
              </div>
              <p>{errors.phone?.message}</p>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.college} style={{ marginLeft: "2.5vw" }}>
              <div className={styles.sameline}>
                <img src={Left} alt="" />
                <label>COLLEGE NAME </label>
                <img src={Right} alt="" />
              </div>
              <div className={styles.clouds}>
                <img src={CloudLeft} alt="" />
                <select {...register("college_id")}>
                  <option value="">-- Select --</option>
                  {(Array.isArray(collegeOptions) ? collegeOptions : []).map(
                    (college, index) => (
                      <option key={index} value={college.id}>
                        {college.name}
                      </option>
                    )
                  )}
                </select>
                <img src={CloudRight} alt="" />
              </div>

              <p>{errors.college_id?.message}</p>
            </div>
            <div className={styles.year} style={{ marginLeft: "4.5vw" }}>
              <div className={styles.sameline}>
                <img src={Left} alt="" />
                <label>YEAR OF STUDY </label>
                <img src={Right} alt="" />
              </div>
              <div className={styles.clouds}>
                <img src={CloudLeft} alt="" />
                <fieldset
                  className={styles.radioGroup}
                  aria-label="Year of Study"
                >
                  {["1", "2", "3", "4", "5"].map((year) => (
                    <label key={year} className={styles.radioLabel}>
                      <input
                        type="radio"
                        value={year}
                        {...register("year")}
                        className={styles.radioInput}
                      />
                      <span className={styles.yearNumber}>{year}</span>
                    </label>
                  ))}
                </fieldset>
                <img src={CloudRight} alt="" />
              </div>
              <p className={styles.error}>{errors.year?.message}</p>
            </div>

            <p>{errors.year?.message}</p>
            <div className={styles.state} style={{ marginLeft: "3vw" }}>
              <div className={styles.sameline}>
                <img src={Left} alt="" />
                <label>STATE OF RESIDENCE</label>
                <img src={Right} alt="" />
              </div>
              <div className={styles.clouds}>
                <img src={CloudLeft} alt="" />

                <select {...register("state")} onChange={handleStateChange}>
                  <option value="">-- Select --</option>
                  {typedStatesData.map((stateItem, index) => (
                    <option key={index} value={stateItem.state}>
                      {stateItem.state}
                    </option>
                  ))}
                </select>
                <img src={CloudRight} alt="" />
              </div>
              <p>{errors.state?.message}</p>
            </div>
            <div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>CITY </label>
              <img src={Right} alt="" />
            </div>

            <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />

              <select {...register("city")} disabled={!selectedState}>
                <option value="">-- Select --</option>
                {availableCities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <img src={CloudRight} alt="" />
            </div>
            <p>{errors.city?.message}</p>
          </div>
        </div>

        <button className={styles.submitBtn} type="submit">
          NEXT
        </button>
        {/* <button type="submit" className={styles.submitBtn}>
          NEXT
        </button> */}
      </form>
    );
  }
);

export default Register;
