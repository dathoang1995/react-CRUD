import React, { useEffect, useState } from 'react';
import { IoEyeSharp, IoArrowBackOutline } from 'react-icons/io5';
import { BsEyeSlashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import './login.scss';
import { loginUser } from '../../services/getApi';

import { UserContext } from '../../context/UserContext';

function Login() {
    const [inputText, setInputText] = useState('');
    const [passWord, setPassWord] = useState('');

    const [showEye, setShowEye] = useState(false);

    const [loading, setLoading] = useState(false);

    const { login } = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEyes = () => {
        setShowEye(!showEye);
    };

    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);

        if (!inputText || !passWord) return;

        let res = await loginUser(inputText.trim(), passWord);

        if (res && res.token) {
            login(inputText, res.token);
            navigate('/users');
        } else {
            if (res && res.status === 400) {
                alert(res.data.error);
            }
        }

        setLoading(false);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleLogin();
        }
    };
    return (
        <div className="login-container col-12 clo-sm-4">
            <div className="login-header">Login</div>
            <label htmlFor="label" className="label">
                Email or phone number ( eve.holt@reqres.in )
            </label>

            <div className="input">
                <input
                    type="text"
                    id="label"
                    placeholder="Email or phone number"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />

                {showEye && <IoEyeSharp className="icon-eyes" onClick={handleEyes} /> ? (
                    <>
                        <input
                            type="text"
                            placeholder="Enter your password..."
                            value={passWord}
                            onChange={(e) => setPassWord(e.target.value)}
                        />
                        <IoEyeSharp className="icon-eyes" onClick={handleEyes} />
                    </>
                ) : (
                    !showEye && <BsEyeSlashFill className="icon-eyes" onClick={handleEyes} /> && (
                        <>
                            <input
                                type="password"
                                placeholder="Enter your password..."
                                value={passWord}
                                onChange={(e) => setPassWord(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                            <BsEyeSlashFill className="icon-eyes" onClick={handleEyes} />
                        </>
                    )
                )}
            </div>

            <button
                className={inputText && passWord ? 'active' : ''}
                disabled={inputText && passWord ? false : true}
                type="submit"
                onClick={() => handleLogin()}
            >
                {loading && <div className="loading"></div>}
                &nbsp; Login
            </button>

            <div className="back" onClick={() => navigate('/')}>
                <IoArrowBackOutline className="icon-back" /> Go back
            </div>
        </div>
    );
}

export default Login;
