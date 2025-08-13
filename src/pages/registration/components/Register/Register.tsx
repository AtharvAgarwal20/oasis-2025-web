import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";

import styles from "./Register.module.scss";

import type { SingleValue } from "react-select";

import { useEffect, useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import statesData from "./cities.json";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";
import CloudLeft from "/svgs/registration/left.svg";
import CloudRight from "/svgs/registration/right.svg";

interface StateItem {
  state: string;
  cities: string[];
}

const typedStatesData: StateItem[] = statesData;
const stateOptions = typedStatesData.map((item) => ({
  value: item.state,
  label: item.state,
}));
const registrationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email_id: yup.string().email("Invalid email"),
  gender: yup.string().required("Gender is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  college_id: yup.string().required("College is required"),
  year: yup.string().required("Year of study is required"),
  state: yup.string().required("State is required"),
  city: yup.string().required("City is required"),
  referral: yup.string().nullable().optional(),
});

type FormData = yup.InferType<typeof registrationSchema>;

type PropsType = {
  onClickNext: () => void;
  userEmail: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

const Register = forwardRef<HTMLDivElement, PropsType>(
  function RegisterComponent(props, ref) {
    const { onClickNext, userEmail, setUserData } = props;
    const [selectedState, setSelectedState] = useState("");
    const [availableCities, setAvailableCities] = useState<string[]>([]);
    /*const [interestOptions, setInterestOptions] = useState<
      { id: number; name: string }[]
    >([]);*/
    const [collegeOptions, setCollegeOptions] = useState<
      { id: number; name: string }[]
    >([]);

    /* useEffect(() => {
      axios
        .get(
          "https://merge.bits-oasis.org/2025/main/registrations/categories/"
        )
        .then((response) => {
          setInterestOptions(response.data.data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }, []);*/

    useEffect(() => {
      axios
        .get(
          "https://merge.bits-oasis.org/2025/main/registrations/get_college/"
        )
        .then((response) => {
          setCollegeOptions(response.data.data);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }, []);

    const getAvailableCities = (stateName: string): string[] =>
      typedStatesData.find((item) => item.state === stateName)?.cities ?? [];

    interface OptionType {
      value: string;
      label: string;
    }
    const handleStateChange = (option: SingleValue<OptionType>) => {
      const val = option?.value || "";
      setSelectedState(val);
      setValue("state", val, { shouldValidate: true });
      setValue("city", "", { shouldValidate: true }); // clear city on state change
    };

    useEffect(() => {
      setAvailableCities(getAvailableCities(selectedState));
    }, [selectedState]);

    // const [interests, setInterests] = useState<string[]>([]);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm<FormData>({
      resolver: yupResolver(registrationSchema as any),
      defaultValues: {
        name: "",
        email_id: userEmail,
        gender: "",
        phone: "",
        college_id: "",
        year: "",
        state: "",
        city: "",
        referral: null,
      },
    });

    const [inputValue, setInputValue] = useState("");
    /* const InterestSelectOptions = interestOptions.map(c => ({
    value: c.id.toString(),
    label: c.name,
  }));*/
    const getFilteredOptions = (input: string) => {
      if (!input) return stateOptions;

      const inputLower = input.toLowerCase();
      const startsWith = stateOptions.filter((opt) =>
        opt.label.toLowerCase().startsWith(inputLower)
      );
      const contains = stateOptions.filter(
        (opt) =>
          !opt.label.toLowerCase().startsWith(inputLower) &&
          opt.label.toLowerCase().includes(inputLower)
      );

      return [...startsWith, ...contains];
    };

    const customStyles = {
      noOptionsMessage: (provided: any) => ({
        ...provided,
        color: "white",
        backgroundColor: "#00000061",
        padding: "10px",
        textAlign: "center",
      }),
      control: (provided: any) => ({
        ...provided,
        textAlign: "center",
        paddingLeft: "5vw",
        border: "none",
        paddingRight: "5vw",
        width: "30vw",
        maxHeight: "2rem",
        background: "transparent",
        color: "white",
      }),
      menuList: (provided: any) => ({
        ...provided,
        padding: 0,
        margin: 0,
        backgroundColor: "#2e0505",
        color: "white",
        borderRadius: "10px",
        scrollbarWidth: "thin",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "white",
        textAlign: "center",
        height: "5vh",
        paddingLeft: "5vw",
      }),
      input: (provided: any) => ({
        ...provided,
        color: "white",
        textAlign: "center",
        marginLeft: "-80%",
        height: "5vh",
      }),
      placeholder: (provided: any) => ({
        ...provided,
        textAlign: "center",
        marginLeft: "20%",
      }),
      menu: (provided: any) => ({
        ...provided,
        marginTop: 0,
        width: "30vw",
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 10,
      }),
      option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "rgba(0,20,80,0.8)" : "#2e0505",
        color: "white",
        cursor: "pointer",
      }),
      valueContainer: (provided: any) => ({
        ...provided,
        width: "100%",
        padding: "0",
        height: "4vh",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }),
      dropdownIndicator: (provided: any) => ({
        ...provided,
        color: "white",
        display: "none",
        cursor: "pointer",
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    };

    const onSubmit = (data: any) => {
      setUserData({
        ...data,
        email_id: userEmail,
      });
      onClickNext();
    };

    return (
      <div className={styles.registerContainer} ref={ref}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registrationForm}
        >
          <div className={styles.formColumns}>
            <div className={styles.left}>
              <div className={styles.name}>
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
              </div>
              <div className={styles.email}>
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
                    <img src={Left} alt="" style={{ display: "none" }} />
                    <label className={styles.sameline}>GENDER</label>

                    <img src={Right} alt="" style={{ display: "none" }} />
                    <div className={styles.clouds}>
                      <img src={CloudLeft} alt="" />
                      <select
                        {...register("gender")}
                        style={{ paddingLeft: "30%" }}
                      >
                        <option value="">--Select--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
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

                  <div className={styles.referral} >
                    <div className={styles.sameline} style={{ width: "18vw" }}>
                      <label className="styles.gendob">REFERRAL CODE </label>
                    </div>
                    <div className={styles.clouds} style={{ width: "18vw" }}>
                      <img src={CloudLeft} alt="" />
                      <input
                        {...register("referral")}
                        style={{ width: "18vw" }}
                      />
                      <img src={CloudRight} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.mobile}>
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
              <div className={styles.college} >
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>COLLEGE NAME </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={CloudLeft} alt="" />
                  <select {...register("college_id")}>
                    <option value="">--Select--</option>
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
              <div className={styles.year}>
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
                    {["1", "2", "3", "4"].map((year) => (
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
                  <p className={styles.error}>{errors.year?.message}</p>
                </div>
              </div>

              <div className={styles.states} >
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>STATE</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <img src={CloudLeft} alt="" />
                  <Select
                    menuPortalTarget={null}
                    menuPosition="absolute"
                    options={getFilteredOptions(inputValue)}
                    styles={customStyles}
                    onInputChange={(value) => setInputValue(value)}
                    filterOption={() => true}
                    value={
                      stateOptions.find(
                        (option) => option.value === selectedState
                      ) || null
                    }
                    onChange={handleStateChange}
                    placeholder="Enter State"
                    classNamePrefix="react-select"
                  />

                  <img src={CloudRight} alt="" />
                </div>
              </div>
              <div className={styles.city} >
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>CITY </label>
                  <img src={Right} alt="" />
                </div>

                <div className={styles.clouds}>
                  <img src={CloudLeft} alt="" />

                  <select
                    {...register("city")}
                    disabled={!selectedState}
                    onChange={(e) =>
                      setValue("city", e.target.value, { shouldValidate: true })
                    }
                  >
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
          </div>
          {/* <button type="submit" className={styles.submitBtn}>
          NEXT
        </button> */}
        </form>
        <button
          className={styles.confirmButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.confirmIcon}
          >
            <path
              d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
              fill="white"
              stroke="white"
              strokeWidth="0.16"
            />
          </svg>
          NEXT
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.confirmIcon}
          >
            <path
              d="M0 3.80298C2.50922 3.80298 66.6863 5.62965 83.2277 6.54299L87.8205 3.80298L83.2277 0.925964L0 3.80298Z"
              fill="white"
              stroke="white"
              strokeWidth="0.16"
            />
          </svg>
        </button>
      </div>
    );
  }
);

export default Register;
