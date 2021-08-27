import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName : '',
            email : '',
            password : '',
            confirmedPassword : '',
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {displayName, email, password, confirmedPassword} = this.state;
        if(password !== confirmedPassword) {
            alert("the confirmed password doesn't match");
            return;
        }

        try {
        const {user} = await auth.createUserWithEmailAndPassword(email, password);
        await createUserProfileDocument(user, {displayName});

        this.setState({
            displayName : '',
            email : '',
            password : '',
            confirmedPassword : '',
        });
        }
        catch(error) {
            console.error(error);
        }
    } 

    handleChange = e => {
        const {name, value} = e.target;
        this.setState({[name] : value});
    }

    render() {
        const {displayName, email, password, confirmedPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign up with email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type = 'text'
                        name='displayName'
                        value = {displayName}
                        onChange = {this.handleChange}
                        label = 'Display Name'
                        required
                    />
                    <FormInput
                        type = 'email'
                        name='email'
                        value = {email}
                        onChange = {this.handleChange}
                        label = 'Email'
                        required
                    />
                    <FormInput
                        type = 'password'
                        name='password'
                        value = {password}
                        onChange = {this.handleChange}
                        label = 'Password'
                        required
                    />
                    <FormInput
                        type = 'password'
                        name='confirmedPassword'
                        value = {confirmedPassword}
                        onChange = {this.handleChange}
                        label = 'Confirmed Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;