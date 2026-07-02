// Synonym and adjacent skill mapping for semantic expansion
const skillSynonyms = {
  // AI/ML Group
  "pytorch": ["tensorflow", "jax", "keras", "deep learning", "machine learning", "neural networks", "cuda"],
  "llms": ["large language models", "generative ai", "transformer architecture", "nlp", "prompt engineering", "alignment", "gpt", "bert", "claude", "cohere"],
  "rlhf": ["dpo", "alignment", "reinforcement learning", "puzzles", "preference optimization", "human feedback"],
  "alignment": ["rlhf", "dpo", "safety", "ai safety", "constitutional ai", "model evaluation"],
  
  // Mobile Group
  "react native": ["ios", "android", "swift", "kotlin", "typescript", "javascript", "native bridges", "mobile", "xcode", "android studio"],
  "native bridges": ["swift", "kotlin", "objective-c", "java", "jni", "turbomodules", "fabric"],
  "typescript": ["javascript", "flow", "es6", "node.js"],
  
  // Systems Group
  "rust": ["go", "golang", "c++", "c", "systems programming", "webassembly", "wasm", "tokio", "multithreading"],
  "go": ["rust", "golang", "c++", "microservices", "kubernetes", "grpc", "docker"],
  "distributed consensus": ["raft", "paxos", "etcd", "zookeeper"],
  "raft": ["distributed consensus", "paxos", "eventual consistency"],
  "kubernetes": ["docker", "aws", "gcp", "devops", "cloud", "microservices", "helm"],

  // DevRel / Web Group
  "technical writing": ["documentation", "blogging", "tutorials", "content creation"],
  "public speaking": ["developer advocacy", "devrel", "presentations", "workshops", "meetups"],
  "community building": ["discord", "discourse", "advocacy", "devrel", "forums"],
  "next.js": ["react", "node.js", "javascript", "frontend", "ssr", "typescript"],
  "node.js": ["express", "javascript", "backend", "api integration", "next.js"]
};

// Map levels to years
const levelMinYears = {
  "Junior": 1,
  "Mid": 3,
  "Senior": 5,
  "Lead": 6,
  "Staff": 8,
  "Principal": 10
};

/**
 * Tokenize and lowercase text
 */
function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);
}

/**
 * Parse Job Description to extract requirements dynamically
 */
export function parseJobDescription(jobTitle, jobDescriptionText) {
  const text = jobDescriptionText.toLowerCase();
  
  // 1. Detect seniority level
  let level = "Mid";
  if (text.includes("junior") || text.includes("associate")) level = "Junior";
  else if (text.includes("principal")) level = "Principal";
  else if (text.includes("staff")) level = "Staff";
  else if (text.includes("lead") || text.includes("architect") || text.includes("spearhead")) level = "Lead";
  else if (text.includes("senior") || text.includes("sr.")) level = "Senior";
  
  // 2. Estimate experience required (regex search for "X+ years", "X years", etc.)
  let experienceRequired = levelMinYears[level] || 3;
  const expPatterns = [
    /(\d+)\+?\s*years?/g,
    /(\d+)\s*years?\s+of\s+experience/g,
    /experience\s+of\s+(\d+)\+?\s*years?/g
  ];
  
  for (const pattern of expPatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const val = parseInt(match[1]);
      if (val > 0 && val < 20) {
        experienceRequired = Math.max(experienceRequired, val);
      }
    }
  }

  // 3. Extract core skills based on our dictionary keys
  const skillsDetected = [];
  const allSkillKeys = Object.keys(skillSynonyms);
  
  // Also add some flat skills to look for
  const flatSkills = [
    "python", "pytorch", "tensorflow", "jax", "llms", "rlhf", "alignment", "model evaluation", "prompt engineering",
    "react native", "typescript", "javascript", "ios", "android", "native bridges", "kotlin", "swift", "zustand", "performance optimization",
    "rust", "go", "kubernetes", "grpc", "kafka", "docker", "postgresql", "raft", "distributed consensus", "microservices",
    "next.js", "node.js", "api integration", "technical writing", "public speaking", "community building", "github"
  ];
  
  flatSkills.forEach(skill => {
    // Escape special characters for regex (like . or +)
    const escapedSkill = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (regex.test(text) || regex.test(jobTitle.toLowerCase())) {
      if (!skillsDetected.includes(skill)) {
        skillsDetected.push(skill);
      }
    }
  });

  return {
    title: jobTitle,
    level,
    experienceRequired,
    skills: skillsDetected,
    description: jobDescriptionText
  };
}

/**
 * Calculates semantic skill overlap score (0 to 100)
 */
function calculateSemanticScore(candidateSkills, jdSkills) {
  if (jdSkills.length === 0) return 100;
  
  let totalMatchWeight = 0;
  
  jdSkills.forEach(jdSkill => {
    const jdSkillLower = jdSkill.toLowerCase();
    
    // Direct match (1.0 weight)
    if (candidateSkills.some(cs => cs.toLowerCase() === jdSkillLower)) {
      totalMatchWeight += 1.0;
      return;
    }
    
    // Semantic match via synonyms (0.7 weight)
    const synonyms = skillSynonyms[jdSkillLower] || [];
    const hasSynonym = candidateSkills.some(cs => {
      const csLower = cs.toLowerCase();
      return synonyms.includes(csLower) || (skillSynonyms[csLower] && skillSynonyms[csLower].includes(jdSkillLower));
    });
    
    if (hasSynonym) {
      totalMatchWeight += 0.7; // 70% credit for adjacent skills
      return;
    }

    // Secondary semantic matches (fuzzy substring checks)
    const hasSubstring = candidateSkills.some(cs => {
      const csLower = cs.toLowerCase();
      return csLower.includes(jdSkillLower) || jdSkillLower.includes(csLower);
    });

    if (hasSubstring) {
      totalMatchWeight += 0.4;
    }
  });

  const rawScore = (totalMatchWeight / jdSkills.length) * 100;
  return Math.min(100, Math.round(rawScore));
}

/**
 * Calculates pedigree and experience fit score (0 to 100)
 */
function calculatePedigreeScore(candidate, jd) {
  // 1. Experience Years match (40% weight)
  const reqExp = jd.experienceRequired || 3;
  const candExp = candidate.experienceYears || 0;
  let expScore = 0;
  if (candExp >= reqExp) {
    expScore = 100;
  } else {
    expScore = (candExp / reqExp) * 100;
  }
  
  // 2. Company Tier Prestige (40% weight)
  // Find the highest tier company in their history
  let bestCompanyTier = 3;
  if (candidate.careerHistory && candidate.careerHistory.length > 0) {
    bestCompanyTier = Math.min(...candidate.careerHistory.map(h => h.companyTier || 3));
  }
  
  let companyScore = 60; // default for Tier 3
  if (bestCompanyTier === 1) companyScore = 100;
  else if (bestCompanyTier === 2) companyScore = 80;
  
  // 3. Education Tier Prestige (20% weight)
  const eduTier = candidate.education?.tier || 3;
  let eduScore = 60;
  if (eduTier === 1) eduScore = 100;
  else if (eduTier === 2) eduScore = 80;
  
  // Combine factors
  const finalScore = (expScore * 0.40) + (companyScore * 0.40) + (eduScore * 0.20);
  return Math.round(finalScore);
}

/**
 * Calculates activity and behavioral signals score (0 to 100)
 */
function calculateBehavioralScore(candidate) {
  const signals = candidate.behavioralSignals || {};
  
  // 1. Search Status (35% weight)
  const statusScores = {
    "active": 100,
    "open_to_offers": 85,
    "passive": 60,
    "not_looking": 30
  };
  const searchScore = statusScores[signals.searchStatus] || 50;
  
  // 2. Response Rate (35% weight)
  const responseScore = signals.responseRate || 50;
  
  // 3. Profile Completeness (15% weight)
  const completenessScore = signals.profileCompleteness || 80;
  
  // 4. Last Active Recency (15% weight)
  let recencyScore = 50;
  const la = (signals.lastActive || "").toLowerCase();
  if (la.includes("minute") || la.includes("hour")) {
    recencyScore = 100;
  } else if (la.includes("day")) {
    recencyScore = 85;
  } else if (la.includes("week")) {
    recencyScore = 65;
  } else if (la.includes("month")) {
    recencyScore = 40;
  }
  
  const finalScore = (searchScore * 0.35) + (responseScore * 0.35) + (completenessScore * 0.15) + (recencyScore * 0.15);
  return Math.round(finalScore);
}

/**
 * Generates natural language recruiter remarks and matches explanation
 */
function generateRecruiterRemark(candidate, jd, scoreBreakdown, finalScore) {
  const { semanticScore, pedigreeScore, behavioralScore } = scoreBreakdown;
  const searchStatusMap = {
    active: "actively searching",
    open_to_offers: "open to offers",
    passive: "passive candidate",
    not_looking: "not looking"
  };
  
  const status = searchStatusMap[candidate.behavioralSignals.searchStatus];
  
  // List matching skills
  const matches = candidate.skills.filter(cs => 
    jd.skills.some(js => js.toLowerCase() === cs.toLowerCase())
  );
  
  // List missing skills
  const gaps = jd.skills.filter(js => 
    !candidate.skills.some(cs => cs.toLowerCase() === js.toLowerCase())
  );
  
  // Find if we have adjacent/semantic matches
  const adjacentMatches = [];
  gaps.forEach(gap => {
    const synonyms = skillSynonyms[gap.toLowerCase()] || [];
    const hasAdjacent = candidate.skills.some(cs => synonyms.includes(cs.toLowerCase()));
    if (hasAdjacent) adjacentMatches.push(gap);
  });
  
  const trueGaps = gaps.filter(g => !adjacentMatches.includes(g));

  if (finalScore >= 85) {
    let text = `Exceptional fit (${finalScore}%). ${candidate.name} has a strong alignment (Semantic: ${semanticScore}%) with ${matches.slice(0, 3).join(', ')}`;
    if (adjacentMatches.length > 0) {
      text += ` and adjacent coverage for ${adjacentMatches.slice(0, 2).join(', ')}.`;
    } else {
      text += `.`;
    }
    text += ` Boasts a Tier 1 background at ${candidate.careerHistory[0]?.company || 'top companies'} and is ${status} with a ${candidate.behavioralSignals.responseRate}% response rate.`;
    return text;
  }
  
  if (finalScore >= 70) {
    let text = `Strong match (${finalScore}%). `;
    if (semanticScore >= 80) {
      text += `Great technical skills match (${semanticScore}%), but behavioral responsiveness is lower or they are currently ${status}.`;
    } else if (behavioralScore >= 80) {
      text += `Extremely active & responsive candidate. Technical skills overlap is moderate (${semanticScore}%).`;
      if (adjacentMatches.length > 0) {
        text += ` Note: they have adjacent skills (${adjacentMatches.join(', ')}) that can bridge the gap.`;
      }
    } else {
      text += `Solid background from ${candidate.education.institution}. Overall scores are balanced, but has gaps in: ${trueGaps.slice(0, 2).join(', ')}.`;
    }
    return text;
  }
  
  if (finalScore >= 50) {
    return `Moderate match (${finalScore}%). Candidate possesses ${candidate.experienceYears} years of experience but lacks core skills in ${trueGaps.slice(0, 3).join(', ')}. Currently ${status}.`;
  }
  
  return `Low match (${finalScore}%). Mismatch in required technical stack and experience levels. Better suited for alternative roles.`;
}

/**
 * Main ranking function
 * Returns candidate list with injected scores and reasoning
 */
export function rankCandidates(candidatesList, parsedJd, weights) {
  const { semantic: wSem, pedigree: wPed, behavioral: wBeh } = weights;
  
  return candidatesList.map(candidate => {
    // 1. Calculate components (each is 0 - 100)
    const semanticScore = calculateSemanticScore(candidate.skills, parsedJd.skills);
    const pedigreeScore = calculatePedigreeScore(candidate, parsedJd);
    const behavioralScore = calculateBehavioralScore(candidate);
    
    // 2. Apply weights
    const rawTotal = (semanticScore * wSem) + (pedigreeScore * wPed) + (behavioralScore * wBeh);
    const totalWeights = wSem + wPed + wBeh;
    const finalScore = totalWeights > 0 ? Math.round(rawTotal / totalWeights) : 0;
    
    const scoreBreakdown = {
      semanticScore,
      pedigreeScore,
      behavioralScore
    };
    
    // 3. Generate summary remark
    const remark = generateRecruiterRemark(candidate, parsedJd, scoreBreakdown, finalScore);
    
    // Calculate skill breakdowns for the frontend gap analysis
    const matchedSkills = candidate.skills.filter(cs => 
      parsedJd.skills.some(js => js.toLowerCase() === cs.toLowerCase())
    );
    const gapSkills = parsedJd.skills.filter(js => 
      !candidate.skills.some(cs => cs.toLowerCase() === js.toLowerCase())
    );
    
    const adjacentSkills = [];
    const missingSkills = [];
    
    gapSkills.forEach(gap => {
      const synonyms = skillSynonyms[gap.toLowerCase()] || [];
      const hasAdjacent = candidate.skills.some(cs => synonyms.includes(cs.toLowerCase()));
      if (hasAdjacent) {
        adjacentSkills.push(gap);
      } else {
        missingSkills.push(gap);
      }
    });

    return {
      ...candidate,
      rankingMetrics: {
        finalScore,
        scoreBreakdown,
        remark,
        analysis: {
          matchedSkills,
          adjacentSkills,
          missingSkills
        }
      }
    };
  }).sort((a, b) => b.rankingMetrics.finalScore - a.rankingMetrics.finalScore);
}
