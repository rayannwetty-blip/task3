import StatisticLine from './StatisticLine';

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;

  if (total === 0) {
    return <p>لم يتم جمع أي آراء بعد</p>; // عرض شرطي في حال عدم وجود بيانات
  }

  const average = (good - bad) / total;
  const positivePercent = (good / total) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine text="جيد" value={good} />
        <StatisticLine text="عادي" value={neutral} />
        <StatisticLine text="سيء" value={bad} />
        <StatisticLine text="الإجمالي" value={total} />
        <StatisticLine text="المتوسط" value={average.toFixed(2)} />
        <StatisticLine text="نسبة إيجابية" value={positivePercent.toFixed(2)} />
      </tbody>
    </table>
  );
};
export default Statistics;
