import React, { useState } from 'react';
import AuthForm from '../features/Auth/AuthForm';
import styles from './AuthPage.module.css'; // Assuming you have CSS similar to your guest list

const AuthPage = () => {
    const [isSignUp, setIsSignUp] = useState(true);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
            </div>
            <AuthForm isSignUp={isSignUp} />
            <button onClick={() => setIsSignUp(!isSignUp)} className={styles.toggleButton}>
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default AuthPage;
