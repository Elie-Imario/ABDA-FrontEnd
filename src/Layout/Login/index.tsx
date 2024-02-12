import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import img from '../../assets/images/Private data-amico.png';
import './login.scss'
import { getProfById } from '../../request/prof';
import { useAppContext } from '../../service/context';
import { Prof } from '../../service/types/dataTypes';

type Log = {
	login: string,
	password: string,
}

const Login = () => {
	const {setContext} = useAppContext()
	const [showPassword, setShowPassword] = useState(false);
	const [log, setLog] = useState<Log>({
		login: '',
		password: '',
	})

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleConnect = useCallback(() => {
		const {login, password} = log
		if(login.length && password.length) {
			fetch('http://127.0.0.1:5000/api/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(log)
			}).then(res => res.json()).then(res => {
				const {data: {profId}} = res
				if(profId) {
					getProfById(profId).then(prof => {
						setContext({logged: prof as Prof})
						localStorage.setItem("logged", JSON.stringify(prof))
						
					})
				}
			})
		}
	}, [log])

	return (
		<div className="login-page">
			<div className="login-section">
				<div className="login-header">
					<div className="login-header-img">
						<img src={img} />
					</div>
					<div className="login100-form-title">
						<h1>Connectez vous!</h1>
						<span>Connectez vous et retrouver votre espace de travail!</span>
					</div>
				</div>
				<div className="login-wrap-form">
					<div className="login_form">
						<FormControl fullWidth className="wrap-input100">
							<TextField
								fullWidth
								label="Login"
								id="input"
								className='input100'
								onChange={({target: {value}}) => {
									setLog({...log, login: value})
								}}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FontAwesomeIcon icon='user-circle' size='lg' />
										</InputAdornment>
									),
								}}
							/>
						</FormControl>
						<FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className="wrap-input100">
							<InputLabel htmlFor="outlined-adornment-password">Mot de Passe</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								className='input100'
								type={showPassword ? 'text' : 'password'}
								startAdornment={<InputAdornment position="start"><FontAwesomeIcon icon='key' className='m-r-5' size='lg' /></InputAdornment>}
								onChange={({target: {value}}) => {
									setLog({...log, password: value})
								}}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <FontAwesomeIcon icon='eye-slash' size='lg' /> : <FontAwesomeIcon icon='eye' size='lg' />}
										</IconButton>
									</InputAdornment>
								}
								label="Mot de Passe"
							/>
						</FormControl>

						<div className="container-login100-form-btn" onMouseUp={() => handleConnect()}>
							<button className="login100-form-btn" id="sign-in" >
								<span><FontAwesomeIcon icon='sign-in' size='lg' /> Se connecter</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;
