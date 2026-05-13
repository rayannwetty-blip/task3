import { useState } from 'react'

// --- 1. مكونات تطبيق Unicafe (الإحصائيات) ---
const StatisticLine = ({ text, value }) => (
  <tr>
    <td style={{ width: '120px' }}>{text}</td>
    <td><strong>{value}</strong></td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) return <p>لم يتم جمع أي آراء بعد</p>
  const average = (good - bad) / total
  const positivePercent = (good / total) * 100
  return (
    <table>
      <tbody>
        <StatisticLine text="جيد" value={good} />
        <StatisticLine text="عادي" value={neutral} />
        <StatisticLine text="سيء" value={bad} />
        <StatisticLine text="الإجمالي" value={total} />
        <StatisticLine text="المتوسط" value={average.toFixed(2)} />
        <StatisticLine text="إيجابية" value={positivePercent.toFixed(2) + " %"} />
      </tbody>
    </table>
  )
}

// --- المكون الرئيسي App ---
const App = () => {
  // --- States الطلب الأول (العداد) ---
  const [counter, setCounter] = useState(0)
  const [step, setStep] = useState(1)

  // --- States الطلب الثاني (Unicafe) ---
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // --- States الطلب الثالث (الحِكم) ---
  const anecdotes = [
    'إذا كان تنقيح الأخطاء هو عملية إزالة الأخطاء، فإن البرمجة هي عملية وضعها.',
    'أفضل طريقة للبدء هي أن تتوقف عن الكلام وتبدأ بالعمل.',
    'أي أحمق يمكنه كتابة كود يفهمه الكمبيوتر. المبرمجون الجيدون يكتبون كوداً يفهمه البشر.',
    'التحسين المبكر هو أصل كل شر.',
    'قبل أن تعمل البرمجيات بشكل جيد، يجب أن تعمل أولاً.',
    'البساطة هي أقصى درجات التطور.',
    'أفضل رسالة خطأ هي تلك التي لا تظهر أبداً.',
    'أصعب جزء في البرمجة هو تسمية الأشياء.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  // --- States الطلب الرابع (قائمة المهام) ---
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim() === '') return
    setTodos(todos.concat({ id: Date.now(), text: newTodo, done: false }))
    setNewTodo('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  return (
    <div style={{ direction: 'rtl', padding: '30px', fontFamily: 'Arial', lineHeight: '1.6' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>مشاريع الوظيفة الثالثة - React</h1>

      {/* 1. قسم العداد */}
      <section style={sectionStyle}>
        <h2>1. العداد المتقدم</h2>
        <h3>القيمة: {counter}</h3>
        <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} />
        <button onClick={() => setCounter(counter + step)}>+ {step}</button>
        <button onClick={() => setCounter(counter - step)}>- {step}</button>
        <button onClick={() => setCounter(0)}>تصفير</button>
      </section>

      {/* 2. قسم Unicafe */}
      <section style={sectionStyle}>
        <h2>2. تطبيق Unicafe</h2>
        <button onClick={() => setGood(good + 1)}>جيد</button>
        <button onClick={() => setNeutral(neutral + 1)}>عادي</button>
        <button onClick={() => setBad(bad + 1)}>سيء</button>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </section>

      {/* 3. قسم الحِكم */}
      <section style={sectionStyle}>
        <h2>3. حِكمة اليوم والتصويت</h2>
        <p>"{anecdotes[selected]}"</p>
        <p>عدد الأصوات: {votes[selected]}</p>
        <button onClick={handleVote}>تصويت</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>حكمة أخرى</button>

        <h3>الحكمة الأكثر شعبية</h3>
        {Math.max(...votes) > 0 ? (
          <div>
            <p>"{anecdotes[mostVotedIndex]}"</p>
            <p>بـ {Math.max(...votes)} أصوات</p>
          </div>
        ) : <p>لم يتم التصويت بعد</p>}
      </section>

      {/* 4. تمرين التحدي (قائمة المهام) */}
      <section style={sectionStyle}>
        <h2>4. قائمة المهام (To-Do List)</h2>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="أضف مهمة جديدة..."
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>إضافة</button>
        <p>المكتملة: {todos.filter(t => t.done).length} / {todos.length}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ marginBottom: '10px' }}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ cursor: 'pointer', textDecoration: todo.done ? 'line-through' : 'none' }}
              >
                {todo.done ? '✅ ' : '⬜ '} {todo.text}
              </span>
              <button onClick={() => setTodos(todos.filter(t => t.id !== todo.id))} style={{ marginRight: '10px', color: 'red' }}>حذف</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

const sectionStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9'
}

export default App