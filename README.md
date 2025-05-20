This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live Version

The application is currently deployed and accessible at:

**[https://dhpbb0hg9mvh1.cloudfront.net](https://dhpbb0hg9mvh1.cloudfront.net)**

This deployment includes full server-side rendering capabilities.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on AWS

This guide will walk you through deploying your Next.js application on AWS with full server-side rendering capabilities using AWS CDK and the `cdk-nextjs-standalone` package.

### Prerequisites

1. **AWS Account**: You need an AWS account. If you don't have one, [sign up here](https://aws.amazon.com/).

2. **AWS CLI**: Install and configure the AWS CLI.

   ```bash
   # Install AWS CLI (macOS example using Homebrew)
   brew install awscli

   # Configure AWS CLI with your credentials
   aws configure
   ```

   When prompted, enter your AWS Access Key ID, Secret Access Key, and preferred region (e.g., `us-east-2`).

3. **Node.js and npm**: Make sure you have Node.js (v16+) and npm installed.

### Step 1: Install AWS CDK

```bash
# Install AWS CDK globally
npm install -g aws-cdk
```

### Step 2: Initialize CDK in your Next.js project

```bash
# Create a cdk directory in your project
mkdir cdk
cd cdk

# Initialize a new CDK project
cdk init app --language typescript

# Install required dependencies
npm install cdk-nextjs-standalone
```

### Step 3: Configure your CDK Stack

Create or modify the file `cdk/lib/cdk-stack.ts` with the following content:

```typescript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import { Nextjs } from "cdk-nextjs-standalone";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Deploy Next.js app with full capabilities (SSR, API routes, etc.)
    const nextjs = new Nextjs(this, "RidleyNextJsApp", {
      // Path to your Next.js project relative to the CDK app
      nextjsPath: path.join(__dirname, "../.."),
    });

    // Output the CloudFront URL
    new cdk.CfnOutput(this, "CloudFrontDistributionDomain", {
      value: nextjs.distribution.distributionDomain,
      description: "Next.js Website URL",
    });
  }
}
```

### Step 4: Configure your CDK App

Update the file `cdk/bin/cdk.ts` with the following content:

```typescript
#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";

const app = new cdk.App();
new CdkStack(app, "RidleyFrontendStack", {
  // Use your preferred region
  env: { region: "us-east-2" },

  // Add stack tags (optional)
  tags: {
    Project: "Ridley",
    Environment: "Dev",
  },
});
```

### Step 5: Update your Next.js Configuration

Ensure your `next.config.ts` or `next.config.js` is configured for server-side rendering:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't use 'output: export' as we want server-side features
  images: {
    domains: ["*"], // Configure domains as needed for your images
  },
};

export default nextConfig;
```

### Step 6: Update .gitignore

Add the following to your `.gitignore` file to exclude build artifacts:

```
# CDK and deployment artifacts
.open-next
cdk.out/
```

### Step 7: Build and Deploy

```bash
# Build your Next.js application
npm run build

# Deploy with CDK
cd cdk && npx cdk deploy
```

When prompted to approve the CloudFormation changes, type 'y' to confirm.

### Step 8: Access Your Deployed Application

After deployment completes (which may take 10-15 minutes for the first deployment), you'll see a CloudFront URL in the terminal output. This is your deployed application URL.

Example output:

```
Outputs:
RidleyFrontendStack.CloudFrontDistributionDomain = d123abc456def.cloudfront.net
```

### Updating Your Deployment

Whenever you make changes to your application:

1. Make your code changes
2. Run `npm run build` to build the application
3. Run `cd cdk && npx cdk deploy` to deploy the changes

### Cleaning Up

To avoid incurring charges, you can delete all created resources when they're no longer needed:

```bash
cd cdk && npx cdk destroy
```

When prompted, type 'y' to confirm deletion of all resources.
