import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton: React.FC<{ onLoginSuccess: (user: any) => void }> = ({ onLoginSuccess }) => {
  const [error, setError] = useState("");

  const handleLoginSuccess = (credentialResponse: any) => {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${credentialResponse.credential}`,
      },
    })
      .then((res) => res.json())
      .then((userInfo) => {
        onLoginSuccess(userInfo); 
        setError("");
      })
      .catch((err) => {
        console.error("Failed to fetch user info:", err);
        setError("Failed to retrieve user info.");
      });
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => {
          console.error("Login Failed");
          setError("Login failed. Please try again.");
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GoogleLoginButton;