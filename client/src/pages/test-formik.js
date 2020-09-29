import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {MDBContainer, MDBIcon, MDBInput} from "mdbreact";

class Test1 extends React.Component {
    render() {
        return (
            <MDBContainer>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string()
                            .required('First Name is required'),
                        lastName: Yup.string()
                            .required('Last Name is required'),
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required')
                    })}
                    onSubmit={fields => {
                        alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    }}
                    render={({errors, status, touched}) => (
                        <Form>


                            <h4 className="font-weight-bold grey-text"><MDBIcon icon="user"/> Some information about You
                            </h4>
                            <div className="px-4">
                                <div className={"create-div"}>
                                    <MDBInput name="firstname"
                                              label="Your firstname" icon="user-edit"
                                              type="text"
                                    />
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="lastname"
                                              label="Your lastname" icon="user-edit" group
                                              type="text"
                                    />
                                </div>
                                <div className={"create-div"}>
                                    <MDBInput name="email"
                                              label="Your email" icon="envelope" group type="email"

                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mr-2">Register</button>
                                <button type="reset" className="btn btn-secondary">Reset</button>
                            </div>
                        </Form>

                    )}
                />
            </MDBContainer>
        )
    }
}

export default Test1;