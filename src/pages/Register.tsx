import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/Register.scss";
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

interface FormValues { 
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  surname: string;
  country: string;
}

interface FormErrors {
    server?:string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
    country?: string;
}

export const Register = () =>{
    const initialValues: FormValues = { 
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      surname: "",
      country: ""
    };
    const [formValues, setFormValues] = useState<FormValues>(initialValues);
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState<boolean>(false); 

    const navigate = useNavigate();
  
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0) {
          setIsLoading(true);
          try {
            const { confirmPassword, ...valuesToSend } = formValues;

            const response = await fetch(`${API_BASE_URL}/Account/register`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(valuesToSend)
            });
    
            let data;
            const text = await response.text();
            if (text) {
            data = JSON.parse(text);
            }
    
            if (response.ok) {
                console.log('Signed up successfully', data);
                navigate('/aviatoapp/');
            } else {
                console.log('Request failed', data);
                setFormErrors({ server: data.join(' ') });
            }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        }
      };
  
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0) {
        console.log(formValues);
      }
    }, [formErrors, formValues]);

    const validate = (values: FormValues): FormErrors => {
        const errors: FormErrors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
          errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
          errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
          errors.password = "Password is required";
        } else if (values.password.length < 4) {
          errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
          errors.password = "Password cannot exceed more than 10 characters";
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "Those passwords didn’t match. Try again.";
        }
        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.surname) {
            errors.surname = "Surname is required!";
        }
        if (!values.country) {
            errors.country = "Country is required!";
        }
        return errors;
      };

    return (
        <> 
            <div className="reg-page">
                <div className="reg-container">
                    {isLoading ? (
                        <div load-container>Loading...</div> // Replace this with your actual loading spinner
                    ) : (
                        <div className="reg-form-container">
                            <form onSubmit={handleSubmit}>
                                <h1>Sign Up</h1>
                                <div className="ui divider"></div>
                                {formErrors.server && <div className="ui message error">{formErrors.server}</div>}
                                <div className="ui form">
                                    <div className="field">
                                        <label>Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={formValues.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.email}</p>
                                    <div className="field">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formValues.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.password}</p>
                                    <div className="field">
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm password"
                                            value={formValues.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.confirmPassword}</p>
                                    <div className="field">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Write your name here..."
                                            value={formValues.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.name}</p>
                                    <div className="field">
                                        <label>Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            placeholder="Write your surname here..."
                                            value={formValues.surname}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.surname}</p>
                                    <div className="field">
                                        <label>Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            placeholder="Where are you from...?"
                                            value={formValues.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <p>{formErrors.country}</p>
                                    <button className="fluid ui button blue">Submit</button>
                                </div>
                            </form>
                            <div className="text">
                                Already have an account? <Link to="/aviatoapp/login"><span>Login</span></Link>
                            </div>
                        </div>
                    )}
                </div>
                {" "}
            </div>
        </>
    );
}
 
