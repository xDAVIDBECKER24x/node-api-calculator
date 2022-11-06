import { useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const [calc, setCalc] = useState('');
	const [result, setResult] = useState('');

	const ops = ['/', '*', '+', '-', '.'];

	const updateCalc = value => {
		setCalc(calc + value);
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
						{ result ? <span>(0)</span> : ''}  
						{calc || '0'}

					</div>
					<div className={styles.operators}>
						<button onClick={()=> updateCalc('/')} className={styles.button}>/</button>
						<button onClick={()=> updateCalc('*')} className={styles.button}>*</button>
						<button onClick={()=> updateCalc('+')} className={styles.button}>+</button>
						<button onClick={()=> updateCalc('-')} className={styles.button}>-</button>
						<button onClick={()=> updateCalc('')} className={styles.button}>DEL</button>
					</div>

					<div className={styles.digits}>
						{ createDigits() }
						<button onClick={()=> updateCalc('0')} className={styles.button}>0</button>
						<button onClick={()=> updateCalc('.')} className={styles.button}>.</button>
						<button className={styles.button}>=</button>
					
					</div>

				</div>
			</div>
		
		</div>
	);
};

export default Main;
