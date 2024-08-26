import styles from './registration.module.css'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'

const fieldsScheme = yup.object().shape({
	email: yup.string().required().email('Неверный Email'),
	password: yup
		.string()
		.matches(/^[\w_]*$/, 'Неверный пароль. Допустимы символы - буквы, цифры и нижнее подчеркивание')
		.max(15, 'Длинный пароль. Должно быть не больше 15 символов')
		.min(3, 'Слишком короткий пароль! Пароль должен содержать больше 3 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

function App() {
	const button = useRef(null)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldsScheme),
	})

	const error = errors.email?.message || errors.password?.message || errors.confirmPassword?.message

	const onSubmit = (formData) => {
		console.log(formData)
	}

	useEffect(() => {
		if (isValid) {
			button.current.focus()
		}
	})



	return (
		<div className={styles.app}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{error && <b><div className={styles.passwordError}>{error}</div></b>}
				<input className={styles.input}
					name="email"
					placeholder="Почта"
					{...register('email')}
				/>
				<input className={styles.input}
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				<input className={styles.input}
					type="password"
					name="password"
					placeholder="Повторите пароль"
					{...register('confirmPassword')}
				/>
				<button ref={button} className={styles.button} type="submit" disabled={!!error}>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default App;
