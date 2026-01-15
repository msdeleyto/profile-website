# Profile Website

Single-page portfolio built with **Astro**, TypeScript, and Tailwind CSS. Minimal JavaScript, snap-scroll sections, Docker deployment ready.

## Technology Stack

- **Astro** - Static site generator with minimal JavaScript
- **TypeScript** - Type-safe component development
- **Tailwind CSS** - Utility-first styling with custom tech theme
- **Docker** - Containerized deployment with Nginx
- **Event Delegation** - CSP-compliant interaction patterns

## Architecture

**Single Page Application** with 4 snap-scroll sections:
- Introduction
- Career (expandable experience cards)
- Skills (categorized tech stack)
- Projects (with links)

## Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:4321)
npm run dev

# Type check + build
npm run build

# Preview production build
npm run preview
```

## Docker

```bash
# Build and run (port 3000)
docker-compose up --build

# Manual build
docker build -t profile .
docker run -p 3000:80 profile
```

## Content Management

All content lives in TypeScript files (`src/data/`). To update content, edit the relevant data file directly.

## Styling System

**Tech Theme Design System:**
- CSS custom properties in `global.css`
- Tailwind tokens in `tailwind.config.mjs`
- Semantic color palette: `tech-*`, `accent-*`, `text-*`

## AWS OIDC Configuration (Deployment)

To securely push Docker images to Amazon ECR via GitHub Actions without long-lived credentials, configure AWS OIDC:

### 1. Create OIDC Provider
Create an IAM OIDC provider for GitHub:
- **Provider URL**: `https://token.actions.githubusercontent.com`
- **Audience**: `sts.amazonaws.com`

### 2. Create IAM Role with Trust Policy
Create a role (e.g., `GitHubActionECRPush`) with this trust relationship:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
                    "token.actions.githubusercontent.com:sub": "repo:<OWNER>/<REPO>:environment:production"
                }
            }
        }
    ]
}
```

### 3. Attach ECR Permissions Policy
Attach a policy to the role allowing ECR push access:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ecr:CompleteLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:InitiateLayerUpload",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:BatchGetImage"
            ],
            "Resource": "<ECR_REPOSITORY_ARN>"
        },
        {
            "Effect": "Allow",
            "Action": "ecr:GetAuthorizationToken",
            "Resource": "*"
        }
    ]
}
```

### 4. Configure GitHub Repository Secrets
Add the following secrets to your GitHub repository:
- `AWS_ROLE_ARN`: The ARN of the role created in step 2.
- `AWS_REGION`: Your target AWS region (e.g., `us-east-1`).
