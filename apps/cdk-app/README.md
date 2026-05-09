# CDK App — AWS Infrastructure (`cdk-app`)

Infrastructure-as-Code for the Storage application. Deploys all AWS resources using AWS CDK v2.


## Stacks

| Stack | ID | Resources |
|-------|----|-----------|
| `NetworkStack` | `storage-{env}-network` | VPC, 3 subnet tiers, NAT Gateway |
| `StorageStack` | `storage-{env}-bucket` | S3 Bucket, CloudFront CDN, ECR Repo, Presigned URL Lambda |
| `DBStack` | `storage-{env}-db` | RDS PostgreSQL, Secrets Manager, Security Group |
| `AppStack` | `storage-{env}-app` | ECS Fargate Cluster + Service, ALB, Target Group |

## Data Flow

### File Upload
```
Client → /api/s3 → Lambda (generates PUT presigned URL) → S3 → DB record
```

### File Download / Preview
```
Client → /api/s3 → Lambda (generates GET presigned URL) → Direct download
Client → CloudFront URL → S3 (for in-browser previews)
```

## Deployment

```bash
# Set environment (dev/staging/prod)
export ENVIRONMENT=dev

# Build
npm run build

# Deploy stacks
npx cdk deploy storage-dev-network storage-dev-bucket storage-dev-db storage-dev-app \
  --context environment=dev \
  --require-approval never
```

## Requirements

- Node.js 20+
- AWS CLI configured with credentials
- CDK CLI 2.x (`npm i -g aws-cdk`)
- Docker (for Lambda bundling)
- Bootstrap CDK in the target account/region: `npx cdk bootstrap`

## Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript |
| `npm run watch` | Watch and recompile |
| `npm run test` | Run unit tests |
| `npx cdk diff` | Compare with deployed stack |
| `npx cdk synth` | Emit CloudFormation template |

## Environment

Controlled via CDK context `environment` or `ENVIRONMENT` env var (default: `dev`). Must be `dev`, `staging`, or `prod`. All resources are prefixed with `storage-{environment}`.
