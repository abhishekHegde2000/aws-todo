# 🧠 AWS-ToDo: A Production-Grade ToDo App Journey

Welcome to **AWS-ToDo**, my hands-on learning journey to master **AWS, backend architectures, and full-stack development** through one evolving project — a **ToDo application** built and re-built across multiple architectures and technologies.

Each branch in this repository represents a **different tech stack, database model, or deployment pattern**, showing how the same product can be implemented in various production-ready ways.

---

## 🌍 Project Vision

This project isn’t just a simple ToDo app — it’s a **complete cloud engineering journey**.

The goal is to:

- Learn AWS core services through real, hands-on builds.
- Understand **production-level architecture**, **scalability**, **security**, and **DevOps workflows**.
- Compare **different stacks** — SQL vs NoSQL, serverless vs containerized, etc.
- Create a reusable codebase and documentation set I can revisit anytime.
- Become a better engineer who can reason about tradeoffs like a pro.

---

## 🚀 Core Idea

A single **ToDo App** built for multi-tenant use — meaning it’s designed as if **many clients** or **organizations** could use it simultaneously.

Functional features:

- User authentication
- CRUD operations for tasks (create, read, update, delete)
- Filters, tags, and due dates
- Search and sorting
- Optional sharing and notifications

Non-functional goals:

- Scalable, secure, and observable
- Deployed via CI/CD pipelines
- Multi-environment setup (dev → staging → prod)
- Infrastructure as Code (IaC)
- Free-tier AWS where possible

---

## 🧩 Tech Stack Overview

Across different branches, I’ll explore multiple stacks and tools:

| Branch                      | Stack            | Core AWS Services                                 | Database            | Description                        |
| --------------------------- | ---------------- | ------------------------------------------------- | ------------------- | ---------------------------------- |
| `stack/serverless-dynamodb` | Serverless       | Lambda, API Gateway, Cognito, S3, CloudFront      | DynamoDB            | Fully serverless NoSQL version     |
| `stack/serverless-sql`      | Serverless       | Lambda, API Gateway, RDS Proxy, Aurora Serverless | MySQL/Postgres      | Serverless backend with SQL        |
| `stack/ecs-postgres`        | Containerized    | ECS Fargate, ALB, CloudWatch, RDS                 | PostgreSQL          | Docker-based architecture          |
| `stack/k8s-postgres`        | Kubernetes       | EKS, ALB, RDS, IAM                                | PostgreSQL          | Managed Kubernetes + SQL           |
| `stack/monolith-ec2`        | Classic          | EC2, Nginx, CloudWatch                            | MySQL               | Legacy style VM deployment         |
| `stack/feature-graphql`     | GraphQL          | AppSync or Apollo                                 | DynamoDB / Postgres | Explore GraphQL APIs               |
| `stack/async`               | Async processing | SQS, SNS, Lambda, CloudWatch                      | Mixed               | Background jobs and workers        |
| `stack/scale-optim`         | Scaling          | CloudFront, ElastiCache, Auto Scaling, WAF        | N/A                 | Performance and optimization layer |

---

## 🏗️ Architecture (High-Level)

### Serverless Architecture

- **Frontend:** React app on S3 + CloudFront
- **Auth:** AWS Cognito
- **API:** API Gateway + Lambda
- **Database:** DynamoDB
- **Monitoring:** CloudWatch + X-Ray
- **Security:** IAM Roles, WAF, KMS
- **CI/CD:** CodePipeline or GitHub Actions

### Containerized Architecture

- **Frontend:** S3 + CloudFront
- **Backend:** ECS Fargate or EKS cluster running Dockerized app || (Express js || Python Fast API)
- **Database:** RDS (PostgreSQL) + ElastiCache (Redis)
- **Networking:** VPC + ALB + Route 53
- **Monitoring:** CloudWatch, Prometheus (EKS)
- **CI/CD:** GitHub Actions → ECS or EKS deployment

🧠 Learning Roadmap (8-Week Plan)
Week Focus Key Skills

| Week | Focus                         | Key Skills                                  |
| ---- | ----------------------------- | ------------------------------------------- |
| 0    | Repo setup & planning         | Git branching, OpenAPI specs, design docs   |
| 1    | Static frontend + S3 hosting  | S3, CloudFront, Route53                     |
| 2    | Serverless backend (DynamoDB) | Lambda, API Gateway, Cognito                |
| 3    | CI/CD pipeline                | GitHub Actions, testing, staging deployment |
| 4    | SQL version (RDS + ECS)       | Containers, SQL schema design               |
| 5    | Background jobs & caching     | SQS, SNS, Redis                             |
| 6    | Observability & security      | CloudWatch, CloudTrail, IAM                 |
| 7    | Scaling & optimization        | Auto Scaling, CDN, caching                  |
| 8    | Production hardening & docs   | DR tests, runbooks, final release           |

Each week = a complete milestone with documentation and working code.

📚 Documentation

All design decisions, tradeoffs, and learnings are tracked under:

/docs/
├── architecture/
├── decisions/
├── roadmap.md
├── lessons-learned.md

Each branch contains a summary of what was learned, why choices were made, and what could be improved.

🧩 Commit & Branching Strategy

    Main branch → stable and documented
    Stack branches → individual architectures
    Feature branches → per feature or experiment

Commit convention:

    feat(auth): add cognito signup
    fix(api): handle missing tenant header
    chore(ci): add test workflow
    docs(arch): update scaling diagram

🧪 Testing & Monitoring

Unit & integration tests

    E2E tests with Cypress or Playwright

    Load tests with Artillery or k6

    CloudWatch + X-Ray monitoring

    Alerts via SNS

    CI/CD gated by tests

This repo is more than just code — it’s a complete learning map.

By the end:

    I’ll have built 6+ AWS-backed architectures.

    I’ll understand tradeoffs between serverless vs containerized vs traditional setups.

    I’ll know how to deploy, secure, and scale full-stack apps professionally.

    I’ll be ready to design and deploy real-world production systems.

🧑‍💻 Author

Abhishek Hegde

Web Developer | AWS Learner | Building from first principles

📘 Goal: Become a production-level architect who can design, deploy, and scale applications confidently on AWS.
