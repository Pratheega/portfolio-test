import React, { useState } from 'react';
import { Cpu, Zap, ShoppingBag, Play, RotateCcw, Plus, Trash2, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveSimulators({ activeProjectDemo, setActiveProjectDemo }) {
  const [activeTab, setActiveTab] = useState(activeProjectDemo || 'round-robin');

  // Update tab if parent passes one
  React.useEffect(() => {
    if (activeProjectDemo) {
      setActiveTab(activeProjectDemo);
    }
  }, [activeProjectDemo]);

  /* ----------------------------------------------------
     1. ROUND ROBIN CPU SCHEDULER STATE & LOGIC
  ---------------------------------------------------- */
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState([
    { id: 'P1', burst: 5, color: '#06b6d4' },
    { id: 'P2', burst: 3, color: '#8b5cf6' },
    { id: 'P3', burst: 4, color: '#ec4899' },
    { id: 'P4', burst: 2, color: '#10b981' }
  ]);
  const [newPid, setNewPid] = useState('P5');
  const [newBurst, setNewBurst] = useState(3);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleAddProcess = () => {
    if (!newPid.trim() || newBurst <= 0) return;
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    const chosenColor = colors[processes.length % colors.length];
    setProcesses([...processes, { id: newPid.trim(), burst: Number(newBurst), color: chosenColor }]);
    setNewPid(`P${processes.length + 2}`);
    setNewBurst(3);
    setSimulationResult(null);
  };

  const handleRemoveProcess = (id) => {
    if (processes.length <= 1) return;
    setProcesses(processes.filter((p) => p.id !== id));
    setSimulationResult(null);
  };

  const runRoundRobinSimulation = () => {
    if (quantum <= 0 || processes.length === 0) return;

    // Simulation using Circular Queue simulation
    const queue = processes.map((p) => ({ ...p, remaining: p.burst }));
    const gantt = [];
    let currentTime = 0;
    const completionTimes = {};
    const waitingTimes = {};
    const turnaroundTimes = {};

    let index = 0;
    while (queue.some((p) => p.remaining > 0)) {
      const current = queue[index];
      if (current.remaining > 0) {
        const executeTime = Math.min(current.remaining, quantum);
        const startTime = currentTime;
        currentTime += executeTime;
        current.remaining -= executeTime;

        gantt.push({
          id: current.id,
          start: startTime,
          end: currentTime,
          duration: executeTime,
          color: current.color
        });

        if (current.remaining === 0) {
          completionTimes[current.id] = currentTime;
          const tat = currentTime; // arrival time assumed 0
          const wt = tat - current.burst;
          turnaroundTimes[current.id] = tat;
          waitingTimes[current.id] = wt;
        }
      }
      // Advance in circular fashion
      index = (index + 1) % queue.length;
    }

    const totalTAT = Object.values(turnaroundTimes).reduce((a, b) => a + b, 0);
    const totalWT = Object.values(waitingTimes).reduce((a, b) => a + b, 0);
    const avgTAT = (totalTAT / processes.length).toFixed(2);
    const avgWT = (totalWT / processes.length).toFixed(2);

    setSimulationResult({
      gantt,
      totalTime: currentTime,
      avgTAT,
      avgWT,
      completionTimes,
      turnaroundTimes,
      waitingTimes
    });

    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  /* ----------------------------------------------------
     2. ELECTRICITY BILL CALCULATOR STATE & LOGIC
  ---------------------------------------------------- */
  const [units, setUnits] = useState(240);
  const [customerType, setCustomerType] = useState('domestic');

  const calculateElectricityBill = () => {
    let bill = 0;
    const u = Math.max(0, Number(units));
    let cluster = '';
    let recommendation = '';

    if (customerType === 'domestic') {
      if (u <= 100) {
        bill = 0; // subsidized
      } else if (u <= 200) {
        bill = (u - 100) * 2.25;
      } else if (u <= 500) {
        bill = 100 * 2.25 + (u - 200) * 4.5;
      } else {
        bill = 100 * 2.25 + 300 * 4.5 + (u - 500) * 6.5;
      }
    } else {
      // Commercial
      if (u <= 100) {
        bill = u * 5.0;
      } else if (u <= 500) {
        bill = 100 * 5.0 + (u - 100) * 7.5;
      } else {
        bill = 100 * 5.0 + 400 * 7.5 + (u - 500) * 9.5;
      }
    }

    // Data mining clustering logic
    if (u <= 100) {
      cluster = 'Cluster Alpha: Low / Eco-Conserver';
      recommendation = 'Excellent energy conservation! Your household stays within the primary subsidized threshold.';
    } else if (u <= 300) {
      cluster = 'Cluster Beta: Moderate Urban Household';
      recommendation = 'Optimal usage. Consider setting AC temperatures to 24°C to stay beneath the 200-unit tier.';
    } else if (u <= 600) {
      cluster = 'Cluster Gamma: High Consumption Bracket';
      recommendation = 'Noticeable peak usage. Transitioning to LED fixtures and solar water heating can lower costs by up to 25%.';
    } else {
      cluster = 'Cluster Delta: Intensive / Peak Load';
      recommendation = 'Peak load registered. A rooftop solar net-metering setup is strongly advised for major long-term savings.';
    }

    return { totalBill: bill.toFixed(2), cluster, recommendation };
  };

  const billData = calculateElectricityBill();

  /* ----------------------------------------------------
     3. E-COMMERCE MINI STORE DEMO
  ---------------------------------------------------- */
  const initialProducts = [
    { id: 1, name: 'Algorithm Handbook (Python)', price: 499, tag: 'Bestseller', emoji: '📘' },
    { id: 2, name: 'Developer Cotton Hoodie', price: 999, tag: 'Merch', emoji: '🧥' },
    { id: 3, name: 'Circular Queue Desk Mat', price: 349, tag: 'Accessory', emoji: '⚡' },
    { id: 4, name: 'Mechanical Key Switch Keychain', price: 199, tag: 'Gear', emoji: '⌨️' }
  ];

  const [cart, setCart] = useState([
    { id: 1, name: 'Algorithm Handbook (Python)', price: 499, quantity: 1, emoji: '📘' }
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'PRATHEEGA15' || promoCode.trim().toUpperCase() === 'KRCT') {
      setDiscountApplied(true);
      try {
        confetti({ particleCount: 40, spread: 50 });
      } catch {}
    } else {
      alert('Try promo code: PRATHEEGA15 or KRCT for 15% discount!');
    }
  };

  return (
    <section id="demos" className="section playground-section">
      <div className="content-wrapper">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} /> Live Interactive Demos
          </div>
          <h2 className="section-title">
            Test My Projects <span className="gradient-text">Live In-Browser</span>
          </h2>
          <p className="section-subtitle">
            Experience the algorithms and project logic firsthand through these interactive sandbox simulators.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="sim-tabs-header">
          <button
            className={`sim-tab-btn ${activeTab === 'round-robin' ? 'active' : ''}`}
            onClick={() => setActiveTab('round-robin')}
          >
            <Cpu size={18} />
            <span>Round Robin CPU Visualizer</span>
          </button>
          <button
            className={`sim-tab-btn ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <Zap size={18} />
            <span>Electricity Bill & Data Mining</span>
          </button>
          <button
            className={`sim-tab-btn ${activeTab === 'ecommerce' ? 'active' : ''}`}
            onClick={() => setActiveTab('ecommerce')}
          >
            <ShoppingBag size={18} />
            <span>Python E-Commerce Cart Engine</span>
          </button>
        </div>

        {/* ==================== TAB 1: ROUND ROBIN ==================== */}
        {activeTab === 'round-robin' && (
          <div className="glass-card sim-container">
            <div className="sim-title-bar">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>
                  Round Robin CPU Scheduling Visualizer
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Simulating circular linked list time-slice preemption across processes.
                </p>
              </div>
              <span className="sim-badge">Circular Linked List Algorithm</span>
            </div>

            {/* Input Controls */}
            <div className="rr-controls-grid">
              <div className="sim-field">
                <label className="sim-label">Time Quantum (q in ms)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={quantum}
                  onChange={(e) => {
                    setQuantum(Math.max(1, Number(e.target.value)));
                    setSimulationResult(null);
                  }}
                  className="sim-input"
                />
              </div>

              <div className="sim-field">
                <label className="sim-label">Process ID</label>
                <input
                  type="text"
                  value={newPid}
                  onChange={(e) => setNewPid(e.target.value)}
                  className="sim-input"
                  placeholder="e.g. P5"
                />
              </div>

              <div className="sim-field">
                <label className="sim-label">Burst Time (ms)</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newBurst}
                  onChange={(e) => setNewBurst(Math.max(1, Number(e.target.value)))}
                  className="sim-input"
                />
              </div>

              <div>
                <button onClick={handleAddProcess} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  <Plus size={16} /> Add Process
                </button>
              </div>
            </div>

            {/* Process Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="process-list-table">
                <thead>
                  <tr>
                    <th>Process</th>
                    <th>Burst Time (BT)</th>
                    <th>Color Indicator</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '700' }}>{p.id}</td>
                      <td>{p.burst} ms</td>
                      <td>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '18px',
                            height: '18px',
                            borderRadius: '4px',
                            backgroundColor: p.color
                          }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemoveProcess(p.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                          title="Remove process"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Run Button */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
              <button onClick={runRoundRobinSimulation} className="btn btn-primary">
                <Play size={18} /> Execute Simulation
              </button>
              <button
                onClick={() => {
                  setProcesses([
                    { id: 'P1', burst: 5, color: '#06b6d4' },
                    { id: 'P2', burst: 3, color: '#8b5cf6' },
                    { id: 'P3', burst: 4, color: '#ec4899' },
                    { id: 'P4', burst: 2, color: '#10b981' }
                  ]);
                  setQuantum(2);
                  setSimulationResult(null);
                }}
                className="btn btn-secondary"
              >
                <RotateCcw size={16} /> Reset Defaults
              </button>
            </div>

            {/* Simulation Output & Gantt Chart */}
            {simulationResult && (
              <div className="gantt-chart-wrapper">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '1.1rem' }}>Gantt Chart Execution Timeline</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Total Time: {simulationResult.totalTime} ms
                  </span>
                </div>

                {/* Animated Visual Bar */}
                <div className="gantt-bar-row">
                  {simulationResult.gantt.map((slot, idx) => {
                    const widthPercent = (slot.duration / simulationResult.totalTime) * 100;
                    return (
                      <div
                        key={idx}
                        className="gantt-segment"
                        style={{
                          width: `${widthPercent}%`,
                          backgroundColor: slot.color
                        }}
                        title={`${slot.id} [${slot.start}ms → ${slot.end}ms]`}
                      >
                        {slot.id}
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  <span>0 ms</span>
                  <span>{Math.round(simulationResult.totalTime / 2)} ms</span>
                  <span>{simulationResult.totalTime} ms</span>
                </div>

                {/* Metrics */}
                <div className="metrics-summary-cards">
                  <div className="metric-card">
                    <div className="metric-val">{simulationResult.avgWT} ms</div>
                    <div className="metric-lbl">Average Waiting Time</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-val">{simulationResult.avgTAT} ms</div>
                    <div className="metric-lbl">Average Turnaround Time</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-val">{quantum} ms</div>
                    <div className="metric-lbl">Active Time Quantum</div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-val">{processes.length}</div>
                    <div className="metric-lbl">Scheduled Processes</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: ELECTRICITY BILLING ==================== */}
        {activeTab === 'billing' && (
          <div className="glass-card sim-container">
            <div className="sim-title-bar">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>
                  Electricity Billing & Consumption Analytics
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Slab-rate tariff computing and data mining cluster classification.
                </p>
              </div>
              <span className="sim-badge">Data Mining Project</span>
            </div>

            <div className="bill-calc-grid">
              <div>
                <div className="sim-field" style={{ marginBottom: '1.25rem' }}>
                  <label className="sim-label">Consumer Category</label>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                    <button
                      onClick={() => setCustomerType('domestic')}
                      className={`btn btn-sm ${customerType === 'domestic' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      Domestic Household
                    </button>
                    <button
                      onClick={() => setCustomerType('commercial')}
                      className={`btn btn-sm ${customerType === 'commercial' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      Commercial Enterprise
                    </button>
                  </div>
                </div>

                <div className="sim-field" style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="sim-label">Units Consumed (kWh)</label>
                    <span style={{ fontWeight: '800', color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>
                      {units} Units
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    style={{ width: '100%', margin: '0.75rem 0', accentColor: 'var(--accent-cyan)' }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {[80, 180, 320, 550, 850].map((quick) => (
                      <button
                        key={quick}
                        onClick={() => setUnits(quick)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        {quick}u
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tariff-card">
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                    Active Slab Rates ({customerType.toUpperCase()})
                  </h4>
                  <div className="tariff-tier-row">
                    <span>0 - 100 Units</span>
                    <span className={units <= 100 ? 'tier-active' : ''}>
                      {customerType === 'domestic' ? '₹0.00 (Subsidized)' : '₹5.00 / unit'}
                    </span>
                  </div>
                  <div className="tariff-tier-row">
                    <span>101 - 200 Units</span>
                    <span className={units > 100 && units <= 200 ? 'tier-active' : ''}>
                      {customerType === 'domestic' ? '₹2.25 / unit' : '₹7.50 / unit'}
                    </span>
                  </div>
                  <div className="tariff-tier-row">
                    <span>201 - 500 Units</span>
                    <span className={units > 200 && units <= 500 ? 'tier-active' : ''}>
                      {customerType === 'domestic' ? '₹4.50 / unit' : '₹7.50 / unit'}
                    </span>
                  </div>
                  <div className="tariff-tier-row">
                    <span>500+ Units</span>
                    <span className={units > 500 ? 'tier-active' : ''}>
                      {customerType === 'domestic' ? '₹6.50 / unit' : '₹9.50 / unit'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Analytics Output Card */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Estimated Electricity Bill
                  </span>
                  <div
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: '800',
                      color: 'var(--accent-emerald)',
                      fontFamily: 'var(--font-heading)',
                      marginTop: '0.2rem'
                    }}
                  >
                    ₹{billData.totalBill}
                  </div>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.25)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--accent-cyan)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      marginBottom: '0.35rem'
                    }}
                  >
                    <TrendingUp size={16} /> Data Mining Profile
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {billData.cluster}
                  </div>
                </div>

                <div
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.25rem' }}>
                    💡 Smart Optimization Tip:
                  </strong>
                  {billData.recommendation}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: E-COMMERCE CART ENGINE ==================== */}
        {activeTab === 'ecommerce' && (
          <div className="glass-card sim-container">
            <div className="sim-title-bar">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>
                  Python E-Commerce Shopping Cart Demo
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
                  Simulating reactive product catalogs, cart state management, and discount computation.
                </p>
              </div>
              <span className="sim-badge">Web Application Project</span>
            </div>

            <div className="bill-calc-grid">
              {/* Product Catalog */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Available Products</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {initialProducts.map((prod) => (
                    <div
                      key={prod.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.6rem' }}>{prod.emoji}</span>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{prod.name}</div>
                          <div style={{ color: 'var(--accent-cyan)', fontWeight: '700', fontSize: '0.85rem' }}>
                            ₹{prod.price}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => addToCart(prod)} className="btn btn-secondary btn-sm">
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping Cart Summary */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontWeight: '700', fontSize: '1.05rem' }}>Your Cart ({cart.length} items)</h4>
                  {cart.length > 0 && (
                    <button
                      onClick={() => setCart([])}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '2rem 1rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem'
                    }}
                  >
                    Your shopping cart is empty. Add items from the catalog!
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.5rem 0',
                          borderBottom: '1px dashed var(--border-subtle)',
                          fontSize: '0.9rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>{item.emoji}</span>
                          <span style={{ fontWeight: '600' }}>{item.name}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ color: 'var(--text-muted)' }}>₹{item.price * item.quantity}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.2rem 0.5rem', minWidth: '24px' }}
                            >
                              -
                            </button>
                            <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="btn btn-secondary btn-sm"
                              style={{ padding: '0.2rem 0.5rem', minWidth: '24px' }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="text"
                    placeholder="Promo code (PRATHEEGA15)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="sim-input"
                    style={{ flexGrow: 1 }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Apply
                  </button>
                </form>

                {discountApplied && (
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--accent-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <CheckCircle2 size={14} /> 15% Student Discount applied!
                  </div>
                )}

                {/* Subtotal & Total */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: 'auto' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {discountApplied && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.9rem',
                        color: 'var(--accent-emerald)'
                      }}
                    >
                      <span>Discount (15%):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '1.25rem',
                      fontWeight: '800',
                      marginTop: '0.5rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <span>Final Amount:</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>₹{finalTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
