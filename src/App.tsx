import { useMemo, useState } from 'react'
import './App.css'

type Internship = {
  company: string
  role: string
  type: string
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Saved'
  date: string
  color: string
}

const initialInternships: Internship[] = [
  { company: 'Arc Labs', role: 'Software Engineer Intern', type: 'Full-time', status: 'Interview', date: 'Oct 10, 2024', color: '#7c5cff' },
  { company: 'Northstar', role: 'Product Design Intern', type: 'Part-time', status: 'Applied', date: 'Oct 8, 2024', color: '#ef8d67' },
  { company: 'Vercel', role: 'Frontend Engineer Intern', type: 'Full-time', status: 'Offer', date: 'Oct 4, 2024', color: '#171717' },
  { company: 'Stripe', role: 'Software Engineering Intern', type: 'Full-time', status: 'Rejected', date: 'Sep 28, 2024', color: '#635bff' },
  { company: 'Linear', role: 'Product Engineering Intern', type: 'Full-time', status: 'Saved', date: 'Sep 23, 2024', color: '#5e6ad2' },
]

const statusClass: Record<Internship['status'], string> = {
  Applied: 'blue',
  Interview: 'purple',
  Offer: 'green',
  Rejected: 'red',
  Saved: 'gray',
}

function App() {
  const [internships, setInternships] = useState(initialInternships)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All applications')
  const [showModal, setShowModal] = useState(false)

  const filtered = useMemo(() => internships.filter((item) => {
    const matchesQuery = `${item.company} ${item.role}`.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All applications' || item.status === filter
    return matchesQuery && matchesFilter
  }), [internships, query, filter])

  const applied = internships.filter((item) => item.status !== 'Saved').length
  const active = internships.filter((item) => ['Applied', 'Interview'].includes(item.status)).length
  const offers = internships.filter((item) => item.status === 'Offer').length

  function addApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setInternships((current) => [{
      company: String(data.get('company')),
      role: String(data.get('role')),
      type: 'Full-time',
      status: 'Applied',
      date: 'Today',
      color: '#7c5cff',
    }, ...current])
    setShowModal(false)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">✦</span> launchpad</div>
        <div className="workspace"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><small>Job search 2024</small></div><span>⌄</span></div>
        <nav>
          <p className="nav-label">Workspace</p>
          <a className="nav-item active"><span>▦</span> Overview</a>
          <a className="nav-item"><span>↗</span> Applications <b>{internships.length}</b></a>
          <a className="nav-item"><span>♡</span> Saved roles <b>3</b></a>
          <p className="nav-label">Tools</p>
          <a className="nav-item"><span>▤</span> Insights</a>
          <a className="nav-item"><span>⚙</span> Preferences</a>
        </nav>
        <div className="sidebar-bottom"><div className="tip"><span>✦</span><strong>Small steps,<br />big moves.</strong><p>Keep your momentum going. You’re doing great!</p></div><a className="help">? <span>Help center</span></a></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><i>/</i><strong>Overview</strong></div><div className="top-actions"><button className="icon-button">⌕</button><button className="icon-button">♢</button><div className="mini-avatar">JD</div></div></header>
        <div className="page">
          <section className="hero"><div><p className="eyebrow">Thursday, October 17, 2024</p><h1>Good morning, Jordan <span>✦</span></h1><p className="hero-copy">Here’s your job search at a glance. Keep going — your next opportunity is closer than you think.</p></div><button className="primary" onClick={() => setShowModal(true)}>+ Add application</button></section>

          <section className="metric-grid">
            <div className="metric-card"><div className="metric-top"><span>Total applications</span><span className="metric-icon purple-icon">↗</span></div><strong>{applied}</strong><small><em>↑ 12%</em> vs. last month</small><div className="sparkline purple-line">╱╲╱╲╱╱╲╱</div></div>
            <div className="metric-card"><div className="metric-top"><span>Active pipeline</span><span className="metric-icon orange-icon">◌</span></div><strong>{active}</strong><small><em className="orange-text">↑ 2</em> this week</small><div className="sparkline orange-line">╲╱╲╱╲╲╱</div></div>
            <div className="metric-card"><div className="metric-top"><span>Offers received</span><span className="metric-icon green-icon">✓</span></div><strong>{offers}</strong><small><em className="green-text">↑ 1</em> this month</small><div className="sparkline green-line">╱╲╱╲╱╱╲╱</div></div>
          </section>

          <section className="dashboard-grid">
            <div className="panel chart-panel"><div className="panel-heading"><div><h2>Application activity</h2><p>Applications sent over the last 30 days</p></div><select><option>Last 30 days</option><option>Last 90 days</option></select></div><div className="chart"><div className="y-axis"><span>12</span><span>8</span><span>4</span><span>0</span></div><div className="chart-body"><div className="gridline g1" /><div className="gridline g2" /><div className="gridline g3" /><div className="gridline g4" /><svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Application activity chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7c5cff" stopOpacity=".23" /><stop offset="1" stopColor="#7c5cff" stopOpacity="0" /></linearGradient></defs><path d="M0 150 C35 143, 45 120, 80 127 S120 105, 150 112 S195 80, 220 92 S270 64, 300 79 S345 40, 375 58 S420 71, 450 44 S500 70, 530 34 S575 42, 600 18 L600 180 L0 180Z" fill="url(#fill)" /><path d="M0 150 C35 143, 45 120, 80 127 S120 105, 150 112 S195 80, 220 92 S270 64, 300 79 S345 40, 375 58 S420 71, 450 44 S500 70, 530 34 S575 42, 600 18" fill="none" stroke="#7c5cff" strokeWidth="3" /></svg><div className="x-axis"><span>Sep 18</span><span>Sep 25</span><span>Oct 2</span><span>Oct 9</span><span>Today</span></div></div></div></div>
            <div className="panel breakdown-panel"><div className="panel-heading"><div><h2>Application breakdown</h2><p>Where things currently stand</p></div><span className="dots">•••</span></div><div className="donut-wrap"><div className="donut"><div><strong>{internships.length}</strong><span>Total</span></div></div><div className="legend"><span><i className="dot purple-dot" />Applied <b>{internships.filter(i => i.status === 'Applied').length}</b></span><span><i className="dot orange-dot" />Interview <b>{internships.filter(i => i.status === 'Interview').length}</b></span><span><i className="dot green-dot" />Offer <b>{offers}</b></span><span><i className="dot gray-dot" />Other <b>{internships.filter(i => ['Saved', 'Rejected'].includes(i.status)).length}</b></span></div></div></div>
          </section>

          <section className="panel applications-panel"><div className="applications-heading"><div><h2>Recent applications</h2><p>Stay on top of your latest opportunities</p></div><button className="text-button">View all <span>→</span></button></div><div className="toolbar"><div className="search">⌕<input placeholder="Search applications..." value={query} onChange={(event) => setQuery(event.target.value)} /></div><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All applications</option><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option><option>Saved</option></select><button className="filter-button">☷ Filter</button></div><div className="table"><div className="table-row table-head"><span>Company & role</span><span>Type</span><span>Status</span><span>Date added</span><span /></div>{filtered.map((item) => <div className="table-row" key={`${item.company}-${item.role}`}><div className="company-cell"><span className="company-logo" style={{ background: item.color }}>{item.company[0]}</span><div><strong>{item.company}</strong><small>{item.role}</small></div></div><span>{item.type}</span><span className={`status ${statusClass[item.status]}`}><i />{item.status}</span><span>{item.date}</span><button className="more">•••</button></div>)}</div></section>
        </div>
      </main>
      {showModal && <div className="modal-backdrop" onClick={() => setShowModal(false)}><form className="modal" onSubmit={addApplication} onClick={(event) => event.stopPropagation()}><button type="button" className="close" onClick={() => setShowModal(false)}>×</button><p className="eyebrow">New opportunity</p><h2>Add an application</h2><label>Company<input name="company" required placeholder="e.g. Notion" /></label><label>Role<input name="role" required placeholder="e.g. Software Engineer Intern" /></label><button className="primary" type="submit">Save application</button></form></div>}
    </div>
  )
}

export default App
