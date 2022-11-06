import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [calc, setCalc] = useState('');
	const [result, setResult] = useState('');

	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value => {

		if(
			ops.includes(value) && calc == '' || 
			ops.includes(value) && ops.includes(calc.slice(-1))
		){
			return;
		}

		setCalc(calc + value);

		if(!ops.includes(value)){
			setResult(eval(calc + value).toString());
		}
	}
	
	const deleteLast = () => {
		if(calc == ''){
			return;
		}
		const value = calc.slice(0, -1);

		setCalc(value);
	}


	const createDigits = () => {
		const digits =[];
		for (let i = 1; i < 10; i++){
			digits.push(
				<button onClick={()=> updateCalc(i.toString())} className={styles.button} key={i}>{i}</button>
			)
		}
		return digits;
	}

	const calculateOperation = () =>{
		setCalc(eval(calc).toString());
	}

	async function sendOperation(operation){
		try{
			await axios.post("http://localhost:8080/api/auth",{
				operation
			})
		}catch(err){
			console.log(err)
		}
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Calculator API</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.calculator_container}>
				<div className={styles.calculator}>
					<div className={styles.display}>
						{/* { result ? <span>{result}</span> : ''} 
						&nbsp;  */}
						{calc || '0'}

					</div>
					<div className={styles.operators}>
						<button onClick={()=> updateCalc('/')} className={styles.button}>/</button>
						<button onClick={()=> updateCalc('*')} className={styles.button}>*</button>
						<button onClick={()=> updateCalc('+')} className={styles.button}>+</button>
						<button onClick={()=> updateCalc('-')} className={styles.button}>-</button>
						<button onClick={()=> deleteLast()} className={styles.button}>DEL</button>
					</div>

					<div className={styles.digits}>
						{ createDigits() }
						<button onClick={()=> updateCalc('0')} className={styles.button}>0</button>
						<button onClick={()=> updateCalc('.')} className={styles.button}>.</button>
						<button onClick={()=> calculateOperation()} className={styles.button}>=</button>
					
					</div>

				</div>
			</div>
		
		</div>
	);
};

export default Main;
