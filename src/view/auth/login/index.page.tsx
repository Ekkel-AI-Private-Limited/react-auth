import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { authService } from '../../../services';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    StatusCodes
} from 'http-status-codes';
import { ValidationError } from '../../../components/form/validation.component';
import { routes } from '../../../routes/routesConstants';
import { ButtonCustom } from '../../../components/form/button.component';
import { useDispatch } from 'react-redux';
import { saveLogin } from '../../../store/action';

const schema = yup.object().shape({
  identifier: yup.string().email().label('Email or Username').required(),
  password: yup.string().label('Password').min(8).required(),
});

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [sErrors, setSErrors] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (value: any) => {
        setLoading(true)
        authService.login(value).then(( {data} ) => {
            setLoading(false)
            dispatch(saveLogin(data.data))
            toast.success('Account logged in successfully!')
            history.push('/')
        }, ({ response }) => {
            setLoading(false)
            switch(response.status) {
                case StatusCodes.UNPROCESSABLE_ENTITY:
                    setSErrors(response.data.errors);
                    break;
                case StatusCodes.CONFLICT:
                    setSErrors({ email: response.data.message });
                    break;
                default:
                    toast.error(response.data.message)
            }

        })
    }

    return (

        <section className="At-SectionLoginForm">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <div className="At-LoginLeft">
                    <img src="images/1.png" alt="" className="images-grounp" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="At-LoginBoxOuter">
                        <div className="At-LoginBox">
                            <h3 className="welcome mt-5">
                                <span style={{color: '#5F4BDB'}}>welcome,</span><br/>
                                Please register your account.
                            </h3>
                            <form className="At-LoginForm mt-5" onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group controlId="email" className="mt-2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" placeholder="e.g: john@doe.com" {...register('identifier')} />
                                    <ValidationError name="identifier" errors={errors} sErrors={sErrors} />
                                </Form.Group>
                                
                                <Form.Group controlId="password" className="mt-2">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register('password')} />
                                    <ValidationError name="password" errors={errors} sErrors={sErrors} />
                                </Form.Group>

                                <Link to={routes.forgot_password} className="password text-end justify-content-end">Forgot Password?</Link>

                                <div>
                                    <ButtonCustom type="submit" className="btn-primary btn-block" onClick={handleSubmit(onSubmit)} label={'Login'} loading={loading} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <h6 className="already mt-5">Don’t have an account? <Link className="At-ForgetLink" to={routes.signup}>Sign Up</Link></h6>
                </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;