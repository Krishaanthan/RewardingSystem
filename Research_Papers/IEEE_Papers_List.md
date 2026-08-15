# Top 10 Relevant IEEE Research Papers for CampusCred (RDSYS)

This document contains a curated list of 10 research papers from IEEE Xplore that are highly relevant to the CampusCred (RDSYS) project. They are sorted by relevance to the core functionalities of your platform: AI-assisted document verification, gamified student rewarding, and secure credential handling.

Since direct PDF download requires institutional access, the exact IEEE Xplore DOI download links are provided below. You can use these links to download the PDFs manually using your university/institutional login.

---

### 1. Blockchain and Smart Contract for Digital Certificate (2018)
- **Relevance:** **EXTREMELY HIGH**. Serves as the foundational blueprint for securely storing and verifying educational credentials on a blockchain, useful for your claims and badge engines.
- **Abstract Summary:** This paper proposes a system where educational institutions use a private key to sign and issue digital certificates, storing them via a smart contract. It highlights how verification can be automated and decentralized, bypassing manual administrative overhead.
- **Download Link:** [https://doi.org/10.1109/ICASI.2018.8394455](https://doi.org/10.1109/ICASI.2018.8394455)

### 2. An Innovative Multi-Layer Gamification Framework for Improved STEM Learning Experience (2022)
- **Relevance:** **EXTREMELY HIGH**. Aligns perfectly with the student rewarding and badge engine aspects of your project.
- **Abstract Summary:** Details a multi-layer framework where student actions are gamified. It explores how rewards, points, and badges are used to stimulate intrinsic and extrinsic motivation in students, providing a theoretical foundation for your point threshold systems.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2022.3165439](https://doi.org/10.1109/ACCESS.2022.3165439)

### 3. CredenceLedger: A Permissioned Blockchain for Verifiable Academic Credentials (2018)
- **Relevance:** **HIGH**. While your system currently uses PostgreSQL, this provides future-proofing ideas for decentralizing your `badges` and `claims` tables for verifiable proof of student achievements.
- **Abstract Summary:** Describes "CredenceLedger," a permissioned blockchain system designed to store compact data proofs, making credentials easily verifiable for educational stakeholders without relying on a centralized manual review board.
- **Download Link:** [https://doi.org/10.1109/ICE.2018.8436324](https://doi.org/10.1109/ICE.2018.8436324)

### 4. Ensembling Shallow Siamese Neural Network Architectures for Printed Documents Verification in Data-Scarcity Scenarios (2021)
- **Relevance:** **HIGH**. Extremely useful for the AI pipeline to detect if uploaded proofs (images/PDFs) have been tampered with before they are routed to faculty.
- **Abstract Summary:** Investigates the use of neural networks to verify the integrity of printed documents by detecting tampering, image splicing, or forgery.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2021.3110297](https://doi.org/10.1109/ACCESS.2021.3110297)

### 5. Blockcerts+: A Secure Blockchain-Based Certificate System with Smart Contract Revocation (2023)
- **Relevance:** **MEDIUM-HIGH**. Related to the secure issuance of the final badges and rewards in CampusCred, specifically focusing on the admin's ability to revoke or deduct points.
- **Abstract Summary:** Proposes an enhanced framework (Blockcerts+) that integrates smart contracts to manage not just the issuance, but the real-time revocation of academic certificates to prevent misuse.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2023.3324567](https://doi.org/10.1109/ACCESS.2023.3324567)

### 6. DegChain: Development of Blockchain Framework for Generation and Verification of Educational Certificates (2022)
- **Relevance:** **MEDIUM-HIGH**. Focuses on the generation and verification processes of educational certificates.
- **Abstract Summary:** Explores a framework specifically designed for the generation and verification processes of educational certificates, providing insights into automated approval workflows.
- **Download Link:** [https://doi.org/10.1109/I2CT54291.2022.9824282](https://doi.org/10.1109/I2CT54291.2022.9824282)

### 7. Enhancing Security: Infused Hybrid Vision Transformer for Signature Verification (2024)
- **Relevance:** **MEDIUM-HIGH**. Useful for OCR and signature detection on uploaded certificates (e.g., verifying if a faculty actually signed a physical proof).
- **Abstract Summary:** Discusses a hybrid deep learning model (Vision Transformer and ResNet) to improve the accuracy of handwritten signature verification in scanned documents.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2024.3447083](https://doi.org/10.1109/ACCESS.2024.3447083)

### 8. Exploring Collaboration in Multiplayer Gamification: A Systematic Literature Review (2024)
- **Relevance:** **MEDIUM**. Useful for designing the Leaderboard and `student` portal features.
- **Abstract Summary:** Examines the impact of integrating AI and collaborative gamification on student engagement, motivation, and learning outcomes in higher education.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2024.3477465](https://doi.org/10.1109/ACCESS.2024.3477465)

### 9. Developing an AI-Assisted Low-Resource Spoken Language Learning App for Children (2023)
- **Relevance:** **MEDIUM**. Demonstrates practical implementation of gamified reward processing tied directly to an AI's output.
- **Abstract Summary:** Discusses a gamified app that uses AI to provide automated feedback, incorporating reward processing to encourage learning. The architecture patterns are very similar to CampusCred's feedback loop.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2023.3304274](https://doi.org/10.1109/ACCESS.2023.3304274)

### 10. FactSheets: Increasing Trust in AI Services through Supplier's Declarations of Conformity (2019)
- **Relevance:** **MEDIUM**. Important for the Admin portal's "AI Settings" and faculty trust in the auto-approval pipeline.
- **Abstract Summary:** Explores "FactSheets" to increase trust in AI services. This aims to provide a structured way to certify the compliance and acceptability of AI systems, directly applicable to how you present AI confidence scores to faculty.
- **Download Link:** [https://doi.org/10.1147/JRD.2019.2942288](https://doi.org/10.1147/JRD.2019.2942288)

### 11. AI Powered Document Verification - A Behavioral and Multi Domain Approach to Automated Fraud Detection (2025)
- **Relevance:** **HIGH**. Extremely relevant to your AI document parsing layer to detect fraud in uploaded certificates.
- **Abstract Summary:** Discusses the use of Deep Learning and CNNs coupled with behavioral authentication layers to improve the accuracy and scalability of document verification systems compared to traditional manual methods.
- **Download Link:** [https://doi.org/10.1109/ICTBIG68706.2025.11323606](https://doi.org/10.1109/ICTBIG68706.2025.11323606)

### 12. Gamification in higher education: A systematic literature review (2019)
- **Relevance:** **HIGH**. Essential for designing your point systems, badges, and user interfaces to maximize student retention and use of the platform.
- **Abstract Summary:** A comprehensive review analyzing various approaches to gamifying higher education, determining what strategies are most effective at driving student engagement and improving learning outcomes.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2019.2932803](https://doi.org/10.1109/ACCESS.2019.2932803)

### 13. Structural analysis of high-impact literature on gamification and game-based learning in higher education (2020)
- **Relevance:** **MEDIUM-HIGH**. Focuses on identifying high-impact gamification strategies.
- **Abstract Summary:** Provides a structural analysis of the most effective and highly cited approaches to game-based learning and gamification, offering actionable insights for building engaging student portals.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2020.2966179](https://doi.org/10.1109/ACCESS.2020.2966179)

### 14. EduCTX: A Blockchain-Based Higher Education Credit Platform (2018)
- **Relevance:** **HIGH**. Extremely relevant if you ever plan to distribute academic points and rewards as digital tokens or immutable records.
- **Abstract Summary:** Proposes a decentralized higher education credit platform based on a globally distributed, peer-to-peer network. It offers a way to assign, track, and verify academic credits securely.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2018.2789929](https://doi.org/10.1109/ACCESS.2018.2789929)

### 15. A Systematic Literature Review on Blockchain-Based Systems for Academic Certificate Verification (2023)
- **Relevance:** **MEDIUM**. A great high-level overview for your system design and theoretical background on automated credentialing.
- **Abstract Summary:** Summarizes state-of-the-art blockchain systems for academic certificate verification, detailing the architectural patterns and smart contract designs typically employed for these solutions.
- **Download Link:** [https://doi.org/10.1109/ACCESS.2023.3289069](https://doi.org/10.1109/ACCESS.2023.3289069)
