🛠️ Retirement Strategy Lab – Build Tracker
✅ Completed
- simulateMonteCarlo.js: core logic for assets, RMDs, taxes, inflation toggling
- getRMD.js: IRS-based life expectancy factors
- getTaxEstimate.js: tax estimator with adjustable deduction
- getRandomReturn.js: stochastic return generator using Gaussian noise
- GitHub repository initialized and synced
- Project folder structure scaffolded

🚧 In Progress
- Modular script.js refactor
- Integration of scoring metrics into simulation
- roadmap.md: active tracking and management
- Preparations for userParams.js and risk envelope modeling
- Market assumption helpers (getMarketAssumptions.js) [design phase]

🧠 Planned (To Build)
📊 Phase 1: Simulation + Multi-Objective Environment
- helpers.js: shared utilities
- assetTrajectory.js and annualFlowChart.js chart modules
- userParams.js: handles planning input ranges (COLA, tax, risk envelope)
- scoringEngine.js: computes lifestyle score, depletion risk, legacy goals
- Scenario comparator (fixed seed or path reuse)
- State tracker for year-by-year variable capture
🤖 Phase 2: Policy Optimization via AI
- strategyEvaluator.js: rule-based multi-objective optimizer
- Reward function design (rewardModel.js)
- RL agent scaffolding (policyLearner.js, environment.js)
- Utility wrappers (marketPaths.js, seedrandom.js)
- Objective modules: lifestyle, legacy, tax minimizer
- Visualization dashboard (policy maps, pareto frontiers, outcome tradeoffs)

🗂️ Current Folder Layout
/retirement-strategy-lab
├─ /phase-1-simulator
│   ├─ /core
│   ├─ /ui
│   ├─ /charts
│   ├─ /inputs
│   ├─ /utils
│   └─ roadmap.md
├─ /phase-2-optimizer
├─ /common



📌 I’ll ping you with update reminders as we progress milestones—like when we finish a module or shift something from “Planned” to “In Progress.” Feel free to remind me too if something major lands on your end.
Want me to create getMarketAssumptions.js next so your risk envelope becomes truly user-driven? Or shall we do an initial scoringEngine.js sketch to frame the multi-goal architecture?
