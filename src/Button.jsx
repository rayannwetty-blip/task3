const Button = ({ onClick, text }) => (
  <button onClick={onClick} style={{ padding: '10px 20px', margin: '5px' }}>
    {text}
  </button>
);
export default Button;
