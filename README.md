# Ridley - Form Builder Application

This is a [Next.js](https://nextjs.org) application for creating and managing forms. It features a modern UI with authentication, protected routes, and server-side rendering capabilities.

## Live Version

The application is currently deployed and accessible at:

**[https://dhpbb0hg9mvh1.cloudfront.net](https://dhpbb0hg9mvh1.cloudfront.net)**

This deployment includes:
- Full server-side rendering capabilities
- API routes
- SEO optimization
- Secure authentication with cookie-based tokens

## Features

### Authentication System
- Secure cookie-based authentication with SameSite=Strict protection
- Login and registration functionality
- Protected routes using Next.js middleware
- Automatic redirection for unauthenticated users

### UI/UX
- Modern, responsive design using shadcn/ui components
- Marketing homepage with dynamic content based on authentication status
- Protected dashboard for authenticated users
- Form creation and management interface

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font family.

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

### Step 2: Understanding the CDK Setup

This project already includes a complete CDK configuration in the `cdk` directory. You don't need to create or initialize anything. The setup uses the `cdk-nextjs-standalone` package to deploy the Next.js application with full server-side rendering capabilities.

### Step 3: Review the CDK Stack

The CDK stack is already configured in `cdk/lib/cdk-stack.ts`. Here's what it does:

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

### Step 4: Review the CDK App Configuration

The CDK app is already configured in `cdk/bin/cdk.ts`. This file sets up the stack with the appropriate AWS region and tags:

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

### Step 5: Next.js Configuration

The project already has the appropriate Next.js configuration in `next.config.js` for server-side rendering:

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

### Step 6: .gitignore Configuration

The project already has the necessary entries in the `.gitignore` file to exclude CDK-generated files:

```
# CDK and deployment artifacts
.open-next
cdk.out/
.next
node_modules
```

### Step 7: Bootstrap AWS CDK (First-time only)

If this is your first time using AWS CDK in your AWS account and region, you need to bootstrap it once:

```bash
cdk bootstrap
```

### Step 8: Build and Deploy

We've simplified the deployment process with a single command:

```bash
# Build and deploy in one step
npm run deploy
```

This command will:
1. Build your Next.js application
2. Navigate to the CDK directory
3. Deploy with CDK

When prompted to approve the CloudFormation changes, type 'y' to confirm.

### Step 9: Access Your Deployed Application

After deployment completes (which may take 10-15 minutes for the first deployment), you'll see a CloudFront URL in the terminal output. This is your deployed application URL.

Example output:

```
Outputs:
RidleyFrontendStack.CloudFrontDistributionDomain = d123abc456def.cloudfront.net
```

### Step 10: Configure API Endpoint

Important: If you're deploying your own version of this application, you'll need to update the API endpoint in `constants/index.ts`:

```typescript
export const API_BASE_URL = "https://your-api-endpoint.amazonaws.com/prod";
```

The current API endpoint is configured for the original deployment. You'll need to replace it with your own API endpoint URL if you're setting up your own backend.

**Note:** For production applications, it's best practice to store the backend API URL in environment variables rather than hardcoding it in the constants file. This approach was chosen for simplicity in this demo, but for your own deployments, consider using environment variables like:

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
```

You can then set the `NEXT_PUBLIC_API_URL` environment variable in your deployment environment.

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
