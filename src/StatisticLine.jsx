const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value} {text === "نسبة إيجابية" ? "%" : ""}</td>
    </tr>
);
export default StatisticLine;