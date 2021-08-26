import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle} from '../../firebase/firebase.utils.js';
import {auth} from '../../firebase/firebase.utils';
class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email : '', password: ''});
        } catch (error) {
            if(error.code == "auth/user-not-found") {
                alert("invalid account");
            }
            console.error(error);
        }
    }

    handleChange = (e) => {
        const {value, name} = e.target;

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    value={this.state.email} 
                    label="Email"
                    handleChange={this.handleChange}
                    required/>
                    <FormInput
                    name='password' 
                    type='password' 
                    value={this.state.password} 
                    label="Password"
                    handleChange={this.handleChange}
                    required/>
                    <div className="buttons">
                        <CustomButton type="submit" value='Submit Form'>
                        Sign in
                        </CustomButton>
                        <CustomButton type='button'onClick={signInWithGoogle} isGoogleSignIn>
                        {' '}
                        Sign in with Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;