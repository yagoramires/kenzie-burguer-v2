import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema, TRegisterValues } from './RegisterSchema';

import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterValues>({ resolver: zodResolver(RegisterSchema) });

  const handleRegister: SubmitHandler<TRegisterValues> = (formData) => {
    console.log(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleRegister)}>
      <Input
        id='name'
        register={register}
        type='text'
        label='Nome'
        placeholder='Digite seu nome'
        error={errors?.name?.message}
      />
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
      <Input
        id='confirmPassword'
        register={register}
        type='password'
        label='Confirmação de senha'
        placeholder='Confirme sua senha'
        error={errors?.confirmPassword?.message}
      />
      <StyledButton $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
};

export default RegisterForm;
