import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { authService } from '../../../services';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    StatusCodes
} from 'http-status-codes';
import { ValidationError } from '../../../components/form/validation.component';
import { routes } from '../../../routes/routesConstants';
import { useDispatch } from 'react-redux';
import { ButtonCustom } from '../../../components/form/button.component';

const schema = yup.object().shape({
  password: yup.string().label('Password').min(8).required(),
  confirmPassword: yup.string().label('Password').min(8).required(),
});

const ResetPasswordPage = () => {
    

    const params = useParams();
    const history = useHistory();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });
  
    const [loading, setLoading] = useState(false);
    const [sErrors, setSErrors] = useState({})

    useEffect(() => {
        verifyCode();
    }, [])

    const verifyCode = () => {
        authService.verifyCode(params).then(({ data }) => {
            
        }, ({ response }) => {
            setLoading(false)
            console.log(response.status)
            switch(response.status) {
                case StatusCodes.NOT_FOUND:
                    toast.error(response.data.message)
                    history.push(routes.forgot_password)
                    break;
            }

        })
    }

    const onSubmit = (value: any) => {
        if (value.password !== value.confirmPassword) return setSErrors({ confirmPassword: 'Password does not matched!'})
        setLoading(true)
        authService.resetPassword({...value, ...params}).then(( {data} ) => {
            setLoading(false)
            toast.success(data.message)
            history.push(routes.login);
        }, ({ response }) => {
            setLoading(false)
            console.log(response.status)
            switch(response.status) {
                case StatusCodes.NOT_FOUND:
                    toast.error(response.data.message)
                    break;
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
                                Let's reset new password
                            </h3>
                            <form className="At-LoginForm mt-5" onSubmit={handleSubmit(onSubmit)}>
                                
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" {...register('password')} />
                                    <ValidationError errors={errors} sErrors={sErrors} name="password" />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" {...register('confirmPassword')} />
                                    <ValidationError errors={errors} sErrors={sErrors} name="confirmPassword" />
                                </Form.Group>
                                
                                <div className="mt-2">
                                    <ButtonCustom type="submit" className="btn-primary btn-block" onClick={handleSubmit(onSubmit)} label={'Reset Password'} loading={loading} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <h6 className="already mt-5">Already have an account? <Link to={routes.login} className="At-ForgetLink" href="signin.html">Login</Link></h6>
                </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPasswordPage;