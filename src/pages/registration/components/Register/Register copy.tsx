import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
//import type { SingleValue } from "react-select";

import styles from "./Register.module.scss";

// import type { SingleValue } from "react-select";

import { useEffect, useState, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import statesData from "./cities.json";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";
// import CloudLeft from "/svgs/registration/left.svg";
// import CloudRight from "/svgs/registration/right.svg";
// import { scale } from "framer-motion";

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
    const [availableCities, setAvailableCities] = useState<
      { value: string; label: string }[]
    >([]);
    const [collegeOptions, setCollegeOptions] = useState<
      { value: string; label: string }[]
    >([]);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      axios
        .get(
          "https://merge.bits-oasis.org/2025/main/registrations/get_college/"
        )
        .then((response) => {
          setCollegeOptions(
            response.data.data.map((college: { id: number; name: string }) => ({
              value: String(college.id),
              label: college.name,
            }))
          );
        })
        .catch((error) => console.error("Error fetching colleges:", error));
    }, []);

    const getAvailableCities = (stateName: string) =>
      (
        typedStatesData.find((item) => item.state === stateName)?.cities ?? []
      ).map((city) => ({ value: city, label: city }));

    useEffect(() => {
      setAvailableCities(getAvailableCities(selectedState));
    }, [selectedState]);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
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
    const isMobile = window.innerWidth < 720;
    const customStyles = {
      noOptionsMessage: (provided: any) => ({
        ...provided,
        color: "white",
        backgroundColor: "#00000061",
        padding: "10px",
        textAlign: "center",
      }),
      control: (provided: any, state: any) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 0,
        scale: 0.55,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: state.isFocused ? "none" : provided.boxShadow,
        outline: "none",
        background: "transparent",
        border: "none",
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
        paddingLeft: "30%",
      }),
      input: (provided: any) => ({
        ...provided,
        textAlign: "center",
        padding: 0,
        margin: 0,
        color: "white",
      }),
      placeholder: (provided: any) => ({
        ...provided,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        textAlign: "center",
        color: "white",
        padding: 0,
        margin: 0,
        whiteSpace: "nowrap",
      }),
      menu: (provided: any) => ({
        ...provided,
        marginTop: 0,
        width: isMobile ? "50vw" : "30vw",
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
        padding: 0,
        height: "4vh",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
    const customStylesGender = {
      control: (provided: any, state: any) => ({
        ...provided,
        paddingLeft: 0,
        paddingRight: 0,
        display: "flex",
        boxShadow: state.isFocused ? "none" : provided.boxShadow,
        outline: "none",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        border: "none",
        height: "2.3rem",
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
        height: "2.3rem",
        paddingLeft: 0,
      }),
      input: (provided: any) => ({
        ...provided,
        textAlign: "center",
        padding: 0,
        margin: 0,
        color: "white",
      }),
      placeholder: (provided: any, state: any) => ({
        ...provided,
        display:
          state.isFocused || state.selectProps.inputValue || state.value
            ? "none"
            : "block",
        color: "white",
        textAlign: "justify",
        paddingLeft: "40%",
      }),

      menu: (provided: any) => ({
        ...provided,
        marginTop: 0,
        width: isMobile ? "50vw" : "10vw",
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
        padding: 0,
        height: "2.3rem",
        background: "transparent",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
            <div className={styles.leftColumn}>
              <div className={styles.inputBox}>
                <div className={styles.labelBox}>
                  <img src={Left} alt="" />
                  <label>NAME</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.inputSubBox}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M37.998 1.71777C41.0941 0.335583 44.8533 0.4356 47.5908 0.949219L48.6973 1.15723L47.708 1.69434C46.5973 2.29676 44.9115 3.2945 43.7578 5.0293C42.6179 6.74361 41.9661 9.22683 43.0137 12.873C44.0171 16.3653 47.5484 17.9075 52.3242 18.5391C57.0778 19.1676 62.8266 18.8652 67.9844 18.8652H460.016C465.173 18.8652 470.922 19.1676 475.676 18.5391C480.452 17.9075 483.983 16.3653 484.986 12.873C486.034 9.22684 485.382 6.74361 484.242 5.0293C483.089 3.2945 481.403 2.29676 480.292 1.69434L479.303 1.15723L480.409 0.949219C483.147 0.4356 486.906 0.335583 490.002 1.71777C491.558 2.41238 492.951 3.48455 493.952 5.06641C494.953 6.64757 495.546 8.7124 495.546 11.3672V17.4893C496.292 16.1388 497.389 14.6254 498.825 13.3809C500.829 11.6446 503.512 10.4177 506.812 10.9199L507.133 10.9736L507.146 10.9756L507.158 10.9795C507.863 11.1576 508.583 11.6279 509.287 12.3086C509.995 12.9932 510.71 13.9134 511.401 15.0332C512.785 17.2739 514.098 20.3471 515.083 24.0215L515.087 24.0352L515.384 25.2588C516.153 28.2785 517.441 32.3922 519.124 36.1748C520.086 38.3364 521.172 40.3793 522.357 42.0449C523.547 43.7161 524.815 44.9745 526.127 45.6133L526.866 45.9736L526.127 46.333C524.815 46.9717 523.547 48.231 522.357 49.9023C521.172 51.5679 520.086 53.611 519.124 55.7725C517.2 60.0954 515.793 64.8506 515.087 67.9111L515.084 67.9248L514.697 67.8213L515.083 67.9248C514.098 71.5982 512.786 74.7129 511.402 76.9746C510.711 78.105 509.995 79.0325 509.285 79.7109C508.58 80.3845 507.852 80.8411 507.133 80.9736C503.685 81.6085 500.893 80.3577 498.825 78.5654C497.389 77.3208 496.292 75.8075 495.546 74.457V80.5801C495.546 83.3542 494.954 85.4803 493.953 87.0859C492.951 88.6937 491.555 89.7518 489.995 90.416C486.895 91.7363 483.134 91.5083 480.409 90.9971L479.303 90.7891L480.292 90.2529C481.364 89.6713 482.899 88.4828 483.982 86.8311C485.059 85.189 485.68 83.1059 484.986 80.6904C484.455 78.8397 483.169 77.4319 481.371 76.3574C479.568 75.28 477.27 74.5507 474.765 74.0615C469.754 73.0829 464.021 73.082 460.016 73.082H67.9844C63.9791 73.082 58.2465 73.0829 53.2354 74.0615C50.7304 74.5507 48.432 75.28 46.6289 76.3574C44.8309 77.4319 43.5454 78.8397 43.0137 80.6904C42.3197 83.1059 42.9411 85.189 44.0176 86.8311C45.1005 88.4828 46.6356 89.6713 47.708 90.2529L48.6973 90.7891L47.5908 90.9971C44.8658 91.5083 41.1051 91.7363 38.0049 90.416C36.4452 89.7518 35.0494 88.6937 34.0469 87.0859C33.0457 85.4803 32.4541 83.3542 32.4541 80.5801V74.457C31.708 75.8075 30.611 77.3208 29.1748 78.5654C27.1066 80.3577 24.3146 81.6085 20.8672 80.9736C20.1481 80.8411 19.4197 80.3844 18.7148 79.7109C18.0048 79.0325 17.2893 78.105 16.5977 76.9746C15.2139 74.7129 13.9021 71.5982 12.917 67.9248L12.9131 67.9111C12.2067 64.8506 10.7995 60.0954 8.87598 55.7725C7.91417 53.611 6.82817 51.5679 5.64258 49.9023C4.45285 48.231 3.18531 46.9717 1.87305 46.333L1.13379 45.9736L1.87305 45.6133C3.18521 44.9745 4.45293 43.7161 5.64258 42.0449C6.82822 40.3793 7.91413 38.3364 8.87598 36.1748C10.7997 31.8516 12.2067 27.0958 12.9131 24.0352L12.916 24.0215H12.917C13.9024 20.3471 15.2146 17.2739 16.5986 15.0332C17.2903 13.9134 18.0051 12.9932 18.7129 12.3086C19.4167 11.6279 20.137 11.1576 20.8418 10.9795L20.8545 10.9756L20.8672 10.9736C24.3145 10.3388 27.1067 11.5886 29.1748 13.3809C30.6109 14.6254 31.708 16.1388 32.4541 17.4893V11.3672C32.4541 8.7124 33.0469 6.64758 34.0479 5.06641C35.0493 3.48455 36.4423 2.41238 37.998 1.71777Z"
                      fill="#131313"
                      fill-opacity="0.8"
                      stroke="#FFF9E9"
                      stroke-width="0.8"
                    />
                    <path
                      d="M234 72.8994C235 76.5661 240.3 84.2994 247.5 81.8994C254.167 93.8994 275 93.8994 282 81.8994C286 81.8994 292.6 79.2994 293 72.8994H272.5L264 81.8994L255 72.8994H234Z"
                      fill="#1B1818"
                      stroke="#FFF9E9"
                      stroke-width="0.7"
                    />
                    <rect
                      x="254.102"
                      y="72.8994"
                      width="14"
                      height="14"
                      transform="rotate(-45 254.102 72.8994)"
                      fill="#FFF9E9"
                    />
                  </svg>
                  <input {...register("name")} className={styles.input} />
                </div>
                <p>{errors.name?.message}</p>
              </div>
              <div className={styles.inputBox}>
                <div className={styles.labelBox}>
                  <img src={Left} alt="" />
                  <label>EMAIL</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.inputSubBox}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M37.998 1.71777C41.0941 0.335583 44.8533 0.4356 47.5908 0.949219L48.6973 1.15723L47.708 1.69434C46.5973 2.29676 44.9115 3.2945 43.7578 5.0293C42.6179 6.74361 41.9661 9.22683 43.0137 12.873C44.0171 16.3653 47.5484 17.9075 52.3242 18.5391C57.0778 19.1676 62.8266 18.8652 67.9844 18.8652H460.016C465.173 18.8652 470.922 19.1676 475.676 18.5391C480.452 17.9075 483.983 16.3653 484.986 12.873C486.034 9.22684 485.382 6.74361 484.242 5.0293C483.089 3.2945 481.403 2.29676 480.292 1.69434L479.303 1.15723L480.409 0.949219C483.147 0.4356 486.906 0.335583 490.002 1.71777C491.558 2.41238 492.951 3.48455 493.952 5.06641C494.953 6.64757 495.546 8.7124 495.546 11.3672V17.4893C496.292 16.1388 497.389 14.6254 498.825 13.3809C500.829 11.6446 503.512 10.4177 506.812 10.9199L507.133 10.9736L507.146 10.9756L507.158 10.9795C507.863 11.1576 508.583 11.6279 509.287 12.3086C509.995 12.9932 510.71 13.9134 511.401 15.0332C512.785 17.2739 514.098 20.3471 515.083 24.0215L515.087 24.0352L515.384 25.2588C516.153 28.2785 517.441 32.3922 519.124 36.1748C520.086 38.3364 521.172 40.3793 522.357 42.0449C523.547 43.7161 524.815 44.9745 526.127 45.6133L526.866 45.9736L526.127 46.333C524.815 46.9717 523.547 48.231 522.357 49.9023C521.172 51.5679 520.086 53.611 519.124 55.7725C517.2 60.0954 515.793 64.8506 515.087 67.9111L515.084 67.9248L514.697 67.8213L515.083 67.9248C514.098 71.5982 512.786 74.7129 511.402 76.9746C510.711 78.105 509.995 79.0325 509.285 79.7109C508.58 80.3845 507.852 80.8411 507.133 80.9736C503.685 81.6085 500.893 80.3577 498.825 78.5654C497.389 77.3208 496.292 75.8075 495.546 74.457V80.5801C495.546 83.3542 494.954 85.4803 493.953 87.0859C492.951 88.6937 491.555 89.7518 489.995 90.416C486.895 91.7363 483.134 91.5083 480.409 90.9971L479.303 90.7891L480.292 90.2529C481.364 89.6713 482.899 88.4828 483.982 86.8311C485.059 85.189 485.68 83.1059 484.986 80.6904C484.455 78.8397 483.169 77.4319 481.371 76.3574C479.568 75.28 477.27 74.5507 474.765 74.0615C469.754 73.0829 464.021 73.082 460.016 73.082H67.9844C63.9791 73.082 58.2465 73.0829 53.2354 74.0615C50.7304 74.5507 48.432 75.28 46.6289 76.3574C44.8309 77.4319 43.5454 78.8397 43.0137 80.6904C42.3197 83.1059 42.9411 85.189 44.0176 86.8311C45.1005 88.4828 46.6356 89.6713 47.708 90.2529L48.6973 90.7891L47.5908 90.9971C44.8658 91.5083 41.1051 91.7363 38.0049 90.416C36.4452 89.7518 35.0494 88.6937 34.0469 87.0859C33.0457 85.4803 32.4541 83.3542 32.4541 80.5801V74.457C31.708 75.8075 30.611 77.3208 29.1748 78.5654C27.1066 80.3577 24.3146 81.6085 20.8672 80.9736C20.1481 80.8411 19.4197 80.3844 18.7148 79.7109C18.0048 79.0325 17.2893 78.105 16.5977 76.9746C15.2139 74.7129 13.9021 71.5982 12.917 67.9248L12.9131 67.9111C12.2067 64.8506 10.7995 60.0954 8.87598 55.7725C7.91417 53.611 6.82817 51.5679 5.64258 49.9023C4.45285 48.231 3.18531 46.9717 1.87305 46.333L1.13379 45.9736L1.87305 45.6133C3.18521 44.9745 4.45293 43.7161 5.64258 42.0449C6.82822 40.3793 7.91413 38.3364 8.87598 36.1748C10.7997 31.8516 12.2067 27.0958 12.9131 24.0352L12.916 24.0215H12.917C13.9024 20.3471 15.2146 17.2739 16.5986 15.0332C17.2903 13.9134 18.0051 12.9932 18.7129 12.3086C19.4167 11.6279 20.137 11.1576 20.8418 10.9795L20.8545 10.9756L20.8672 10.9736C24.3145 10.3388 27.1067 11.5886 29.1748 13.3809C30.6109 14.6254 31.708 16.1388 32.4541 17.4893V11.3672C32.4541 8.7124 33.0469 6.64758 34.0479 5.06641C35.0493 3.48455 36.4423 2.41238 37.998 1.71777Z"
                      fill="#131313"
                      fill-opacity="0.8"
                      stroke="#FFF9E9"
                      stroke-width="0.8"
                    />
                    <path
                      d="M234 72.8994C235 76.5661 240.3 84.2994 247.5 81.8994C254.167 93.8994 275 93.8994 282 81.8994C286 81.8994 292.6 79.2994 293 72.8994H272.5L264 81.8994L255 72.8994H234Z"
                      fill="#1B1818"
                      stroke="#FFF9E9"
                      stroke-width="0.7"
                    />
                    <rect
                      x="254.102"
                      y="72.8994"
                      width="14"
                      height="14"
                      transform="rotate(-45 254.102 72.8994)"
                      fill="#FFF9E9"
                    />
                  </svg>
                  <input
                    value={userEmail}
                    disabled
                    placeholder={userEmail}
                    className={styles.input}
                  />
                </div>
                <p>{errors.email_id?.message}</p>
              </div>

              <div className={styles.together}>
                <div className={styles.fields}>
                  <div className={styles.field1}>
                    <label className={styles.sameline}>GENDER</label>
                    <div className={styles.clouds}>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                              { value: "Other", label: "Other" },
                            ]}
                            styles={customStylesGender}
                            placeholder="Gender"
                            onChange={(val) => field.onChange(val?.value || "")}
                            value={
                              field.value
                                ? { value: field.value, label: field.value }
                                : null
                            }
                            className={`${styles.selection} ${styles.genderSelect}`}
                            classNamePrefix="Select"
                          />
                        )}
                      />
                    </div>
                    <p>{errors.gender?.message}</p>
                  </div>

                  <div className={styles.referral}>
                    <div className={styles.sameline}>
                      <label>REFERRAL CODE </label>
                    </div>
                    <div className={styles.clouds}>
                      <input {...register("referral")} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.inputBox}>
                <div className={styles.labelBox}>
                  <img src={Left} alt="" />
                  <label>MOBILE NUMBER</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.inputSubBox}>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M37.998 1.71777C41.0941 0.335583 44.8533 0.4356 47.5908 0.949219L48.6973 1.15723L47.708 1.69434C46.5973 2.29676 44.9115 3.2945 43.7578 5.0293C42.6179 6.74361 41.9661 9.22683 43.0137 12.873C44.0171 16.3653 47.5484 17.9075 52.3242 18.5391C57.0778 19.1676 62.8266 18.8652 67.9844 18.8652H460.016C465.173 18.8652 470.922 19.1676 475.676 18.5391C480.452 17.9075 483.983 16.3653 484.986 12.873C486.034 9.22684 485.382 6.74361 484.242 5.0293C483.089 3.2945 481.403 2.29676 480.292 1.69434L479.303 1.15723L480.409 0.949219C483.147 0.4356 486.906 0.335583 490.002 1.71777C491.558 2.41238 492.951 3.48455 493.952 5.06641C494.953 6.64757 495.546 8.7124 495.546 11.3672V17.4893C496.292 16.1388 497.389 14.6254 498.825 13.3809C500.829 11.6446 503.512 10.4177 506.812 10.9199L507.133 10.9736L507.146 10.9756L507.158 10.9795C507.863 11.1576 508.583 11.6279 509.287 12.3086C509.995 12.9932 510.71 13.9134 511.401 15.0332C512.785 17.2739 514.098 20.3471 515.083 24.0215L515.087 24.0352L515.384 25.2588C516.153 28.2785 517.441 32.3922 519.124 36.1748C520.086 38.3364 521.172 40.3793 522.357 42.0449C523.547 43.7161 524.815 44.9745 526.127 45.6133L526.866 45.9736L526.127 46.333C524.815 46.9717 523.547 48.231 522.357 49.9023C521.172 51.5679 520.086 53.611 519.124 55.7725C517.2 60.0954 515.793 64.8506 515.087 67.9111L515.084 67.9248L514.697 67.8213L515.083 67.9248C514.098 71.5982 512.786 74.7129 511.402 76.9746C510.711 78.105 509.995 79.0325 509.285 79.7109C508.58 80.3845 507.852 80.8411 507.133 80.9736C503.685 81.6085 500.893 80.3577 498.825 78.5654C497.389 77.3208 496.292 75.8075 495.546 74.457V80.5801C495.546 83.3542 494.954 85.4803 493.953 87.0859C492.951 88.6937 491.555 89.7518 489.995 90.416C486.895 91.7363 483.134 91.5083 480.409 90.9971L479.303 90.7891L480.292 90.2529C481.364 89.6713 482.899 88.4828 483.982 86.8311C485.059 85.189 485.68 83.1059 484.986 80.6904C484.455 78.8397 483.169 77.4319 481.371 76.3574C479.568 75.28 477.27 74.5507 474.765 74.0615C469.754 73.0829 464.021 73.082 460.016 73.082H67.9844C63.9791 73.082 58.2465 73.0829 53.2354 74.0615C50.7304 74.5507 48.432 75.28 46.6289 76.3574C44.8309 77.4319 43.5454 78.8397 43.0137 80.6904C42.3197 83.1059 42.9411 85.189 44.0176 86.8311C45.1005 88.4828 46.6356 89.6713 47.708 90.2529L48.6973 90.7891L47.5908 90.9971C44.8658 91.5083 41.1051 91.7363 38.0049 90.416C36.4452 89.7518 35.0494 88.6937 34.0469 87.0859C33.0457 85.4803 32.4541 83.3542 32.4541 80.5801V74.457C31.708 75.8075 30.611 77.3208 29.1748 78.5654C27.1066 80.3577 24.3146 81.6085 20.8672 80.9736C20.1481 80.8411 19.4197 80.3844 18.7148 79.7109C18.0048 79.0325 17.2893 78.105 16.5977 76.9746C15.2139 74.7129 13.9021 71.5982 12.917 67.9248L12.9131 67.9111C12.2067 64.8506 10.7995 60.0954 8.87598 55.7725C7.91417 53.611 6.82817 51.5679 5.64258 49.9023C4.45285 48.231 3.18531 46.9717 1.87305 46.333L1.13379 45.9736L1.87305 45.6133C3.18521 44.9745 4.45293 43.7161 5.64258 42.0449C6.82822 40.3793 7.91413 38.3364 8.87598 36.1748C10.7997 31.8516 12.2067 27.0958 12.9131 24.0352L12.916 24.0215H12.917C13.9024 20.3471 15.2146 17.2739 16.5986 15.0332C17.2903 13.9134 18.0051 12.9932 18.7129 12.3086C19.4167 11.6279 20.137 11.1576 20.8418 10.9795L20.8545 10.9756L20.8672 10.9736C24.3145 10.3388 27.1067 11.5886 29.1748 13.3809C30.6109 14.6254 31.708 16.1388 32.4541 17.4893V11.3672C32.4541 8.7124 33.0469 6.64758 34.0479 5.06641C35.0493 3.48455 36.4423 2.41238 37.998 1.71777Z"
                      fill="#131313"
                      fill-opacity="0.8"
                      stroke="#FFF9E9"
                      stroke-width="0.8"
                    />
                    <path
                      d="M234 72.8994C235 76.5661 240.3 84.2994 247.5 81.8994C254.167 93.8994 275 93.8994 282 81.8994C286 81.8994 292.6 79.2994 293 72.8994H272.5L264 81.8994L255 72.8994H234Z"
                      fill="#1B1818"
                      stroke="#FFF9E9"
                      stroke-width="0.7"
                    />
                    <rect
                      x="254.102"
                      y="72.8994"
                      width="14"
                      height="14"
                      transform="rotate(-45 254.102 72.8994)"
                      fill="#FFF9E9"
                    />
                  </svg>
                  <input {...register("phone")} className={styles.input} />
                </div>
                <p>{errors.phone?.message}</p>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.college}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>COLLEGE NAME </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <Controller
                    name="college_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={collegeOptions}
                        styles={customStyles}
                        placeholder="Select College"
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? collegeOptions.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        className={styles.selection}
                        classNamePrefix="Select"
                      />
                    )}
                  />
                </div>
                <p>{errors.college_id?.message}</p>
              </div>

              <div className={styles.inputBox}>
                <div className={styles.labelBox}>
                  <img src={Left} alt="" />
                  <label>YEAR OF STUDY </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.inputSubBox}>
                  <div className={styles.radioGroup}>
                    {["1", "2", "3", "4", "5"].map((year) => (
                      <label key={year} className={styles.label}>
                        <input
                          type="radio"
                          value={year}
                          {...register("year")}
                          className={styles.radioInput}
                        />
                        <span className={styles.yearNumber}>{year}</span>
                      </label>
                    ))}
                  </div>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M37.998 1.71777C41.0941 0.335583 44.8533 0.4356 47.5908 0.949219L48.6973 1.15723L47.708 1.69434C46.5973 2.29676 44.9115 3.2945 43.7578 5.0293C42.6179 6.74361 41.9661 9.22683 43.0137 12.873C44.0171 16.3653 47.5484 17.9075 52.3242 18.5391C57.0778 19.1676 62.8266 18.8652 67.9844 18.8652H460.016C465.173 18.8652 470.922 19.1676 475.676 18.5391C480.452 17.9075 483.983 16.3653 484.986 12.873C486.034 9.22684 485.382 6.74361 484.242 5.0293C483.089 3.2945 481.403 2.29676 480.292 1.69434L479.303 1.15723L480.409 0.949219C483.147 0.4356 486.906 0.335583 490.002 1.71777C491.558 2.41238 492.951 3.48455 493.952 5.06641C494.953 6.64757 495.546 8.7124 495.546 11.3672V17.4893C496.292 16.1388 497.389 14.6254 498.825 13.3809C500.829 11.6446 503.512 10.4177 506.812 10.9199L507.133 10.9736L507.146 10.9756L507.158 10.9795C507.863 11.1576 508.583 11.6279 509.287 12.3086C509.995 12.9932 510.71 13.9134 511.401 15.0332C512.785 17.2739 514.098 20.3471 515.083 24.0215L515.087 24.0352L515.384 25.2588C516.153 28.2785 517.441 32.3922 519.124 36.1748C520.086 38.3364 521.172 40.3793 522.357 42.0449C523.547 43.7161 524.815 44.9745 526.127 45.6133L526.866 45.9736L526.127 46.333C524.815 46.9717 523.547 48.231 522.357 49.9023C521.172 51.5679 520.086 53.611 519.124 55.7725C517.2 60.0954 515.793 64.8506 515.087 67.9111L515.084 67.9248L514.697 67.8213L515.083 67.9248C514.098 71.5982 512.786 74.7129 511.402 76.9746C510.711 78.105 509.995 79.0325 509.285 79.7109C508.58 80.3845 507.852 80.8411 507.133 80.9736C503.685 81.6085 500.893 80.3577 498.825 78.5654C497.389 77.3208 496.292 75.8075 495.546 74.457V80.5801C495.546 83.3542 494.954 85.4803 493.953 87.0859C492.951 88.6937 491.555 89.7518 489.995 90.416C486.895 91.7363 483.134 91.5083 480.409 90.9971L479.303 90.7891L480.292 90.2529C481.364 89.6713 482.899 88.4828 483.982 86.8311C485.059 85.189 485.68 83.1059 484.986 80.6904C484.455 78.8397 483.169 77.4319 481.371 76.3574C479.568 75.28 477.27 74.5507 474.765 74.0615C469.754 73.0829 464.021 73.082 460.016 73.082H67.9844C63.9791 73.082 58.2465 73.0829 53.2354 74.0615C50.7304 74.5507 48.432 75.28 46.6289 76.3574C44.8309 77.4319 43.5454 78.8397 43.0137 80.6904C42.3197 83.1059 42.9411 85.189 44.0176 86.8311C45.1005 88.4828 46.6356 89.6713 47.708 90.2529L48.6973 90.7891L47.5908 90.9971C44.8658 91.5083 41.1051 91.7363 38.0049 90.416C36.4452 89.7518 35.0494 88.6937 34.0469 87.0859C33.0457 85.4803 32.4541 83.3542 32.4541 80.5801V74.457C31.708 75.8075 30.611 77.3208 29.1748 78.5654C27.1066 80.3577 24.3146 81.6085 20.8672 80.9736C20.1481 80.8411 19.4197 80.3844 18.7148 79.7109C18.0048 79.0325 17.2893 78.105 16.5977 76.9746C15.2139 74.7129 13.9021 71.5982 12.917 67.9248L12.9131 67.9111C12.2067 64.8506 10.7995 60.0954 8.87598 55.7725C7.91417 53.611 6.82817 51.5679 5.64258 49.9023C4.45285 48.231 3.18531 46.9717 1.87305 46.333L1.13379 45.9736L1.87305 45.6133C3.18521 44.9745 4.45293 43.7161 5.64258 42.0449C6.82822 40.3793 7.91413 38.3364 8.87598 36.1748C10.7997 31.8516 12.2067 27.0958 12.9131 24.0352L12.916 24.0215H12.917C13.9024 20.3471 15.2146 17.2739 16.5986 15.0332C17.2903 13.9134 18.0051 12.9932 18.7129 12.3086C19.4167 11.6279 20.137 11.1576 20.8418 10.9795L20.8545 10.9756L20.8672 10.9736C24.3145 10.3388 27.1067 11.5886 29.1748 13.3809C30.6109 14.6254 31.708 16.1388 32.4541 17.4893V11.3672C32.4541 8.7124 33.0469 6.64758 34.0479 5.06641C35.0493 3.48455 36.4423 2.41238 37.998 1.71777Z"
                      fill="#131313"
                      fill-opacity="0.8"
                      stroke="#FFF9E9"
                      stroke-width="0.8"
                    />
                    <path
                      d="M234 72.8994C235 76.5661 240.3 84.2994 247.5 81.8994C254.167 93.8994 275 93.8994 282 81.8994C286 81.8994 292.6 79.2994 293 72.8994H272.5L264 81.8994L255 72.8994H234Z"
                      fill="#1B1818"
                      stroke="#FFF9E9"
                      stroke-width="0.7"
                    />
                    <rect
                      x="254.102"
                      y="72.8994"
                      width="14"
                      height="14"
                      transform="rotate(-45 254.102 72.8994)"
                      fill="#FFF9E9"
                    />
                  </svg>
                  <p className={styles.error}>{errors.year?.message}</p>
                </div>
              </div>

              <div className={styles.states}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>STATE</label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={getFilteredOptions(inputValue)}
                        styles={customStyles}
                        onInputChange={(value) => setInputValue(value)}
                        filterOption={() => true}
                        value={
                          field.value
                            ? stateOptions.find(
                                (option) => option.value === field.value
                              ) || null
                            : null
                        }
                        onChange={(option) => {
                          const val = option?.value || "";
                          field.onChange(val);
                          setSelectedState(val);
                          setValue("city", "", { shouldValidate: true });
                        }}
                        placeholder="Enter State"
                        classNamePrefix="react-select"
                        className={styles.selection}
                      />
                    )}
                  />
                </div>
              </div>

              <div className={styles.city}>
                <div className={styles.sameline}>
                  <img src={Left} alt="" />
                  <label>CITY </label>
                  <img src={Right} alt="" />
                </div>
                <div className={styles.clouds}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={availableCities}
                        styles={customStyles}
                        placeholder="Select City"
                        isDisabled={!selectedState}
                        onChange={(val) => field.onChange(val?.value || "")}
                        value={
                          field.value
                            ? availableCities.find(
                                (c) => c.value === field.value
                              ) || null
                            : null
                        }
                        className={styles.selection}
                      />
                    )}
                  />
                </div>
                <p>{errors.city?.message}</p>
              </div>
            </div>
          </div>
        </form>

        <button
          className={styles.confirmButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <span> NEXT</span>
        </button>
      </div>
    );
  }
);

export default Register;
