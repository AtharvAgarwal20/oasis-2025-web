import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import statesData from './cities.json';
import styles from './Registration.module.scss';
import Left from '/svgs/registration/leftarr.svg'
import Right from '/svgs/registration/rightarr.svg'
import CloudLeft from '/svgs/registration/left.svg'
import CloudRight from '/svgs/registration/right.svg'
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

const Registration = () => {
  const [selectedState, setSelectedState] = useState('');
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
        <h2 className={styles.title}>Registration</h2>
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

            <div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>EMAIL </label>
              <img src={Right} alt="" />
              
            </div>
            <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />
            <input {...register("email")} />
            <img src={CloudRight} alt="" />
            </div>
            <p>{errors.email?.message}</p>
            <div className={styles.together}>
              <div className={styles.fields}>
<div className={styles.field1}>
            <label className={styles.gendob}>GENDER</label>
            
              <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />
            <select {...register("gender")}>
              <option value="">-- Select --</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            </div>
              
            <p>{errors.gender?.message}</p>
            </div>
              <div className={styles.field2}>
              <label className={styles.gendob}>DATE OF BIRTH</label>
            
            <div className={styles.clouds}>
              <img src="" alt="" />
           <input type="date" {...register("dob")} />
            
              <img src={CloudRight} alt="" />
            </div>
            <p>{errors.dob?.message}</p>
            </div>
            </div>
            </div>

<div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>MOBILE NUMBER </label>
              <img src={Right} alt="" />
              
            </div>
            <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />
            <input {...register("mobile")} />
            <img src={CloudRight} alt="" />
            </div>
            <p>{errors.mobile?.message}</p>
          </div>

          <div className={styles.right}>
            <div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>COLLEGE NAME </label>
              <img src={Right} alt="" />
              
            </div>
            <div className={styles.clouds}>
              <img src={CloudLeft} alt="" />
             <select {...register("college")}>
              <option value="">-- Select --</option>
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
            </select>
            <img src={CloudRight} alt="" />
            </div>
           
            <p>{errors.college?.message}</p>
<div className={styles.sameline}>
              <img src={Left} alt="" />
              <label>YEAR OF STUDY </label>
              <img src={Right} alt="" />
              
            </div>
           <div className={styles.clouds}>
  <img src={CloudLeft} alt="" />
  <fieldset className={styles.radioGroup} aria-label="Year of Study">
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

</div>
<p className={styles.error}>{errors.year?.message}</p>

            <p>{errors.year?.message}</p>
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

        <button type="submit" className={styles.submitBtn}>
          NEXT
        </button>
      </form>
    </div>
  );
};

export default Registration;
