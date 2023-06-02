
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const localToken = JSON.parse(localStorage.getItem("login"));
  const localUser =  JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(localToken?.token);
  const [user,setUser] = useState(localUser?.user);


  const loginUser = async (userEmail, userPassword) => {
    if (userEmail !== "" && userPassword !== "") {
      const userCredentials = {
        email: userEmail,
        password: userPassword,
      };
      try {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(userCredentials)
        });
        const { foundUser, encodedToken } = await response.json();

        localStorage.setItem("login", JSON.stringify({ token: encodedToken }));
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        setToken(encodedToken);
        setUser(foundUser);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const registerUser = async (userEmail,userPassword,userFirstName,userLastName) =>{
    if(userEmail && userPassword && userFirstName && userLastName){
      const newUserCredentials = {
        email: userEmail,
        password: userPassword,
        firstName: userFirstName,
        lastName: userLastName
      };
      try{
        const response = await fetch("/api/auth/signup",{
          method: 'POST',
          body: JSON.stringify(newUserCredentials)
        })
        const { createdUser, encodedToken } = await response.json();

        localStorage.setItem("register", JSON.stringify({ token: encodedToken }));
        localStorage.setItem("user", JSON.stringify({ user: createdUser }));
        setToken(encodedToken);
        setUser(createdUser);
        
      }catch(err){
        console.error(err);
      }
    }else{
      toast.warning("Please fill all the details !")
    }
  }


  return (
    <AuthContext.Provider
      value={{ loginUser, registerUser, token, setToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
