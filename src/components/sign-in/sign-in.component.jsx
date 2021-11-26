import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async e => {
        console.log("a");
        e.preventDefault();
        const {email, password} = this.state;
        const { emailSignInStart } = this.props;
        emailSignInStart({email, password});
    }

    handleChange = (e) => {
        const {value, name} = e.target;

        this.setState({[name]: value})
    }

    render() {
        const {googleSignInStart} = this.props;

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
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
                        {' '}
                        Sign in with Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (emailAndPassword) => dispatch(emailSignInStart(emailAndPassword)),
})

export default connect(null, mapDispatchToProps)(SignIn);