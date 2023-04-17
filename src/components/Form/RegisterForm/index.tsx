import { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema, TRegisterValues } from './RegisterSchema';
import { UserContext } from '../../../contexts/UserContext';

import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValues>({ resolver: zodResolver(RegisterSchema) });

  const { registerUser, loading } = useContext(UserContext);

  const handleRegister: SubmitHandler<TRegisterValues> = (formData) => {
    registerUser(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleRegister)}>
      <Input
        id='name'
        register={register}
        type='text'
        label='Nome'
        error={errors?.name?.message}
      />
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
      <Input
        id='confirmPassword'
        register={register}
        type='password'
        label='Confirmação de senha'
        error={errors?.confirmPassword?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        {loading ? 'Cadastrando ...' : 'Cadastrar'}
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
