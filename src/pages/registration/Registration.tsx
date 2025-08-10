import * as yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import statesData from './cities.json';
import styles from './Registration.module.scss';
import Left from '/svgs/registration/leftarr.svg'
import Right from '/svgs/registration/rightarr.svg'
import CloudLeft from '/svgs/registration/left.svg'
import CloudRight from '/svgs/registration/right.svg'

import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import single from "/svgs/registration/single.svg"
import gsap from 'gsap/all';
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
/*
<svg width="547" height="163" viewBox="0 0 547 163" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="path" d="M540.5 3.9999C549.667 28.1666 553.5 88.8999 495.5 138.5C491 140.833 474.8 139.6 446 116C418 82.3332 357.9 16.0999 341.5 20.4999C332 22.9999 310.1 31.8999 298.5 47.4999C288.833 69.9999 260.9 124.3 226.5 161.5C208.667 159.5 162.3 147.6 119.5 116C105.5 73.1666 72 -9.2001 50 3.9999C28 17.1999 8.16667 38.4999 1 47.4999C7.5 63.9999 25.7 104.4 46.5 134C72.5 171 120.5 19.4999 165 33.4999C209.5 47.4999 272.5 114.5 278.5 126.5C284.5 138.5 400.5 96.4999 438.5 40.9999C468.9 -3.40012 519.167 -2.16678 540.5 3.9999Z" stroke="#FF0000"/>
</svg>
<svg width="66" id="rect"height="34" viewBox="0 0 66 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M65.6486 17.7599C64.7585 17.8023 64.1415 17.8312 63.0186 17.8842C64.1766 19.3479 65.089 20.5007 66 21.6527C63.7274 21.068 61.5847 20.5553 59.6993 19.2023C57.1835 17.3989 54.5633 15.7092 51.4081 15.2147C50.098 15.0084 48.7916 14.762 47.5023 14.4533C44.0204 13.6183 41.333 15.2959 38.8231 17.3443C37.9368 18.0685 37.2071 18.7359 35.9582 18.7382C35.2576 18.7382 34.5563 19.2873 33.5804 19.7089C35.941 23.4152 39.2036 25.5296 42.6468 27.7638C42.179 28.1483 41.847 28.4918 41.4516 28.7307C40.569 29.2669 39.6901 29.8433 38.7411 30.2301C37.8853 30.5774 36.9497 30.7814 36.0305 30.8936C34.7242 31.0552 33.4028 31.109 32.0867 31.1439C31.0571 31.1735 30.0223 31.156 28.9965 31.0726C27.2014 30.9247 26.9321 30.8474 26.8537 28.9385C26.7082 25.3665 24.8094 23.064 22.1571 21.0831C19.5518 19.1379 17.5687 19.3093 15.0499 21.3243C11.8127 23.9119 10.2116 27.4149 8.93576 31.3206C7.91959 31.4685 6.82359 31.5496 6.46249 32.9656C6.35356 33.394 5.55525 33.6413 5.03001 34C3.74451 32.0259 4.61146 29.7075 2.98798 27.7683C2.52391 28.849 2.15013 29.731 1.61667 30.9771C1.39136 30.2862 1.18917 29.9366 1.17947 29.5816C1.13769 28.2317 1.16604 26.881 1.15485 25.5296C1.14739 24.4284 1.3645 23.2931 0.224482 22.4831C-0.0426162 22.295 -0.023964 21.526 0.0409453 21.0482C0.583349 17.0819 1.89795 13.3218 3.56321 9.7475C4.2414 8.29291 5.73879 7.10679 7.10636 6.16715C7.82036 5.67571 9.11557 5.75762 10.0571 5.97679C11.4799 6.30897 12.8191 6.99834 14.2001 7.51481C14.8186 7.74536 15.4431 8.01762 16.0847 8.10862C16.9771 8.233 17.6814 7.92434 17.8634 6.87776C18.0693 5.69164 18.2088 4.41224 19.657 4.07779C21.3028 3.69935 22.892 3.76003 24.2081 5.05687C24.9549 5.79251 25.7301 6.6601 26.8724 6.29683C27.8908 5.973 28.9562 5.52024 29.7545 4.83163C30.752 3.96934 31.6018 2.87802 32.3233 1.76016C33.4349 0.040131 34.9248 -0.160084 36.7528 0.0863927C40.701 0.620298 44.2703 2.12873 47.6911 4.11723C50.5046 5.75155 53.3852 7.27364 56.1771 8.9474C57.1552 9.53136 58.5988 9.86733 58.3243 11.6268C58.2877 11.8596 58.9197 12.2206 59.2658 12.4944C61.1296 13.9619 63.0052 15.4142 64.8674 16.8862C65.0913 17.0644 65.2591 17.3192 65.6486 17.7599Z" fill="white"/>
</svg>
*/

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
   /*gsap.registerPlugin(MotionPathPlugin);

useEffect(() => {
  const animation = gsap.to('#rect', {
    duration: 5, 
    repeat: 12,
    repeatDelay: 3,
    yoyo: true,
    ease: "power1.inOut",
    motionPath: {
      path: "#path",
      align: "#path",
      autoRotate: true,
      alignOrigin: [0.5, 0.5]
    }
  });

  // Optional: cleanup on unmount
  return () => {
    animation.kill();
  };
}, []);*/
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
const singleRef= useRef<HTMLImageElement>(null);
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
            <input {...register("name")} placeholder='RAIYYAN NSA' />
            <img src={CloudRight} alt="" />
            </div>
            <p>{errors.name?.message}</p>
<div className={styles.email} style={{marginLeft:"-1.5vw"
}}>
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
            </div>
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
<div className={styles.mobile} style={{marginLeft:"3.5vw"
}}>
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
          </div>

          <div className={styles.right}>
            <div className={styles.college} style={{marginLeft:"2.5vw"}}>
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
            </div>
            <div className={styles.year} style={{marginLeft:"4.5vw"}}>
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
</div>

            <p>{errors.year?.message}</p>
            <div className={styles.state} style={{marginLeft:"3vw"}}>
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

        <button type="submit" className={styles.submitBtn}>
          NEXT
        </button>
      </form>
    </div>
  );
};

export default Registration;
