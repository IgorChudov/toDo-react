import styles from './Input.module.scss';

interface InputProps {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
  name: string;
  value: string;
}

export const Input = ({ label, placeholder, onChange, name, value }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={value}
        id={name}
      />
    </div>
  );
};
