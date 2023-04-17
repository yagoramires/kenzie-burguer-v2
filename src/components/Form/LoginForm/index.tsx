import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema, TLoginValues } from './LoginSchema';

import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>({ resolver: zodResolver(LoginSchema) });

  const handleLogin: SubmitHandler<TLoginValues> = (formData) => {
    console.log(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleLogin)}>
      <Input
        id='email'
        register={register}
        type='text'
        label='E-mail'
        placeholder='Digite seu e-mail'
        error={errors?.email?.message}
      />
      <Input
        id='password'
        register={register}
        type='password'
        label='Senha'
        placeholder='Digite sua senha'
        error={errors?.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        Entrar
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
