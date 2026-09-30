export type CaseStudy = {
  slug: string; title: string; result: string; summary: string; repo: string; link?: { label: string; href: string };
  stats: { label: string; value: string }[];
  timeline?: { when: string; what: string; score?: string }[];
  sections: { heading: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "amazon-ml-challenge-2026",
    title: "Amazon ML Challenge 2026: Business Entity Resolution",
    result: "Rank 389 of 10,000+ teams (89k+ individuals registered)",
    summary: "Match noisy, multilingual business records to the right entity at scale. Metric: macro F0.5 per Source-1 entity. France was 15% of test and had no training labels.",
    repo: "https://github.com/Samanyu-dev/amazon-ml-challenge-2026-entity-resolution",
    stats: [{ label: "Best public score", value: "0.986382" }, { label: "Final rank", value: "389" }, { label: "Teams", value: "10,000+" }, { label: "Days", value: "3" }],
    timeline: [
      { when: "Day 1 · v2 + decoder", what: "Lexical blocking + CatBoost; per-entity expected-F0.5 decoder that can predict no match.", score: "0.9624" },
      { when: "Day 1 · v3", what: "New normalisation (legal forms, transliteration, address forms), dense e5-small ANN blocking, 63 C++ features.", score: "0.9720" },
      { when: "Day 2 · v4", what: "Fine-tuned multilingual-e5-small cross-encoder re-reads uncertain targets (Kaggle T4).", score: "0.9814" },
      { when: "Day 2 · v6", what: "e5-base cross-encoder with 600k French pseudo-labels plus group/decoy-context features.", score: "0.9845" },
      { when: "Day 2 · v7d", what: "e5-large (560M, AWS A10G) for US/India; France kept from v6 with its weakest links trimmed.", score: "0.9849" },
      { when: "Day 3 · v7d_acr", what: "Generator audit: clean records are 99.7% correct, so the loss sat in specific noise operations. Added a French acronym rule (99.98% precise on train).", score: "0.9856" },
      { when: "Day 3 · v8b", what: "Acronym rule v2, Indian-script address-number rescue, leak-free stage 2, meta-model with generator fingerprints.", score: "0.9864" },
    ],
    sections: [
      { heading: "Approach", body: "A two-stage pipeline. Stage 1 blocks candidates with lexical and dense ANN retrieval and scores pairs with CatBoost over C++-computed features. Stage 2 uses fine-tuned cross-encoders to re-read uncertain targets. A per-entity decoder maximises expected F0.5 and is allowed to abstain." },
      { heading: "Catching my own leak", body: "Stage 2 was split by predicted anchor instead of true owner, which leaked. Honest validation was 0.98841 rather than the inflated figure. I froze uploads until offline evidence justified the next one." },
      { heading: "France without labels", body: "I built a labelled synthetic France from the real French records, ran it through the full pipeline, and used it to choose the France odds multiplier (x1.4) instead of guessing on the public leaderboard." },
    ],
  },
  {
    slug: "playground-series-s6e9",
    title: "Kaggle Playground S6E9: Will Buy EV",
    result: "Rank 56 of 3,578 teams (top 2%)",
    summary: "Tabular binary classification scored by ROC-AUC. The work was in validation discipline: generator-aware features, cross-fitted target encoding and a CV-validated ensemble.",
    repo: "https://github.com/Samanyu-dev/playground-s6e9",
    link: { label: "Competition", href: "https://www.kaggle.com/competitions/playground-series-s6e9" },
    stats: [{ label: "Rank", value: "56" }, { label: "Teams", value: "3,578" }, { label: "Blend OOF AUC", value: "0.94668" }],
    sections: [
      { heading: "Models", body: "XGBoost, LightGBM, CatBoost, logistic regression, ridge and an MLP, each over generator-aware feature blocks with cross-fitted multi-smoothing target encoding." },
      { heading: "Ensembling", body: "Caruana hill-climbing on rank-transformed OOF predictions, validated by 5-fold meta-CV: selection on four meta-folds, scoring on the fifth. A LightGBM stacker was tested on the same folds." },
      { heading: "Transparency", body: "The best blends include OOF predictions reproduced from public notebooks. The repo contains only my own models and the ensembling machinery." },
    ],
  },
  {
    slug: "casmi26",
    title: "Kaggle CASMI 2026: Molecule ID from Mass Spectra",
    result: "Rank 246 of 1,925 (live)",
    summary: "Identify molecules from tandem mass spectra, scored by MRR@25. Still running, so this page is a work in progress.",
    repo: "https://github.com/Samanyu-dev/casmi26",
    link: { label: "Competition", href: "https://www.kaggle.com/competitions/enveda-CASMI26-molecule-id-mass-spectra" },
    stats: [{ label: "Own baseline", value: "0.140" }, { label: "Adapted public pipeline", value: "0.366" }],
    sections: [
      { heading: "Baseline", body: "My own baseline: a 10 ppm mass filter plus binned cosine library search, scored with a held-out MRR@25 harness." },
      { heading: "Adapted pipeline", body: "A private fork of a public pipeline (credit to its author) reached 0.366 on the public leaderboard. I built a harness that simulates the three candidate classes and found two of them leak, since public models trained on those structures." },
    ],
  },
];
