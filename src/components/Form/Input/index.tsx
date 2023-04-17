import { StyledInputContainer } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface InputProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  error: string | undefined;
  register: any;
}

const Input = ({
  id,
  type,
  label,
  placeholder,
  error,
  register,
}: InputProps) => (
  <div>
    <StyledInputContainer>
      <input type={type} id={id} placeholder={placeholder} {...register(id)} />
      <label htmlFor={id}>{label}</label>
    </StyledInputContainer>
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </div>
);

export default Input;
