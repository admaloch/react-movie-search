import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import './Error.css'
import { NavLink, useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import useAuth from '../../../hooks/useAuth';

export default function Error({ text }: {text: string} ): JSX.Element {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth()

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <div className="main-item-content">
            <div className="error-content page-error">
                <SentimentDissatisfiedIcon sx={{ fontSize: 100 }} />
                <h2>{text}</h2>
                {!isLoggedIn &&
                    <>
                        <div className="err-link">
                            <ArrowCircleLeftIcon
                                style={{
                                    marginRight: '5px',  
                                    marginTop: '4px'    
                                }}
                            />
                            <NavLink className='navlink-style' to="/login">
                                <p>Login</p>
                            </NavLink>
                        </div>
                        <div className="err-link">
                            <ArrowCircleLeftIcon
                                style={{
                                    marginRight: '5px', 
                                    marginTop: '4px'    
                                }}
                            />
                            <NavLink className='navlink-style' to="/users/register">
                                <p>Register a new account</p>
                            </NavLink>
                        </div>
                    </>
                }
                <div className="err-link">
                    <ArrowCircleLeftIcon
                        style={{
                            marginRight: '5px', 
                            marginTop: '4px'   
                        }}
                    />
                    <p onClick={handleGoBack}>Return to previous page</p>
                </div>
                <div className="err-link">
                    <ArrowCircleLeftIcon
                        style={{
                            marginRight: '5px', 
                            marginTop: '4px'   
                        }}
                    />
                    <NavLink className='navlink-style' to="/">
                        <p>Return to homepage</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
