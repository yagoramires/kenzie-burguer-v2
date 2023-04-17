import { StyledInputContainer } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';

interface InputProps {
  id: string;
  type: string;
  label: string;
  error: string | undefined;
  register: any;
}

const Input = ({ id, type, label, error, register }: InputProps) => (
  <div>
    <StyledInputContainer>
      <input type={type} id={id} {...register(id)} />
      <label htmlFor={id}>{label}</label>
    </StyledInputContainer>
    <StyledParagraph fontColor='red'>{error}</StyledParagraph>
  </div>
);

export default Input;
