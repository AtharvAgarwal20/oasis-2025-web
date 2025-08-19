import { useEffect, useState, forwardRef, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import axios from "axios";
import * as yup from "yup";

import styles from "./Register.module.scss";
import statesData from "./cities.json";

import Left from "/svgs/registration/leftarr.svg";
import Right from "/svgs/registration/rightarr.svg";

// -------------------------- Types -------------------------- //
interface StateItem {
  state: string;
  cities: string[];
}

const typedStatesData: StateItem[] = statesData;

interface Option {
  value: string;
  label: string;
}

type FormData = {
  name: string;
  email_id: string;
  gender: string;
  phone: string;
  college_id: string;
  year: string;
  state: string;
  city: string;
  referral?: string | null;
};

type PropsType = {
  onClickNext: () => void;
  userEmail: string;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
};

// -------------------------- Validation -------------------------- //
const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Name is required"),
  email_id: yup.string().email("Invalid email").required("Email is required"),
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

// -------------------------- Register Component -------------------------- //
const Register = forwardRef<HTMLDivElement, PropsType>(
  ({ onClickNext, userEmail, setUserData }, ref) => {
    const [selectedState, setSelectedState] = useState("");
    const [collegeOptions, setCollegeOptions] = useState<Option[]>([]);
    const [inputValue, setInputValue] = useState("");

    // Pre-mapped state options
    const stateOptions = useMemo(
      () =>
        typedStatesData.map((item) => ({
          value: item.state,
          label: item.state,
        })),
      []
    );

    const availableCities = useMemo<Option[]>(() => {
      return (
        typedStatesData
          .find((item) => item.state === selectedState)
          ?.cities.map((city) => ({ value: city, label: city })) ?? []
      );
    }, [selectedState]);

    // Fetch colleges once
    useEffect(() => {
      axios
        .get(
          "https://merge.bits-oasis.org/2025/main/registrations/get_college/"
        )
        .then((res) => {
          setCollegeOptions(
            res.data.data.map((c: { id: number; name: string }) => ({
              value: String(c.id),
              label: c.name,
            }))
          );
        })
        .catch((err) => console.error("Error fetching colleges:", err));
    }, []);

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      control,
    } = useForm<FormData>({
      resolver: yupResolver(schema),
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

    const onSubmit = (data: FormData) => {
      setUserData({ ...data, email_id: userEmail });
      onClickNext();
    };

    const filterStates = (input: string) => {
      if (!input) return stateOptions;
      const search = input.toLowerCase();
      return [
        ...stateOptions.filter((s) => s.label.toLowerCase().startsWith(search)),
        ...stateOptions.filter(
          (s) =>
            !s.label.toLowerCase().startsWith(search) &&
            s.label.toLowerCase().includes(search)
        ),
      ];
    };

    return (
      <div className={styles.registerContainer} ref={ref}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.registrationForm}
        >
          <div className={styles.formColumns}>
            {/* ---------------- LEFT ---------------- */}
            <div className={styles.left}>
              <FormField
                label="NAME"
                iconLeft={Left}
                iconRight={Right}
                error={errors.name?.message}
              >
                <input {...register("name")} />
              </FormField>

              <FormField
                label="EMAIL"
                iconLeft={Left}
                iconRight={Right}
                error={errors.email_id?.message}
              >
                <input value={userEmail} disabled />
              </FormField>

              <FormField label="GENDER" error={errors.gender?.message}>
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
                      styles={selectStyles("small")}
                      placeholder="Gender"
                      onChange={(val) => field.onChange(val?.value || "")}
                      value={
                        field.value
                          ? { value: field.value, label: field.value }
                          : null
                      }
                    />
                  )}
                />
              </FormField>

              <FormField label="REFERRAL CODE">
                <input {...register("referral")} />
              </FormField>

              <FormField
                label="MOBILE NUMBER"
                iconLeft={Left}
                iconRight={Right}
                error={errors.phone?.message}
              >
                <input {...register("phone")} />
              </FormField>
            </div>

            {/* ---------------- RIGHT ---------------- */}
            <div className={styles.right}>
              <FormField
                label="COLLEGE NAME"
                iconLeft={Left}
                iconRight={Right}
                error={errors.college_id?.message}
              >
                <Controller
                  name="college_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={collegeOptions}
                      placeholder="Select College"
                      styles={selectStyles("normal")}
                      onChange={(val) => field.onChange(val?.value || "")}
                      value={
                        collegeOptions.find((c) => c.value === field.value) ||
                        null
                      }
                    />
                  )}
                />
              </FormField>

              <FormField
                label="YEAR OF STUDY"
                iconLeft={Left}
                iconRight={Right}
                error={errors.year?.message}
              >
                <fieldset className={styles.radioGroup}>
                  {["1", "2", "3", "4"].map((yr) => (
                    <label key={yr}>
                      <input type="radio" value={yr} {...register("year")} />
                      <span>{yr}</span>
                    </label>
                  ))}
                </fieldset>
              </FormField>

              <FormField
                label="STATE"
                iconLeft={Left}
                iconRight={Right}
                error={errors.state?.message}
              >
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={filterStates(inputValue)}
                      placeholder="Enter State"
                      styles={selectStyles("normal")}
                      onInputChange={setInputValue}
                      filterOption={() => true}
                      value={
                        stateOptions.find((o) => o.value === field.value) ||
                        null
                      }
                      onChange={(opt) => {
                        const val = opt?.value || "";
                        field.onChange(val);
                        setSelectedState(val);
                        setValue("city", "", { shouldValidate: true });
                      }}
                    />
                  )}
                />
              </FormField>

              <FormField
                label="CITY"
                iconLeft={Left}
                iconRight={Right}
                error={errors.city?.message}
              >
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={availableCities}
                      placeholder="Select City"
                      styles={selectStyles("normal")}
                      isDisabled={!selectedState}
                      onChange={(opt) => field.onChange(opt?.value || "")}
                      value={
                        availableCities.find((c) => c.value === field.value) ||
                        null
                      }
                    />
                  )}
                />
              </FormField>
            </div>
          </div>
        </form>

        <button
          className={styles.confirmButton}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          <span>NEXT</span>
        </button>
      </div>
    );
  }
);

// -------------------------- Helper Components -------------------------- //
const FormField = ({
  label,
  children,
  error,
  iconLeft,
  iconRight,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  iconLeft?: string;
  iconRight?: string;
}) => (
  <div className={styles.field}>
    <div className={styles.sameline}>
      {iconLeft && <img src={iconLeft} alt="" />}
      <label>{label}</label>
      {iconRight && <img src={iconRight} alt="" />}
    </div>
    <div className={styles.clouds}>{children}</div>
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

// -------------------------- Styles Extract -------------------------- //
const selectStyles = (variant: "normal" | "small") => ({
  control: (p: any) => ({
    ...p,
    background: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: variant === "small" ? "2rem" : "2.5rem",
    alignItems: "center",
    justifyContent: "center",
  }),
  singleValue: (p: any) => ({ ...p, color: "white", textAlign: "center" }),
  placeholder: (p: any) => ({ ...p, color: "white", textAlign: "center" }),
  menu: (p: any) => ({
    ...p,
    background: "#2e0505",
    color: "white",
    borderRadius: "10px",
  }),
  option: (p: any, state: any) => ({
    ...p,
    backgroundColor: state.isFocused ? "rgba(0,20,80,0.8)" : "#2e0505",
    color: "white",
  }),
});

export default Register;
