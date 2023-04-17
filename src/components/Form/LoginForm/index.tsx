import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginSchema, TLoginValues } from './LoginSchema';

import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import Input from '../Input';
import { UserContext } from '../../../contexts/UserContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginValues>({ resolver: zodResolver(LoginSchema) });

  const { loginUser, loading } = useContext(UserContext);

  const handleLogin: SubmitHandler<TLoginValues> = (formData) => {
    loginUser(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleLogin)}>
      <Input
        id='email'
        register={register}
        type='text'
        label='E-mail'
        error={errors?.email?.message}
      />
      <Input
        id='password'
        register={register}
        type='password'
        label='Senha'
        error={errors?.password?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='green'>
        {loading ? 'Entrando ...' : 'Entrar'}
      </StyledButton>
    </StyledForm>
  );
};

export default LoginForm;
