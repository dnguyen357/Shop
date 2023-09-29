import { useState,useEffect } from "react"
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function SignUp(){
  const BASE_URL = `https://store-dcq8.onrender.com/api`
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    
    const navigate = useNavigate();
    const signup = "Already have an account? Sign in" 
    async function handleLogin(e){
      
      console.log("clicked submit in login page")
      e.preventDefault()
        try {
            const response = await fetch(`${BASE_URL}/users/register`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                user: {
                  firstName: firstName,
                  lastName: lastName,
                  email:email,
                  username: username,
                  password: password
                }
              })
            });
            const result = await response.json();
            console.log(result)
            navigate('/')
          
          } catch (err) {
            console.error(err);
          }
        
    }
    

    return (
        <div>
          
          <form className="form-login"onSubmit={handleLogin} >
          <p className="signup-title">Sign up</p>
          <div className="name-container">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
            <label>
                <div>
                  <input value={email} 
                        placeholder="Email" 
                        type="email" 
                        className="long-input" 
                        onChange={(e)=>{ setEmail(e.target.value) }}
                  />
                </div>
            </label>
            <label>
                <div>
                  <input value={username} 
                        placeholder="Username" 
                        type="username" 
                        className="long-input" 
                        onChange={(e)=>{ setUsername(e.target.value) }}
                  />
                </div>
            </label>
            <label>
                <div>
                  <input 
                    value={password} 
                    placeholder="Password" 
                    type="password" 
                    className="long-input" 
                    onChange={(e)=>{ setPassword(e.target.value) }}
                  />
                </div>
            </label>
            <button type="submit" >Sign Up</button>
            <div>
                <Link to={`/Signin`}>
                  {signup}
                </Link>
            </div>
            </form>
        </div>
    )
}
