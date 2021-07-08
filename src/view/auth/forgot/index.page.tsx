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

const schema = yup.object().shape({
  email: yup.string().email().label('Email or Username').required()
});

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false);
    const [sErrors, setSErrors] = useState({});
    const history = useHistory();

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });


    const onSubmit = (value: any) => {
        setLoading(true)
        authService.forgetPassword(value).then(( {data} ) => {
            setLoading(false)
            toast.success('Reset link is sent!')
            history.push('/')
        }, ({ response }) => {
            setLoading(false)
            console.log(response)
            toast.error(response.data.msg)
            switch(response.status) {
                case StatusCodes.UNPROCESSABLE_ENTITY:
                    setSErrors(response.data.errors);
                    break;
                case StatusCodes.CONFLICT:
                    setSErrors({ email: response.data.message });
                    break;
            }

        })
    }

    console.log(errors);
    


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
                                Forget Password
                            </h3>
                            <form className="At-LoginForm mt-5" onSubmit={handleSubmit(onSubmit)}>
                                
                                <Form.Group controlId="email" className="mt-2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="text" placeholder="e.g: john@doe.com" {...register('email')} />
                                    <ValidationError name="email" errors={errors} sErrors={sErrors} />
                                </Form.Group>

                                <div className="mt-2">
                                    <ButtonCustom type="submit" className="btn-primary btn-block" onClick={handleSubmit(onSubmit)} label={'Send Link'} loading={loading} />
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

export default ForgotPasswordPage;