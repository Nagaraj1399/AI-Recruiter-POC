import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Users, 
  Award, 
  ShieldAlert, 
  Cpu, 
  Plus, 
  Sliders, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  MapPin, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  X,
  FileText,
  UserCheck,
  Layers
} from 'lucide-react';
import { jobs } from './data/jobs';
import { candidates } from './data/candidates';
import { parseJobDescription, rankCandidates } from './utils/rankingEngine';

function App() {
  // State
  const [selectedJobId, setSelectedJobId] = useState(jobs[0].id);
  const [customJdText, setCustomJdText] = useState(jobs[0].description);
  
  // Weights (normalized to sum to 100 on frontend for user friendliness)
  const [weights, setWeights] = useState({
    semantic: 50,
    pedigree: 30,
    behavioral: 20
  });

  // Candidate Pool
  const [candidatesPool, setCandidatesPool] = useState(candidates);
  
  // Selection
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [expandedCandidateId, setExpandedCandidateId] = useState(null);
  
  // Comparison Mode State
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [compareCandidateIds, setCompareCandidateIds] = useState([]);

  // Modals
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false);

  // New Candidate Form State
  const [newCandName, setNewCandName] = useState('');
  const [newCandTitle, setNewCandTitle] = useState('');
  const [newCandBio, setNewCandBio] = useState('');
  const [newCandSkills, setNewCandSkills] = useState('');
  const [newCandCompany, setNewCandCompany] = useState('');
  const [newCandCompanyTier, setNewCandCompanyTier] = useState('2');
  const [newCandSchool, setNewCandSchool] = useState('');
  const [newCandSchoolTier, setNewCandSchoolTier] = useState('2');
  const [newCandExp, setNewCandExp] = useState('5');
  const [newCandSalary, setNewCandSalary] = useState('140000');
  const [newCandExpectedSalary, setNewCandExpectedSalary] = useState('160000');
  const [newCandSearchStatus, setNewCandSearchStatus] = useState('active');
  const [newCandResponseRate, setNewCandResponseRate] = useState('90');
  const [newCandVisa, setNewCandVisa] = useState(false);

  // Sync JD text when selected job template changes
  useEffect(() => {
    const job = jobs.find(j => j.id === selectedJobId);
    if (job) {
      setCustomJdText(job.description);
    }
  }, [selectedJobId]);

  // Find currently selected job details
  const currentJobTemplate = useMemo(() => {
    return jobs.find(j => j.id === selectedJobId) || jobs[0];
  }, [selectedJobId]);

  // Dynamic parser for JD
  const parsedJob = useMemo(() => {
    return parseJobDescription(currentJobTemplate.title, customJdText);
  }, [currentJobTemplate.title, customJdText]);

  // Dynamic ranker
  const rankedCandidatesList = useMemo(() => {
    return rankCandidates(candidatesPool, parsedJob, weights);
  }, [candidatesPool, parsedJob, weights]);

  // Set default selected candidate to top ranked on job change or rank change
  useEffect(() => {
    if (rankedCandidatesList.length > 0) {
      // Check if current selection is still in list
      const exists = rankedCandidatesList.some(c => c.id === selectedCandidateId);
      if (!exists) {
        setSelectedCandidateId(rankedCandidatesList[0].id);
      }
    } else {
      setSelectedCandidateId(null);
    }
  }, [rankedCandidatesList, selectedCandidateId]);

  // Find currently selected candidate
  const selectedCandidate = useMemo(() => {
    return rankedCandidatesList.find(c => c.id === selectedCandidateId) || null;
  }, [rankedCandidatesList, selectedCandidateId]);

  // Handle weight slider changes
  const handleWeightChange = (field, val) => {
    const numericVal = parseInt(val);
    setWeights(prev => {
      const diff = prev[field] - numericVal;
      const otherFields = Object.keys(prev).filter(k => k !== field);
      
      // Distribute difference to other fields proportionally
      const totalOthers = otherFields.reduce((sum, k) => sum + prev[k], 0);
      
      const newWeights = { ...prev, [field]: numericVal };
      
      if (totalOthers > 0) {
        otherFields.forEach(k => {
          const share = prev[k] / totalOthers;
          newWeights[k] = Math.max(0, Math.round(prev[k] + diff * share));
        });
      } else {
        // Equal split if others are zero
        otherFields.forEach(k => {
          newWeights[k] = Math.max(0, Math.round(diff / 2));
        });
      }

      // Final sanitization to make sure it sums to exactly 100
      const currentSum = newWeights.semantic + newWeights.pedigree + newWeights.behavioral;
      if (currentSum !== 100) {
        const adjustField = otherFields[0];
        newWeights[adjustField] += (100 - currentSum);
      }

      return newWeights;
    });
  };

  // Compare Mode Toggle Logic
  const toggleCompareMode = () => {
    setIsCompareMode(!isCompareMode);
    if (!isCompareMode && selectedCandidateId) {
      setCompareCandidateIds([selectedCandidateId]);
    } else {
      setCompareCandidateIds([]);
    }
  };

  const handleSelectForComparison = (candId) => {
    setCompareCandidateIds(prev => {
      if (prev.includes(candId)) {
        return prev.filter(id => id !== candId);
      }
      if (prev.length < 2) {
        return [...prev, candId];
      }
      // If 2 already selected, replace the second one
      return [prev[0], candId];
    });
  };

  // Add a new candidate
  const handleAddCandidate = (e) => {
    e.preventDefault();
    if (!newCandName || !newCandTitle) return;

    const skillArray = newCandSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newCandidate = {
      id: `cand-${Date.now()}`,
      name: newCandName,
      title: newCandTitle,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      email: `${newCandName.toLowerCase().replace(/\s+/g, '')}@talentcloud.io`,
      location: "San Francisco, CA (Remote Option)",
      experienceYears: parseInt(newCandExp),
      currentSalary: parseInt(newCandSalary),
      expectedSalary: parseInt(newCandExpectedSalary),
      visaRequired: newCandVisa,
      education: {
        degree: "BS in Computer Science",
        institution: newCandSchool || "State University",
        tier: parseInt(newCandSchoolTier)
      },
      skills: skillArray,
      bio: newCandBio || `Experienced developer specializing in ${newCandTitle}.`,
      careerHistory: [
        {
          role: newCandTitle,
          company: newCandCompany || "Fast-growth startup",
          companyTier: parseInt(newCandCompanyTier),
          duration: "2022 - Present",
          description: `Architected system elements and collaborated on modern tooling stacks.`
        }
      ],
      behavioralSignals: {
        searchStatus: newCandSearchStatus,
        responseRate: parseInt(newCandResponseRate),
        lastActive: "1 minute ago",
        profileCompleteness: 90,
        interviewPassRate: 80
      }
    };

    setCandidatesPool(prev => [newCandidate, ...prev]);
    setIsAddCandidateOpen(false);
    setSelectedCandidateId(newCandidate.id);
    if (isCompareMode) {
      handleSelectForComparison(newCandidate.id);
    }

    // Reset Form
    setNewCandName('');
    setNewCandTitle('');
    setNewCandBio('');
    setNewCandSkills('');
    setNewCandCompany('');
    setNewCandSchool('');
  };

  // Diagnostic questions helper based on missing skills
  const interviewQuestions = useMemo(() => {
    if (!selectedCandidate) return [];
    const missing = selectedCandidate.rankingMetrics.analysis.missingSkills;
    const adjacent = selectedCandidate.rankingMetrics.analysis.adjacentSkills;
    const questions = [];

    if (missing.includes("RLHF") || missing.includes("Alignment")) {
      questions.push("How would you address safety guardrails and preference optimization (like DPO or RLHF) if model behavior shows persistent bias?");
    }
    if (missing.includes("Rust")) {
      questions.push("Given your background in high-level languages, how do you manage low-level details like memory safety and concurrency models when moving to production infrastructure?");
    }
    if (missing.includes("Raft") || missing.includes("Distributed Consensus")) {
      questions.push("Can you explain how a consensus engine like Raft or Paxos manages replication across state machines, and how you design around network partitions?");
    }
    if (missing.includes("React Native")) {
      questions.push("How do you handle bridge-level threading issues and maximize FPS rendering when translating web UI components to native mobile controls?");
    }
    if (adjacent.length > 0) {
      questions.push(`We notice you have experience in ${selectedCandidate.skills.slice(0,2).join(', ')}. How easily can you translate that to our requirement for ${adjacent.slice(0, 2).join(' / ')}?`);
    }

    // Default general question if none triggered
    if (questions.length === 0) {
      questions.push(`Can you walk us through a challenging project where you successfully optimized a bottleneck using ${selectedCandidate.skills.slice(0, 2).join(' or ')}?`);
      questions.push("How do you coordinate with product managers and engineers to align design architecture with actual delivery targets?");
    }

    return questions;
  }, [selectedCandidate]);

  // Render Comparison View
  const renderComparison = (candA, candB) => {
    if (!candA || !candB) return null;
    return (
      <div className="comparison-grid">
        {/* HEADER ROw */}
        <div className="compare-header-row">
          <div className="compare-header-col">
            <img src={candA.avatar} alt={candA.name} className="profile-avatar-large" />
            <h3 style={{color: 'var(--color-accent)'}}>{candA.name}</h3>
            <span className="profile-title">{candA.rankingMetrics.finalScore}% Overall Match</span>
          </div>
          <div className="compare-header-col divider">
            <span className="vs-badge">VS</span>
          </div>
          <div className="compare-header-col">
            <img src={candB.avatar} alt={candB.name} className="profile-avatar-large" />
            <h3 style={{color: 'var(--color-primary)'}}>{candB.name}</h3>
            <span className="profile-title">{candB.rankingMetrics.finalScore}% Overall Match</span>
          </div>
        </div>

        {/* HEAD-TO-HEAD STATS */}
        <div className="compare-section-title">Scores Head-to-Head</div>
        <div className="compare-stats-container">
          {/* Semantic */}
          <div className="compare-stat-row">
            <div className="stat-col left">
              <span className="stat-val">{candA.rankingMetrics.scoreBreakdown.semanticScore}%</span>
              <div className="stat-bar-bg"><div className="stat-bar-fill semantic" style={{width: `${candA.rankingMetrics.scoreBreakdown.semanticScore}%`}}></div></div>
            </div>
            <div className="stat-label">Semantic Match</div>
            <div className="stat-col right">
              <div className="stat-bar-bg reverse"><div className="stat-bar-fill semantic right" style={{width: `${candB.rankingMetrics.scoreBreakdown.semanticScore}%`}}></div></div>
              <span className="stat-val">{candB.rankingMetrics.scoreBreakdown.semanticScore}%</span>
            </div>
          </div>
          {/* Pedigree */}
          <div className="compare-stat-row">
            <div className="stat-col left">
              <span className="stat-val">{candA.rankingMetrics.scoreBreakdown.pedigreeScore}%</span>
              <div className="stat-bar-bg"><div className="stat-bar-fill pedigree" style={{width: `${candA.rankingMetrics.scoreBreakdown.pedigreeScore}%`}}></div></div>
            </div>
            <div className="stat-label">Pedigree</div>
            <div className="stat-col right">
              <div className="stat-bar-bg reverse"><div className="stat-bar-fill pedigree right" style={{width: `${candB.rankingMetrics.scoreBreakdown.pedigreeScore}%`}}></div></div>
              <span className="stat-val">{candB.rankingMetrics.scoreBreakdown.pedigreeScore}%</span>
            </div>
          </div>
          {/* Behavioral */}
          <div className="compare-stat-row">
            <div className="stat-col left">
              <span className="stat-val">{candA.rankingMetrics.scoreBreakdown.behavioralScore}%</span>
              <div className="stat-bar-bg"><div className="stat-bar-fill behavioral" style={{width: `${candA.rankingMetrics.scoreBreakdown.behavioralScore}%`}}></div></div>
            </div>
            <div className="stat-label">Behavioral</div>
            <div className="stat-col right">
              <div className="stat-bar-bg reverse"><div className="stat-bar-fill behavioral right" style={{width: `${candB.rankingMetrics.scoreBreakdown.behavioralScore}%`}}></div></div>
              <span className="stat-val">{candB.rankingMetrics.scoreBreakdown.behavioralScore}%</span>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="compare-section-title">Matched Skills Comparison</div>
        <div className="compare-skills-row">
           <div className="compare-skills-col">
              {candA.rankingMetrics.analysis.matchedSkills.map(s => <span key={s} className="cloud-pill matched">{s}</span>)}
           </div>
           <div className="compare-skills-divider"></div>
           <div className="compare-skills-col">
              {candB.rankingMetrics.analysis.matchedSkills.map(s => <span key={s} className="cloud-pill matched">{s}</span>)}
           </div>
        </div>

        {/* VERDICT */}
        <div className="compare-section-title">AI Recommendation Contrast</div>
        <div className="compare-verdict-row">
           <div className="compare-verdict-col">
              <p className="remark-text compare-remark a">{candA.rankingMetrics.remark}</p>
           </div>
           <div className="compare-verdict-col">
              <p className="remark-text compare-remark b">{candB.rankingMetrics.remark}</p>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <div className="logo-section">
          <div className="logo-icon">R</div>
          <h1 className="logo-text">RecruitAI</h1>
          <span style={{color: 'rgba(255,255,255,0.3)', margin: '0 8px'}}>|</span>
          <span style={{color: '#9f75ff', fontWeight: 500, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <Cpu size={14} /> Neural Ranking POC
          </span>
        </div>
        <div className="status-badge">
          <div className="pulse-dot"></div>
          Recruiting Engine Active
        </div>
      </header>

      {/* WORKSPACE GRID */}
      <div className={`dashboard-grid ${isCompareMode ? 'compare-active' : ''}`}>
        
        {/* LEFT COLUMN: JOB UNDERSTANDING & WEIGHTS */}
        <section className="panel" id="left-panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <FileText size={18} className="score-high" />
              <h2 className="panel-title">Job Intelligence</h2>
            </div>
          </div>
          
          <div className="panel-content">
            <div className="form-group">
              <label className="form-label" htmlFor="job-template-select">Job Description Template</label>
              <select 
                id="job-template-select" 
                className="select-input"
                value={selectedJobId} 
                onChange={(e) => setSelectedJobId(e.target.value)}
              >
                {jobs.map(job => (
                  <option key={job.id} value={job.id}>{job.title}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="jd-textarea">Custom Job Description</label>
              <textarea
                id="jd-textarea"
                className="textarea-input"
                value={customJdText}
                onChange={(e) => setCustomJdText(e.target.value)}
                placeholder="Paste or write job description requirements..."
              />
            </div>

            <div className="info-box">
              <div className="info-box-title">Deep Understanding Diagnostics</div>
              <p>Seniority Level Detected: <strong style={{color: 'white'}}>{parsedJob.level}</strong></p>
              <p style={{marginTop: '2px'}}>Min Experience Required: <strong style={{color: 'white'}}>{parsedJob.experienceRequired} Years</strong></p>
              <div style={{marginTop: '6px', display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
                {parsedJob.skills.slice(0, 6).map((skill, i) => (
                  <span key={i} style={{fontSize: '9px', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)'}}>
                    {skill}
                  </span>
                ))}
                {parsedJob.skills.length > 6 && <span style={{fontSize: '9px', padding: '2px 4px', color: 'var(--text-muted)'}}>+{parsedJob.skills.length - 6} more</span>}
              </div>
            </div>

            <div className="form-group" style={{marginTop: '4px'}}>
              <div className="panel-title-group" style={{marginBottom: '10px'}}>
                <Sliders size={16} style={{color: 'var(--color-primary)'}} />
                <h3 className="panel-title" style={{fontSize: '13px'}}>Signal Weights Configurator</h3>
              </div>
              
              <div className="slider-group">
                <div className="slider-info">
                  <span className="slider-title">🎯 Semantic Relevance</span>
                  <span className="slider-val">{weights.semantic}%</span>
                </div>
                <input 
                  type="range" 
                  className="range-slider primary"
                  min="10" 
                  max="80" 
                  value={weights.semantic} 
                  onChange={(e) => handleWeightChange('semantic', e.target.value)} 
                />
              </div>

              <div className="slider-group">
                <div className="slider-info">
                  <span className="slider-title">🏆 Pedigree & Metadata</span>
                  <span className="slider-val">{weights.pedigree}%</span>
                </div>
                <input 
                  type="range" 
                  className="range-slider"
                  min="10" 
                  max="80" 
                  value={weights.pedigree} 
                  onChange={(e) => handleWeightChange('pedigree', e.target.value)} 
                />
              </div>

              <div className="slider-group">
                <div className="slider-info">
                  <span className="slider-title">⚡ Activity & Behavior</span>
                  <span className="slider-val">{weights.behavioral}%</span>
                </div>
                <input 
                  type="range" 
                  className="range-slider"
                  min="10" 
                  max="80" 
                  value={weights.behavioral} 
                  onChange={(e) => handleWeightChange('behavioral', e.target.value)} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: SHORTLIST OF CANDIDATES */}
        <section className="panel" id="center-panel">
          <div className="panel-header">
            <div className="panel-title-group">
              <Users size={18} style={{color: 'var(--color-primary)'}} />
              <h2 className="panel-title">Shortlist Candidates</h2>
            </div>
            <div style={{display: 'flex', gap: '8px'}}>
              <button 
                className={`btn-secondary ${isCompareMode ? 'active-toggle' : ''}`}
                onClick={toggleCompareMode}
                style={{padding: '6px 10px', fontSize: '12px', borderColor: isCompareMode ? 'var(--color-accent)' : ''}}
                title="Toggle Head-to-Head Compare Mode"
              >
                <Layers size={14} color={isCompareMode ? 'var(--color-accent)' : 'currentColor'} /> 
                {isCompareMode ? 'Exit Compare' : 'Compare'}
              </button>
              <button 
                className="btn-primary" 
                onClick={() => setIsAddCandidateOpen(true)}
                style={{padding: '6px 10px', fontSize: '12px'}}
              >
                <Plus size={14} /> Add Candidate
              </button>
            </div>
          </div>

          <div className="panel-content">
            <div className="list-controls">
              <span className="candidate-count">Showing {rankedCandidatesList.length} ranked candidate profiles</span>
            </div>

            <div className="candidates-list-container">
              {rankedCandidatesList.map((cand, index) => {
                const isSelectedForCompare = compareCandidateIds.includes(cand.id);
                const isSelected = isCompareMode ? isSelectedForCompare : cand.id === selectedCandidateId;
                const isExpanded = cand.id === expandedCandidateId;
                const score = cand.rankingMetrics.finalScore;
                
                let scoreClass = 'score-high';
                if (score < 50) scoreClass = 'score-low';
                else if (score < 75) scoreClass = 'score-med';

                let rankClass = 'rank-other';
                if (index === 0) rankClass = 'rank-top1';
                else if (index < 3) rankClass = 'rank-top3';

                // Status pill styles
                const statusMap = {
                  active: { label: 'Active Search', class: 'pill-active' },
                  open_to_offers: { label: 'Open to Offers', class: 'pill-offers' },
                  passive: { label: 'Passive', class: 'pill-passive' },
                  not_looking: { label: 'Not looking', class: 'pill-notlooking' }
                };
                const status = statusMap[cand.behavioralSignals.searchStatus] || { label: 'Passive', class: 'pill-passive' };

                return (
                  <div 
                    key={cand.id}
                    className={`candidate-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isCompareMode) {
                        handleSelectForComparison(cand.id);
                      } else {
                        setSelectedCandidateId(cand.id);
                      }
                    }}
                  >
                    <div className="card-main-info">
                      {!isCompareMode && <div className={`rank-badge ${rankClass}`}>{index + 1}</div>}
                      {isCompareMode && (
                        <div className={`compare-checkbox ${isSelectedForCompare ? 'checked' : ''}`}>
                          {isSelectedForCompare && <CheckCircle size={14} color="#060814" strokeWidth={3} />}
                        </div>
                      )}
                      <img src={cand.avatar} alt={cand.name} className="cand-avatar" />
                      
                      <div className="cand-details">
                        <div className="cand-name-row">
                          <span className="cand-name">{cand.name}</span>
                          <span className={`score-badge ${scoreClass}`}>{score}%</span>
                        </div>
                        <div className="cand-role">{cand.title}</div>
                        
                        <div className="cand-meta-pills">
                          <span className="pill pill-exp">{cand.experienceYears} Yrs Exp</span>
                          <span className={`pill ${status.class}`}>{status.label}</span>
                          {cand.careerHistory[0] && (
                            <span className="pill pill-tier">
                              Tier {cand.careerHistory[0].companyTier} Company
                            </span>
                          )}
                        </div>
                      </div>

                      {!isCompareMode && (
                        <button 
                          className="btn-secondary"
                          style={{padding: '4px 8px', fontSize: '10px'}}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCandidateId(isExpanded ? null : cand.id);
                          }}
                        >
                          {isExpanded ? 'Hide Details' : 'Scores'}
                        </button>
                      )}
                    </div>

                    {isExpanded && !isCompareMode && (
                      <div className="card-expanded-content">
                        <div className="score-bars-container">
                          <div className="score-bar-row">
                            <span className="score-bar-label">Semantic Match</span>
                            <div className="score-bar-track">
                              <div className="score-bar-fill semantic" style={{width: `${cand.rankingMetrics.scoreBreakdown.semanticScore}%`}}></div>
                            </div>
                            <span className="score-bar-val">{cand.rankingMetrics.scoreBreakdown.semanticScore}</span>
                          </div>

                          <div className="score-bar-row">
                            <span className="score-bar-label">Career Pedigree</span>
                            <div className="score-bar-track">
                              <div className="score-bar-fill pedigree" style={{width: `${cand.rankingMetrics.scoreBreakdown.pedigreeScore}%`}}></div>
                            </div>
                            <span className="score-bar-val">{cand.rankingMetrics.scoreBreakdown.pedigreeScore}</span>
                          </div>

                          <div className="score-bar-row">
                            <span className="score-bar-label">Activity Signals</span>
                            <div className="score-bar-track">
                              <div className="score-bar-fill behavioral" style={{width: `${cand.rankingMetrics.scoreBreakdown.behavioralScore}%`}}></div>
                            </div>
                            <span className="score-bar-val">{cand.rankingMetrics.scoreBreakdown.behavioralScore}</span>
                          </div>
                        </div>

                        <p className="remark-text">
                          {cand.rankingMetrics.remark}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: CANDIDATE DIAGNOSTICS & VERDICT OR COMPARISON */}
        <section className={`panel ${isCompareMode ? 'comparison-panel' : ''}`} id="right-panel">
          <div className="panel-header">
            <div className="panel-title-group">
              {isCompareMode ? <Layers size={18} style={{color: 'var(--color-accent)'}} /> : <UserCheck size={18} style={{color: 'var(--color-accent)'}} />}
              <h2 className="panel-title">{isCompareMode ? "Head-to-Head Comparison" : "Diagnostic Insights"}</h2>
            </div>
          </div>

          <div className="panel-content">
            {isCompareMode ? (
              // COMPARISON VIEW
              <div className="comparison-view-container">
                {compareCandidateIds.length === 2 ? (
                  renderComparison(
                    rankedCandidatesList.find(c => c.id === compareCandidateIds[0]),
                    rankedCandidatesList.find(c => c.id === compareCandidateIds[1])
                  )
                ) : (
                  <div className="empty-state">
                    <Layers size={40} className="empty-state-icon" style={{color: 'var(--color-accent)', opacity: 0.5}} />
                    <p style={{fontSize: '14px', fontWeight: 500}}>Comparison Mode Active</p>
                    <p style={{fontSize: '12px', opacity: 0.7}}>Please select exactly two candidates from the shortlist on the left to compare them head-to-head.</p>
                  </div>
                )}
              </div>
            ) : (
              // STANDARD DIAGNOSTIC VIEW
              selectedCandidate ? (
                <>
                  <div className="profile-hero">
                    <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="profile-avatar-large" />
                    <h3>{selectedCandidate.name}</h3>
                    <span className="profile-title">{selectedCandidate.title}</span>
                    
                    <div className="profile-actions">
                      <button className="btn-primary" onClick={() => alert(`Initiating outreach to ${selectedCandidate.name} at ${selectedCandidate.email}`)}>
                        Send Reach Out
                      </button>
                      <button className="btn-secondary">
                        Download PDF CV
                      </button>
                    </div>
                  </div>

                  <div className="contact-info-grid">
                    <div className="contact-item">
                      <span className="contact-label">Email Address</span>
                      <span className="contact-val" title={selectedCandidate.email}>{selectedCandidate.email}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Location</span>
                      <span className="contact-val">{selectedCandidate.location}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Expected Comp</span>
                      <span className="contact-val">${selectedCandidate.expectedSalary.toLocaleString()}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Work Authorization</span>
                      <span className="contact-val">{selectedCandidate.visaRequired ? "Requires Visa Sponsorship" : "US Citizen/PR"}</span>
                    </div>
                  </div>

                  <div className="diagnostic-section">
                    <div className="diagnostic-title">
                      <Award size={15} style={{color: '#10b981'}} />
                      <span>Skill Fit Diagnostics</span>
                    </div>
                    
                    <div className="skill-comparison-box">
                      <div className="skills-legend">
                        <div className="legend-item"><span className="dot matched"></span><span>Direct Match</span></div>
                        <div className="legend-item"><span className="dot adjacent"></span><span>Adjacent Fit</span></div>
                        <div className="legend-item"><span className="dot missing"></span><span>Skill Gap</span></div>
                      </div>

                      <div className="skills-cloud">
                        {selectedCandidate.rankingMetrics.analysis.matchedSkills.map((skill, idx) => (
                          <span key={`m-${idx}`} className="cloud-pill matched">{skill}</span>
                        ))}
                        {selectedCandidate.rankingMetrics.analysis.adjacentSkills.map((skill, idx) => (
                          <span key={`a-${idx}`} className="cloud-pill adjacent" title="Possesses adjacent skills that overlap conceptually.">{skill}</span>
                        ))}
                        {selectedCandidate.rankingMetrics.analysis.missingSkills.map((skill, idx) => (
                          <span key={`g-${idx}`} className="cloud-pill missing">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="diagnostic-section">
                    <div className="diagnostic-title">
                      <Briefcase size={15} style={{color: 'var(--color-primary)'}} />
                      <span>Career Track History</span>
                    </div>

                    <div className="timeline">
                      {selectedCandidate.careerHistory.map((hist, idx) => (
                        <div key={idx} className="timeline-item">
                          <div className="timeline-dot"></div>
                          <div className="timeline-header">
                            <span className="timeline-role">{hist.role}</span>
                            <span className="contact-label" style={{fontSize: '10px'}}>{hist.duration}</span>
                          </div>
                          <div className="timeline-company">{hist.company} (Tier {hist.companyTier} Company)</div>
                          <p className="timeline-desc">{hist.description}</p>
                        </div>
                      ))}
                      <div className="timeline-item">
                        <div className="timeline-dot" style={{background: '#a855f7'}}></div>
                        <div className="timeline-header">
                          <span className="timeline-role">{selectedCandidate.education.degree}</span>
                        </div>
                        <div className="timeline-company">{selectedCandidate.education.institution}</div>
                      </div>
                    </div>
                  </div>

                  <div className="diagnostic-section">
                    <div className="diagnostic-title">
                      <ShieldAlert size={15} style={{color: 'var(--color-accent)'}} />
                      <span>AI Recruiting Recommendation</span>
                    </div>

                    <div className="verdict-box">
                      <div className="verdict-header">
                        <span>VERDICT SUMMARY</span>
                      </div>
                      <ul className="verdict-bullet-list">
                        <li className="verdict-bullet strength">
                          <strong>Strengths: </strong>
                          {selectedCandidate.rankingMetrics.scoreBreakdown.semanticScore >= 80 
                            ? `High structural fit for ${parsedJob.title}. Strong technical knowledge.` 
                            : "Great adaptability and proven background at high-reputation organizations."}
                          {selectedCandidate.behavioralSignals.responseRate >= 80 && " Very high interest likelihood (active search status)."}
                        </li>
                        
                        {selectedCandidate.rankingMetrics.analysis.missingSkills.length > 0 && (
                          <li className="verdict-bullet concern">
                            <strong>Gap Areas: </strong>
                            Lacks direct experience in: {selectedCandidate.rankingMetrics.analysis.missingSkills.slice(0, 3).join(', ')}.
                          </li>
                        )}

                        {selectedCandidate.behavioralSignals.responseRate < 60 && (
                          <li className="verdict-bullet concern">
                            <strong>Outreach risk: </strong>
                            Passive candidate, response rates are historical lows ({selectedCandidate.behavioralSignals.responseRate}%). Needs executive sponsor email.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="diagnostic-section" style={{marginBottom: '20px'}}>
                    <div className="diagnostic-title">
                      <HelpCircle size={15} style={{color: '#c084fc'}} />
                      <span>Customized Interview Questions</span>
                    </div>
                    <ul style={{paddingLeft: '16px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)'}}>
                      {interviewQuestions.map((q, i) => (
                        <li key={i} style={{lineHeight: '1.4'}}>
                          <span style={{color: 'white', fontWeight: '500'}}>Q{i+1}: </span>{q}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <Users size={40} className="empty-state-icon" />
                  <p>Select a candidate to view diagnostic alignment and AI recruiter recommendations</p>
                </div>
              )
            )}
          </div>
        </section>

      </div>

      {/* ADD CANDIDATE MODAL */}
      {isAddCandidateOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3 className="panel-title">Add Candidate Profile</h3>
              <button className="close-btn" onClick={() => setIsAddCandidateOpen(false)}>
                <X size={18} />
              </button>
            </header>

            <form onSubmit={handleAddCandidate}>
              <div className="modal-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-name-input">Full Name</label>
                    <input 
                      id="cand-name-input"
                      type="text" 
                      className="text-input" 
                      value={newCandName} 
                      onChange={(e) => setNewCandName(e.target.value)} 
                      placeholder="e.g. Liam Sterling"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-title-input">Professional Title</label>
                    <input 
                      id="cand-title-input"
                      type="text" 
                      className="text-input" 
                      value={newCandTitle} 
                      onChange={(e) => setNewCandTitle(e.target.value)} 
                      placeholder="e.g. AI Engineer"
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cand-bio-input">Professional Summary</label>
                  <textarea 
                    id="cand-bio-input"
                    className="textarea-input" 
                    value={newCandBio} 
                    onChange={(e) => setNewCandBio(e.target.value)} 
                    placeholder="Short summary of background..."
                    style={{minHeight: '60px'}}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cand-skills-input">Skills (comma-separated)</label>
                  <input 
                    id="cand-skills-input"
                    type="text" 
                    className="text-input" 
                    value={newCandSkills} 
                    onChange={(e) => setNewCandSkills(e.target.value)} 
                    placeholder="Python, PyTorch, LLMs, RLHF"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-company-input">Recent Company</label>
                    <input 
                      id="cand-company-input"
                      type="text" 
                      className="text-input" 
                      value={newCandCompany} 
                      onChange={(e) => setNewCandCompany(e.target.value)} 
                      placeholder="Google"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-company-tier">Company Reputation</label>
                    <select 
                      id="cand-company-tier"
                      className="select-input" 
                      value={newCandCompanyTier} 
                      onChange={(e) => setNewCandCompanyTier(e.target.value)}
                    >
                      <option value="1">Tier 1 (Stripe, FAANG, OpenAI)</option>
                      <option value="2">Tier 2 (Mid-tier/Established)</option>
                      <option value="3">Tier 3 (Small Startup/Agency)</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-school-input">Alma Mater / University</label>
                    <input 
                      id="cand-school-input"
                      type="text" 
                      className="text-input" 
                      value={newCandSchool} 
                      onChange={(e) => setNewCandSchool(e.target.value)} 
                      placeholder="MIT"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-school-tier">School Tier</label>
                    <select 
                      id="cand-school-tier"
                      className="select-input" 
                      value={newCandSchoolTier} 
                      onChange={(e) => setNewCandSchoolTier(e.target.value)}
                    >
                      <option value="1">Tier 1 (Stanford, Ivy, top-5 CS)</option>
                      <option value="2">Tier 2 (Reputable state school)</option>
                      <option value="3">Tier 3 (Non-traditional/Bootcamp)</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-exp-input">Years of Experience</label>
                    <input 
                      id="cand-exp-input"
                      type="number" 
                      className="text-input" 
                      min="0" 
                      max="30" 
                      value={newCandExp} 
                      onChange={(e) => setNewCandExp(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-status-input">Search Status</label>
                    <select 
                      id="cand-status-input"
                      className="select-input" 
                      value={newCandSearchStatus} 
                      onChange={(e) => setNewCandSearchStatus(e.target.value)}
                    >
                      <option value="active">Active Search</option>
                      <option value="open_to_offers">Open to Offers</option>
                      <option value="passive">Passive Candidate</option>
                      <option value="not_looking">Not Looking</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="cand-rr-input">Expected Response Rate (%)</label>
                    <input 
                      id="cand-rr-input"
                      type="number" 
                      className="text-input" 
                      min="0" 
                      max="100" 
                      value={newCandResponseRate} 
                      onChange={(e) => setNewCandResponseRate(e.target.value)} 
                    />
                  </div>
                  <div className="form-group" style={{justifyContent: 'center', paddingLeft: '4px'}}>
                    <label className="form-label" style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '16px'}}>
                      <input 
                        type="checkbox" 
                        checked={newCandVisa} 
                        onChange={(e) => setNewCandVisa(e.target.checked)} 
                        style={{width: '16px', height: '16px'}}
                      />
                      <span>Requires Visa Sponsorship</span>
                    </label>
                  </div>
                </div>
              </div>

              <footer className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsAddCandidateOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Add Candidate Profile</button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
