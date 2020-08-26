import React,{useState} from 'react';
import { Auth } from 'aws-amplify';

const formData = {
    username:"",
    password:"",
    email:""
} 

const Signup = (props)=>{
    const [formState, setFormState] = useState(formData);

    const handleChange = (event)=>{
        console.log(event.target.name);
        console.log(event.target.value);
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        // console.log("seems good until here");
         const {username,password,email} = formState;
        //  try{
        //     const {user} = await Auth.signUp({
        //          username: username,
        //          password: password,
        //          attributes:{
        //              email: email
        //          }
        //      })
        //      console.log(user);
        //      }catch(err){
        //         console.log(err);
        //      }
        try {
            await Auth.confirmSignUp(username, "506689");
        } catch (error) {
            console.log('error confirming sign up', error);
        }
            }
    // async function Signup(){
    //     const {username,password,email} = formState;
    //      try {
    //     const { user } = await Auth.signUp({
    //         username,
    //         password,
    //         attributes: {
    //             email,          // optional
    //             // other custom attributes 
    //         }
    //     });
    //     console.log(user);
    // } catch (error) {
    //     console.log('error signing up:', error);
    // }
    // }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Username</p>
                <input placeholder="Enter your username" onChange={handleChange} name="username"/>
                <p>Email</p>
                <input placeholder="Enter your email" type="email" onChange={handleChange} name="email"/>
                <p>Password</p>
                <input placeholder="Enter your password" type="password" onChange={handleChange} name="password"/>
                <p>Confirm Password</p>
                <input placeholder="Enter your password" type="password"/>
                <p><button onClick={Signup} type="submit">Sign up</button></p>
                
            </form>
        </div>
    )
}
export default Signup;